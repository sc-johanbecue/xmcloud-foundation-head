import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import { getSession, SessionProvider } from 'next-auth/react';

import 'assets/main.scss';
import { AnonymousLogin, SetConfiguration } from 'src/services/Ordercloud/AuthenticationService';

import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import { Cookies, useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { Tokens } from 'ordercloud-javascript-sdk';
import { CONTENTHUB_TOKEN_COOKIE_KEY } from 'src/services/ContentHub/Constants';
import { Session } from 'next-auth';
import { getCurrentTheme } from 'src/services/Head/ThemeService';

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

  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.
    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <ChakraProvider colorModeManager={localStorageManager} theme={currenttheme}>
        <SessionProvider session={newSession}>
          <Component {...rest} />
        </SessionProvider>
      </ChakraProvider>
    </I18nProvider>
  );
}

export default App;
