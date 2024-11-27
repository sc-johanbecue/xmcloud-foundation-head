/* eslint-disable @next/next/no-sync-scripts */
/**
 * This Layout is needed for Starter Kit.
 */
import React, { useEffect } from 'react';
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
  //const isPageEditing = layoutData.sitecore.context.pageEditing;
  //const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  useEffect(() => {
    document.body.classList.remove('chakra-ui-light');
  });

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
        <link rel="canonical" href={publicUrl} />
        <meta property="og:title" content={fields?.OgTitle?.value?.toString()} />
        <meta property="og:description" content={fields?.OgDescription?.value?.toString()} />
        <meta property="og:image" content={fields?.OgImage?.value?.src?.toString()} />
        <meta property="og:type" content={route?.templateName} data-attr="JSS-21.6.0" />
        <script
          src="https://cdn.jsdelivr.net/npm/proxy-polyfill@0.3.2/proxy.min.js"
          integrity="sha384-XgSKoqPCRkDqdEXXO++yndH27TzVYLEQjJigam4rGY6VOgc3CRpJYzjjTP3pNLFA"
          crossOrigin="anonymous"
          async
        ></script>
        <script>
          {`(function (w, d, s, l, i) {
         w[l] = w[l] || [];
         w[l].push({
           'gtm.start': new Date().getTime(),
           event: 'gtm.js',
         });
         var f = d.getElementsByTagName(s)[0],
           j = d.createElement(s),
           dl = l != 'dataLayer' ? '&l=' + l : '';
         j.async = true;
         j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
         f.parentNode.insertBefore(j, f);
         })(window, document, 'script', 'dataLayer', 'GTM-TK32XVM');
        `}
        </script>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&amp;family=Montserrat:wght@100;200;300;400;500;600;700&amp;family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&amp;display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://www.homebuddy.com/static/shared1/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://www.homebuddy.com/static/shared1/favicon-16x16.png"
        />
        <meta name="theme-color" content="#2f54eb" />
        <meta
          name="description"
          content="Discover top-rated home improvement contractors near you with our website. Connect with experienced professionals who have been thoroughly vetted for quality and reliability."
        />
        <script defer src="https://www.homebuddy.com/index_head.d73ddf8c6d9ed5c3ef9e.js" />
        <link href="https://www.homebuddy.com/198.621bb8880c6da6dfb9d6.css" rel="stylesheet" />
        <link href="https://www.homebuddy.com/199.2cdd3f37c994398f6b3a.css" rel="stylesheet" />
        <link href="https://www.homebuddy.com/282.0d51bdd3a08d5d9defe9.css" rel="stylesheet" />
        <link href="https://www.homebuddy.com/283.4ca22aa427c70be355e3.css" rel="stylesheet" />
        <link
          href="https://www.homebuddy.com/index_head.69efa5c957ba279560e7.css"
          rel="stylesheet"
        />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <>
        <>
          <>{route && <Placeholder name="headless-header" rendering={route} />}</>
        </>
        <>
          <>{route && <Placeholder name="headless-main" rendering={route} />}</>
        </>
        <script
          src="https://cdn.jsdelivr.net/npm/@splidejs/splide@2.4.21/dist/js/splide.min.js"
          integrity="sha384-OT+Ky8lkzzpgUgBXGnFSt7IDJ3Yy5D2WOmSX3f0EhJSRsoOtM8NujlMSe0kdARVX"
          crossOrigin="anonymous"
        ></script>
        <>
          <>{route && <Placeholder name="headless-footer" rendering={route} />}</>
        </>
      </>
      <script>
        {`
          if (window.LazyLoad) {
           new LazyLoad();
          }
        `}
      </script>
      <script>
        {`
        const date = new Date();
         const node = document.querySelector('[data-footer-copyright-year]');
         if (node) {
           node.textContent = date.toLocaleDateString('en-US', { year: 'numeric' });
         }
         `}
      </script>
      <script>
        {`// Script for QA Team
         window.addEventListener('load', () => {
           document.body.setAttribute('data-autotest-js-ready', '');
         });`}
      </script>
      <script src="https://www.homebuddy.com/192.96508a9ff91509b52b94.js" />
      <script src="https://www.homebuddy.com/193.32780971598f7f4c7fbb.js" />
    </>
  );
};

export default Layout;
