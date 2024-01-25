/* eslint-disable @next/next/no-css-tags */
/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import { useEffect } from 'react';
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

  useEffect(() => {
    document.body.classList.add('mod_');
    document.body.classList.add('mod_webp');
    document.body.classList.add('mod_webp-alpha');
    document.body.classList.add('mod_webp-animation');
    document.body.classList.add('mod_webp-lossless');
  });

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
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
          integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
          crossOrigin="anonymous"
        />
        <meta property="og:title" content={fields?.OgTitle?.value?.toString()} />
        <meta property="og:description" content={fields?.OgDescription?.value?.toString()} />
        <meta property="og:image" content={fields?.OgImage?.value?.src?.toString()} />
        <meta property="og:type" content={route?.templateName} />
        <link
          rel="stylesheet"
          id="wp-block-library-css"
          href="https://www.ammega.com/wp-includes/css/dist/block-library/style.min.css?ver=6.4.2"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="oxygen-css"
          href="https://www.ammega.com/wp-content/plugins/oxygen/component-framework/oxygen.css?ver=4.8"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="oxygen-cache-674-css"
          href="//www.ammega.com/wp-content/uploads/oxygen/css/674.css?cache=1705325747&#038;ver=6.4.2"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="oxygen-cache-88-css"
          href="//www.ammega.com/wp-content/uploads/oxygen/css/88.css?cache=1686573419&#038;ver=6.4.2"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="oxygen-cache-500-css"
          href="//www.ammega.com/wp-content/uploads/oxygen/css/500.css?cache=1686573415&#038;ver=6.4.2"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="oxygen-cache-351-css"
          href="//www.ammega.com/wp-content/uploads/oxygen/css/351.css?cache=1686573416&#038;ver=6.4.2"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="oxygen-cache-102-css"
          href="//www.ammega.com/wp-content/uploads/oxygen/css/102.css?cache=1686573419&#038;ver=6.4.2"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="oxygen-cache-504-css"
          href="//www.ammega.com/wp-content/uploads/oxygen/css/504.css?cache=1701956586&#038;ver=6.4.2"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="oxygen-cache-11-css"
          href="//www.ammega.com/wp-content/uploads/oxygen/css/11.css?cache=1702650593&#038;ver=6.4.2"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="oxygen-universal-styles-css"
          href="//www.ammega.com/wp-content/uploads/oxygen/css/universal.css?cache=1705325747&#038;ver=6.4.2"
          type="text/css"
          media="all"
        />
      </Head>
      {/* <FEAAS.ExternalComponentBundle /> */}
      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        <header>
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
