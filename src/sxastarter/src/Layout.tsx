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
  FileField,
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
  FaviconReference: {
    fields: {
      Icon16?: ImageField;
      Icon32?: ImageField;
      IconAppleTouchIcon?: ImageField;
      IconWebmanifest?: FileField;
      IconSafariPinnedTab?: ImageField;
    };
  };
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

        {/* Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={
            fields?.FaviconReference?.fields?.IconAppleTouchIcon?.value?.src
              ? fields?.FaviconReference?.fields?.IconAppleTouchIcon?.value?.src
              : `${publicUrl}/favicon.ico`
          }
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={
            fields?.FaviconReference?.fields?.Icon32?.value?.src
              ? fields?.FaviconReference?.fields?.Icon32?.value?.src
              : `${publicUrl}/favicon.ico`
          }
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={
            fields?.FaviconReference?.fields?.Icon16?.value?.src
              ? fields?.FaviconReference?.fields?.Icon16?.value?.src
              : `${publicUrl}/favicon.ico`
          }
        />
        {fields?.FaviconReference?.fields?.IconWebmanifest?.value?.src ? (
          <link
            rel="manifest"
            href={fields?.FaviconReference?.fields?.IconWebmanifest?.value?.src}
          />
        ) : (
          <></>
        )}
        {fields?.FaviconReference?.fields?.IconAppleTouchIcon?.value?.src ? (
          <link
            rel="mask-icon"
            href={fields?.FaviconReference?.fields?.IconAppleTouchIcon?.value?.src}
            color="#5bbad5"
          />
        ) : (
          <></>
        )}

        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />

        {/* General Meta Data */}
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
        <link rel="canonical" href={publicUrl} />

        {/* OG Data */}
        <meta name="title" property="og:title" content={fields?.OgTitle?.value?.toString()} />
        <meta
          name="description"
          property="og:description"
          content={fields?.OgDescription?.value?.toString()}
        />
        <meta name="image" property="og:image" content={fields?.OgImage?.value?.src?.toString()} />
        <meta name="type" property="og:type" content={route?.templateName} />
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
