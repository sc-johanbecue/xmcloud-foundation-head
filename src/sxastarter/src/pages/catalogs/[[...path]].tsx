import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
import {
  SitecoreContext,
  ComponentPropsContext,
  StaticPath,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentBuilder } from 'temp/componentBuilder';
import { Catalogs, Categories } from 'ordercloud-javascript-sdk';
import { Login, SetConfiguration } from 'src/services/Ordercloud/AuthenticationService';
import { IsEditingHost } from 'src/services/Head/EnvironmentService';

const SitecorePage = ({
  notFound,
  componentProps,
  layoutData,
  headLinks,
}: SitecorePageProps): JSX.Element => {
  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  if (notFound || !layoutData.sitecore.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  const isEditing = layoutData.sitecore.context.pageEditing;

  return (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext
        componentFactory={componentBuilder.getComponentFactory({ isEditing })}
        layoutData={layoutData}
      >
        <Layout layoutData={layoutData} headLinks={headLinks} />
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const getStaticPaths: GetStaticPaths = async () => {
  let paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';
  paths = [];

  if (!IsEditingHost()) {
    SetConfiguration();
    await Login(
      process?.env?.NEXT_PUBLIC_OC_ADMIN_USERNAME ?? '',
      process?.env?.NEXT_PUBLIC_OC_ADMIN_PASSWORD ?? '',
      true
    );
    const catalogs = await Catalogs.List();
    await Promise.all(
      catalogs.Items.map(async (element) => {
        const path: StaticPath = {
          params: {
            path: [element.ID],
          },
        };

        paths.push(path);

        const categories = await Categories.ListProductAssignments(element.ID).catch(() => {
          return null;
        });

        categories?.Items.map((categoryElement) => {
          const categoryPath: StaticPath = {
            params: {
              path: [element.ID, categoryElement.CategoryID],
            },
          };

          paths.push(categoryPath);

          const productPath: StaticPath = {
            params: {
              path: [element.ID, 'products', categoryElement.ProductID],
            },
          };

          paths.push(productPath);
        });
      })
    );
  }

  fallback = 'blocking';
  return {
    paths,
    fallback,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let numberOfWildcards = 0;
  if (context.params) {
    numberOfWildcards = context?.params?.path?.length ?? 0;
    context.params.requestPath = context.params.path;
    const wildcardSymbol = ',-w-,';
    const newRequestString = [`catalogs`];
    for (let i = 0; i < numberOfWildcards; i++) {
      newRequestString.push(wildcardSymbol);
    }
    context.params.path = newRequestString;
  }

  const props = await sitecorePagePropsFactory.create(context);

  return {
    props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5, // In seconds
    notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
  };
};

export default SitecorePage;
