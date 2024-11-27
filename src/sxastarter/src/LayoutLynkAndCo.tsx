/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-sync-scripts */
/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  LayoutServiceData,
  Field,
  HTMLLink,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import Scripts from 'src/Scripts';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  OgTitle?: Field;
  OgDescription?: Field;
  OgImage?: ImageField;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
        <link rel="canonical" href={publicUrl} />
        <meta property="og:title" content={fields?.OgTitle?.value?.toString()} />
        <meta property="og:description" content={fields?.OgDescription?.value?.toString()} />
        <meta property="og:image" content={fields?.OgImage?.value?.src?.toString()} />
        <meta property="og:type" content={route?.templateName} data-attr="JSS-21.6.0" />
        <meta
          data-react-helmet="true"
          name="description"
          content="Buy, borrow, lease or take out a flexible subscription | Lynk &amp; Co"
        />
        <meta data-react-helmet="true" name="Keywords" content="mobility" />
        <meta
          data-react-helmet="true"
          property="og:title"
          content="Flexible car subscription, leasing or car purchase | Lynk &amp; Co"
        />
        <meta data-react-helmet="true" property="og:image" content="" />
        <meta
          data-react-helmet="true"
          property="og:description"
          content="Buy, borrow, lease or take out a flexible subscription | Lynk &amp; Co"
        />
        <meta data-react-helmet="true" name="twitter:card" content="summary" />
        <meta
          data-react-helmet="true"
          name="twitter:title"
          content="Flexible car subscription, leasing or car purchase | Lynk &amp; Co"
        />
        <meta
          data-react-helmet="true"
          name="twitter:description"
          content="Buy, borrow, lease or take out a flexible subscription | Lynk &amp; Co"
        />
        <meta data-react-helmet="true" name="twitter:image" content="" />
        <link data-react-helmet="true" rel="canonical" href="https://www.lynkco.com/en" />
        <link
          data-react-helmet="true"
          rel="alternate"
          hrefLang="en"
          href="https://www.lynkco.com/en/"
        />
        <link
          data-react-helmet="true"
          rel="alternate"
          hrefLang="nl-nl"
          href="https://www.lynkco.com/nl-nl/"
        />
        <link
          data-react-helmet="true"
          rel="alternate"
          hrefLang="fr-be"
          href="https://www.lynkco.com/fr-be/"
        />
        <link
          data-react-helmet="true"
          rel="alternate"
          hrefLang="nl-be"
          href="https://www.lynkco.com/nl-be/"
        />
        <link
          data-react-helmet="true"
          rel="alternate"
          hrefLang="fr-fr"
          href="https://www.lynkco.com/fr-fr/"
        />
        <link
          data-react-helmet="true"
          rel="alternate"
          hrefLang="de-de"
          href="https://www.lynkco.com/de-de/"
        />
        <link
          data-react-helmet="true"
          rel="alternate"
          hrefLang="it-it"
          href="https://www.lynkco.com/it-it/"
        />
        <link
          data-react-helmet="true"
          rel="alternate"
          hrefLang="es-es"
          href="https://www.lynkco.com/es-es/"
        />
        <link
          data-react-helmet="true"
          rel="alternate"
          hrefLang="sv-se"
          href="https://www.lynkco.com/sv-se/"
        />
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" type="image/x-icon" href="/dist/favicon.ico?v=1.1" />
        <script src="https://ct.pinterest.com/static/ct/token_create.js"></script>
        <script
          type="text/javascript"
          async={false}
          src="https://analytics.tiktok.com/i18n/pixel/static/main.MTU3YmJkODI0MQ.js"
          data-id="CE8SPVJC77UA05OMUP10"
        ></script>
        <script async={false} src="https://s.pinimg.com/ct/lib/main.23bc7c79.js"></script>
        <script
          type="text/javascript"
          async={false}
          src="https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=CE8SPVJC77UA05OMUP10&amp;lib=ttq"
        ></script>
        <script
          type="text/javascript"
          async={false}
          src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        ></script>
        <script
          type="text/javascript"
          async={false}
          src="https://www.googletagmanager.com/gtag/js?id=G-L1H792755B&amp;l=dataLayer&amp;cx=c"
        ></script>
        <script type="text/javascript" async={false} src="https://s.pinimg.com/ct/core.js"></script>
        <script
          type="text/javascript"
          async={false}
          src="https://www.google-analytics.com/analytics.js"
        ></script>
        <script async={false} src="https://www.clarity.ms/s/0.7.20/clarity.js"></script>
        <script async={false} src="https://www.clarity.ms/tag/uet/56306566"></script>
        <script
          src="https://connect.facebook.net/signals/config/744786303348217?v=2.9.145&amp;r=stable&amp;domain=www.lynkco.com&amp;hme=20c913bdcd4be51a752120153aa5caaecb3ee86c7f26cf737846e40b202aba68&amp;ex_m=62%2C106%2C94%2C98%2C53%2C3%2C88%2C61%2C14%2C86%2C79%2C44%2C46%2C150%2C153%2C164%2C160%2C161%2C163%2C25%2C89%2C45%2C68%2C162%2C145%2C148%2C157%2C158%2C165%2C115%2C13%2C43%2C169%2C168%2C117%2C16%2C29%2C32%2C1%2C36%2C57%2C58%2C59%2C63%2C83%2C15%2C12%2C85%2C82%2C81%2C95%2C97%2C31%2C96%2C26%2C22%2C146%2C149%2C124%2C24%2C9%2C10%2C11%2C5%2C6%2C21%2C19%2C20%2C49%2C54%2C56%2C66%2C90%2C23%2C67%2C8%2C7%2C71%2C41%2C18%2C92%2C91%2C17%2C4%2C73%2C80%2C72%2C78%2C40%2C39%2C77%2C33%2C35%2C76%2C48%2C74%2C28%2C37%2C65%2C0%2C84%2C75%2C2%2C30%2C55%2C34%2C93%2C38%2C70%2C60%2C99%2C52%2C51%2C27%2C87%2C50%2C47%2C42%2C69%2C64%2C100%2C175%2C174%2C176%2C181%2C182%2C183%2C179%2C171%2C116%2C118%2C170%2C172%2C107%2C137%2C129%2C132%2C113%2C166%2C206%2C101%2C111%2C207%2C144%2C105%2C127%2C120%2C108"
          async={false}
        ></script>
        <script
          src="https://connect.facebook.net/signals/config/2555837531184634?v=2.9.145&amp;r=stable&amp;domain=www.lynkco.com&amp;hme=20c913bdcd4be51a752120153aa5caaecb3ee86c7f26cf737846e40b202aba68&amp;ex_m=62%2C106%2C94%2C98%2C53%2C3%2C88%2C61%2C14%2C86%2C79%2C44%2C46%2C150%2C153%2C164%2C160%2C161%2C163%2C25%2C89%2C45%2C68%2C162%2C145%2C148%2C157%2C158%2C165%2C115%2C13%2C43%2C169%2C168%2C117%2C16%2C29%2C32%2C1%2C36%2C57%2C58%2C59%2C63%2C83%2C15%2C12%2C85%2C82%2C81%2C95%2C97%2C31%2C96%2C26%2C22%2C146%2C149%2C124%2C24%2C9%2C10%2C11%2C5%2C6%2C21%2C19%2C20%2C49%2C54%2C56%2C66%2C90%2C23%2C67%2C8%2C7%2C71%2C41%2C18%2C92%2C91%2C17%2C4%2C73%2C80%2C72%2C78%2C40%2C39%2C77%2C33%2C35%2C76%2C48%2C74%2C28%2C37%2C65%2C0%2C84%2C75%2C2%2C30%2C55%2C34%2C93%2C38%2C70%2C60%2C99%2C52%2C51%2C27%2C87%2C50%2C47%2C42%2C69%2C64%2C100"
          async={false}
        ></script>
        <script
          type="text/javascript"
          async={false}
          src="https://connect.facebook.net/en_US/fbevents.js"
        ></script>
        <script
          type="text/javascript"
          async={false}
          src="https://static.hotjar.com/c/hotjar-2179078.js?sv=7"
        ></script>
        <script type="text/javascript" async={false} src="https://bat.bing.com/bat.js"></script>
        <script
          type="text/javascript"
          async={false}
          src="https://www.gstatic.com/recaptcha/releases/x5WWoE57Fv0d6ATKsLDIAKnt/recaptcha__en.js"
          crossOrigin="anonymous"
          integrity="sha384-6QAkKomkqvpLp4cQIWQ+jygFIfYhWZ8e6+BssYf6OcLFi0/C1rhftlXMNkaG16WA"
        ></script>
        <script async={false} src="https://www.googletagmanager.com/gtm.js?id=GTM-WKQPHVD"></script>
        <script src="https://www.lynkco.com/dist/polyfill.min.js"></script>
        <script src="https://www.lynkco.com/dist/config.js"></script>
        <script
          src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&amp;render=explicit"
          async={false}
          defer={true}
        ></script>
        <script>window.dataLayer=window.dataLayer||[]</script>
        <script defer={true} src="https://www.lynkco.com/dist/static/js/main.7bc0164e.js"></script>
        <link href="https://www.lynkco.com/dist/static/css/main.daba67ee.css" rel="stylesheet" />
        <meta
          http-equiv="origin-trial"
          content="AymqwRC7u88Y4JPvfIF2F37QKylC04248hLCdJAsh8xgOfe/dVJPV3XS3wLFca1ZMVOtnBfVjaCMTVudWM//5g4AAAB7eyJvcmlnaW4iOiJodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjk1MTY3OTk5LCJpc1RoaXJkUGFydHkiOnRydWV9"
        />
        <script
          type="text/javascript"
          async={false}
          src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/536546959/?random=1707901661601&amp;cv=11&amp;fst=1707901661601&amp;bg=ffffff&amp;guid=ON&amp;async=1&amp;gtm=45He42c0v810882556za200&amp;gcd=13r3r3r3r5&amp;dma_cps=sypham&amp;dma=1&amp;u_w=1536&amp;u_h=864&amp;url=https%3A%2F%2Fwww.lynkco.com%2Fen&amp;ref=https%3A%2F%2Fwww.lynkco.com%2Fen-be&amp;hn=www.googleadservices.com&amp;frm=0&amp;tiba=Flexible%20car%20subscription%2C%20leasing%20or%20car%20purchase%20%7C%20Lynk%20%26%20Co&amp;npa=0&amp;pscdl=noapi&amp;auid=1930041856.1706173723&amp;uaa=x86&amp;uab=64&amp;uafvl=Not%2520A(Brand%3B99.0.0.0%7CMicrosoft%2520Edge%3B121.0.2277.112%7CChromium%3B121.0.6167.160&amp;uamb=0&amp;uap=Windows&amp;uapv=15.0.0&amp;uaw=0&amp;data=ads_data_redaction%3Dfalse&amp;rfmt=3&amp;fmt=4"
        ></script>
        <meta
          http-equiv="origin-trial"
          content="AymqwRC7u88Y4JPvfIF2F37QKylC04248hLCdJAsh8xgOfe/dVJPV3XS3wLFca1ZMVOtnBfVjaCMTVudWM//5g4AAAB7eyJvcmlnaW4iOiJodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjk1MTY3OTk5LCJpc1RoaXJkUGFydHkiOnRydWV9"
        />
        <script
          async={false}
          src="https://script.hotjar.com/modules.332f72b7517862cb5491.js"
          charSet="utf-8"
        ></script>
        <script
          src="https://bat.bing.com/p/action/56306566.js"
          type="text/javascript"
          async={false}
          data-ueto="ueto_2c6ef907d2"
        ></script>
        <meta
          http-equiv="origin-trial"
          content="AymqwRC7u88Y4JPvfIF2F37QKylC04248hLCdJAsh8xgOfe/dVJPV3XS3wLFca1ZMVOtnBfVjaCMTVudWM//5g4AAAB7eyJvcmlnaW4iOiJodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjk1MTY3OTk5LCJpc1RoaXJkUGFydHkiOnRydWV9"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.lynkco.com/dist/static/css/Header.54eb3249.chunk.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.lynkco.com/dist/static/css/InfoBanner.b2d05542.chunk.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.lynkco.com/dist/static/css/RegionModal.c34edee5.chunk.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.lynkco.com/dist/static/css/ZigZagBlock.3ec56e65.chunk.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.lynkco.com/dist/static/css/NewsletterCTA.ffdc801a.chunk.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.lynkco.com/dist/static/css/Breadcrumbs.e1eff766.chunk.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.lynkco.com/dist/static/css/Footer.48d05b9b.chunk.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.lynkco.com/dist/static/css/Cookies.edfa6725.chunk.css"
        />
        <script
          charSet="utf-8"
          src="https://analytics.tiktok.com/i18n/pixel/static/identify_0a875.js"
        ></script>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.lynkco.com/dist/static/css/ZigZagBlockItem.4ec4ac45.chunk.css"
        />
        <meta
          http-equiv="origin-trial"
          content="A3dA86xx3SygInSznfsu98uiaY4VmGo/CaJTGvdsIU5xobyXgN1lb1smNdWPEoeyz54s3L60Kdxmc4VJmUrrIgoAAACVeyJvcmlnaW4iOiJodHRwczovL2N0LnBpbnRlcmVzdC5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZyIsImV4cGlyeSI6MTcyNTQwNzk5OSwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0="
        />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        <header style={{ backgroundColor: 'inherit' }}>
          <div id="header">{route && <Placeholder name="headless-header" rendering={route} />}</div>
        </header>
        <main>
          <div id="content">{route && <Placeholder name="headless-main" rendering={route} />}</div>
        </main>
        <footer>
          <div id="footer">{route && <Placeholder name="headless-footer" rendering={route} />}</div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
