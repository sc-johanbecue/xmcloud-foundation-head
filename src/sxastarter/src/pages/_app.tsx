import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import { getSession, SessionProvider } from 'next-auth/react';
import Bootstrap from 'src/Bootstrap';

import 'assets/main.scss';
import { AnonymousLogin, SetConfiguration } from 'src/services/Ordercloud/AuthenticationService';

import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import { Cookies, useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { Tokens } from 'ordercloud-javascript-sdk';
import { CONTENTHUB_TOKEN_COOKIE_KEY } from 'src/services/ContentHub/Constants';
import { Session } from 'next-auth';
import { getCurrentTheme } from 'src/services/Head/ThemeService';

import { Environment, PageController, WidgetsProvider } from '@sitecore-search/react';
import { Locales } from 'src/types/locales';

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { session, dictionary, ...rest } = pageProps;
  const [newSession, setNewSession] = useState<Session>(session);

  SetConfiguration();
  AnonymousLogin();

  useEffect(() => {
    async function AutomaticLogin() {
      const tmpNewSession = await getSession();
      if (tmpNewSession) {
        setNewSession(tmpNewSession);
        if (tmpNewSession?.user?.OCToken) {
          Tokens.SetAccessToken(tmpNewSession?.user?.OCToken);
        }
        if (tmpNewSession?.user?.OCRefreshToken) {
          Tokens.SetRefreshToken(tmpNewSession?.user?.OCRefreshToken);
        }
        if (tmpNewSession?.user?.CHubToken) {
          const cookies = new Cookies();
          cookies.set(CONTENTHUB_TOKEN_COOKIE_KEY, tmpNewSession?.user?.CHubToken, { path: '/' });
        }
      }
    }
    AutomaticLogin();
  }, []);

  const [cookie] = useCookies();
  const currenttheme = getCurrentTheme(cookie.currenttheme);

  PageController.getContext().setLocaleLanguage(pageProps.locale);
  PageController.getContext().setLocaleCountry(Locales[pageProps?.locale ?? '']);

  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.
    process?.env?.NEXT_PUBLIC_SEARCH_CUSTOMERKEY ? (
      <>
        <Bootstrap {...pageProps} />
        <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
          <WidgetsProvider
            env={(process?.env?.NEXT_PUBLIC_SEARCH_ENVIRONMENT ?? 'dev') as Environment}
            customerKey={process.env.NEXT_PUBLIC_SEARCH_CUSTOMERKEY}
            apiKey={process.env.NEXT_PUBLIC_SEARCH_APIKEY}
          >
            <ChakraProvider colorModeManager={localStorageManager} theme={currenttheme}>
              <SessionProvider session={newSession}>
                <Component {...rest} />
              </SessionProvider>
            </ChakraProvider>
          </WidgetsProvider>
        </I18nProvider>
      </>
    ) : (
      <>
        <Bootstrap {...pageProps} />
        <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
          <ChakraProvider colorModeManager={localStorageManager} theme={currenttheme}>
            <SessionProvider session={newSession}>
              <Component {...rest} />
            </SessionProvider>
          </ChakraProvider>
        </I18nProvider>
      </>
    )
  );
}

export default App;
