/* eslint-disable @next/next/no-sync-scripts */
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
    document.body.classList.add('tt-camp');
    document.body.classList.add('mobile-device');
    document.body.classList.add('bodyclass');
    document.body.classList.add('n2k21theme');
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
        <meta property="og:title" content={fields?.OgTitle?.value?.toString()} />
        <meta property="og:description" content={fields?.OgDescription?.value?.toString()} />
        <meta property="og:image" content={fields?.OgImage?.value?.src?.toString()} />
        <meta property="og:type" content={route?.templateName} data-attr="JSS-21.6.0" />

        <link
          href="https://dpwprod.azureedge.net/-/media/themes/dpwg/dpwg-tenant/shared/dpwg-theme/styles/optimized-min.css?rev=2d742ca4020b452cafcb77a728b827d4&t=20240222T130930Z&hash=426B8DC2A8717B8C9475804D9DC17635"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="https://dpwprod.azureedge.net/-/media/themes/dpwg/dpwg-tenant/shared/dpwg-theme/fonts/PilatWide-Regular-woff2.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://dpwprod.azureedge.net/-/media/themes/dpwg/dpwg-tenant/shared/dpwg-theme/fonts/PilatWide-Bold-woff2.woff2"
          as="font"
          type="font/woff2"
        />
        <meta
          name="title"
          content="DP World | Logistics | Management | Global International Trade"
        />
        <meta
          name="description"
          content="DP World is a world leader in logistics management services. We ensure future viability of global international trade & prosperity of communities around the world"
        />
        <link
          href="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/common/favicon-new.png?rev=ef45ad4b973a40b3b53b60a5e2db1cb0"
          rel="shortcut icon"
        />
        <meta
          name="keywords"
          content="DP World  Logistics management  DP World logistics  Global international trade"
        />
        <meta property="twitter:title" content="Home" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        <div className="mainWrapper" id="wrapper">
          <div className="client">
            <header>
              <div id="header">
                {route && <Placeholder name="headless-header" rendering={route} />}
              </div>
            </header>
          </div>
          <div id="content" className="main-container">
            {route && <Placeholder name="headless-main" rendering={route} />}
          </div>
        </div>
        <div id="footer" style={{ display: 'initial' }}>
          {route && <Placeholder name="headless-footer" rendering={route} />}
        </div>
      </div>

      <script src="https://dpwprod.azureedge.net/-/media/base-themes/core-libraries/scripts/optimized-min.js?rev=f4a1ddbd56e048a5a3fc33587c466041&t=20221216T094331Z&hash=E51CF7966AA2AF9ADC7AED7C387517F8" />
      <script src="https://dpwprod.azureedge.net/-/media/base-themes/analytics/scripts/optimized-min.js?rev=0c127c9b6b164966b5bc8c1e993455fa&t=20201203T173738Z&hash=38BF2C038AD264532CC1C58835503A15" />
      <script src="https://dpwprod.azureedge.net/-/media/base-themes/xa-api/scripts/optimized-min.js?rev=e233943b39ba4698b910c314a509d8f5&t=20201203T173739Z&hash=7BEB25B465074C9ACF3659EAD52A2290" />
      <script src="https://dpwprod.azureedge.net/-/media/base-themes/main-theme/scripts/optimized-min.js?rev=80b04c4712ea4521aaae6bf5ae232640&t=20201203T173740Z&hash=F78280C39F3D9405305F535895C02ADB" />
      <script src="https://dpwprod.azureedge.net/-/media/base-themes/resolve-conflicts/scripts/optimized-min.js?rev=f8d245cdb5624813a2c5b6d19ee463bf&t=20201203T173743Z&hash=1FEEC1FBFF3CB0C93096DB3478C2E0A9" />
      <script src="https://dpwprod.azureedge.net/-/media/themes/dpwg/dpwg-tenant/shared/dpwg-theme/scripts/optimized-min.js?rev=b732141e24f84cdc861c928edd21d125&t=20240222T131043Z&hash=1BF2387AE272ACCFD1A9EFF099274D8C" />
    </>
  );
};

export default Layout;
