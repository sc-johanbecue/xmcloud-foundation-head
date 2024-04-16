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
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="google-site-verification" content="" />
        <meta itemProp="server-info" content="RD0003FF1CCB43" />
        <meta itemProp="product-version" content="2.0 ScBase.Package.91.Release_20240315.2" />
        <meta itemProp="site" content="BerryAlloc-BerryAlloc" />
        <meta itemProp="source-version" content="68452d84aeebbaa3c914fe3986a4636a53ae587e" />
        <meta itemProp="page-id" content="{6832F48F-70EA-4623-8CEC-FE154D268688}" />
        <meta itemProp="page-template" content="Site Root" />
        <meta itemProp="page-templateid" content="{DF75F9F7-33BD-4433-B607-6D139A63E2C4}" />
        <link rel="alternate" href="https://www.berryalloc.com/be/nl" hrefLang="nl-BE" />
        <link rel="alternate" href="https://www.berryalloc.com/be/fr" hrefLang="fr-BE" />
        <link rel="alternate" href="https://www.berryalloc.com/global/en" hrefLang="cs-CZ" />
        <link rel="alternate" href="https://www.berryalloc.com/dk/da" hrefLang="da-DK" />
        <link rel="alternate" href="https://www.berryalloc.com/global/en" hrefLang="de-DE" />
        <link rel="alternate" href="https://www.berryalloc.com/es/es" hrefLang="es-ES" />
        <link rel="alternate" href="https://www.berryalloc.com/fr/fr" hrefLang="fr-FR" />
        <link rel="alternate" href="https://www.berryalloc.com/global/en" hrefLang="en" />
        <link rel="alternate" href="https://www.berryalloc.com/global/en" hrefLang="en-GB" />
        <link rel="alternate" href="https://www.berryalloc.com/global/en" hrefLang="it-IT" />
        <link rel="alternate" href="https://www.berryalloc.com/nl/nl" hrefLang="nl-NL" />
        <link rel="alternate" href="https://www.berryalloc.com/no/nb" hrefLang="nb-NO" />
        <link rel="alternate" href="https://www.berryalloc.com/global/en" hrefLang="en" />
        <link rel="alternate" href="https://www.berryalloc.com/pl/pl" hrefLang="pl-PL" />
        <link rel="alternate" href="https://www.berryalloc.com/global/en" hrefLang="ru-RU" />
        <link rel="alternate" href="https://www.berryalloc.com/global/en" hrefLang="en" />
        <link rel="alternate" href="https://www.berryalloc.com/global/en" hrefLang="fi-FI" />
        <link rel="alternate" href="https://www.berryalloc.com/se/sv" hrefLang="sv-SE" />
        <link rel="alternate" href="https://www.berryalloc.com/global/en" hrefLang="tr-TR" />
        <link rel="canonical" href="https://www.berryalloc.com/global/en" />
        <meta
          name="description"
          content="BerryAlloc&#174; makes you feel at home. Laminate, parquet, vinyl planks &amp; tiles: our extensive collections have a flooring solution that is just right for you."
        />
        <link
          rel="icon"
          href="https://www.berryalloc.com/-/media/sites/berryalloc/general/logo/favicon.ashx?rev=c2390a29c9594b9ba3f0eead78204b53"
          type="image/x-icon"
        />
        <link
          href="https://www.berryalloc.com/bundles/css/BerryAlloc-BerryAlloc.css?v=75oh6EXb68w8Bv-jOJmu-qZZ9fDPk5zQue_zbUzXpoM1"
          rel="stylesheet"
        />
        <script>
          {`
         (function (d, id) {
             if (!window.flowbox) { var f = function () { f.q.push(arguments); }; f.q = []; window.flowbox = f; }
             if (d.getElementById(id)) { return; }
             var s = d.createElement('script'), fjs = d.scripts[d.scripts.length - 1]; s.id = id; s.async = true;
             s.src = ' https://connect.getflowbox.com/flowbox.js';
             fjs.parentNode.insertBefore(s, fjs);
         })(document, 'flowbox-js-embed');
        `}
        </script>
        <link
          rel="apple-touch-icon"
          href="https://www.berryalloc.com/Modules/Projects/BerryAlloc/_Shared/img/apple-touch-icon.png"
        />
      </Head>

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
