import { Center, Heading, Spinner, Tag, Box } from '@chakra-ui/react';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import {
  Categories,
  Category,
  CategoryAssignment,
  ListPage,
  RequiredDeep,
} from 'ordercloud-javascript-sdk';
import { Field, GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { Login, SetConfiguration } from 'src/services/Ordercloud/AuthenticationService';
import ocConfig from 'src/services/Ordercloud/constants/ordercloud-config';

interface Fields {
  categoryId: Field<string>;
}

type ProductCategoriesProps = {
  params: { [key: string]: string };
  fields: Fields;
  categories: RequiredDeep<ListPage<Category>>;
  categoryProductAssignments: RequiredDeep<ListPage<CategoryAssignment>>;
};

type MyCategory = {
  name: string;
  id: string;
  numberProducts: number;
  url: string;
};

const ProductCategoriesDefaulComponent = (props: ProductCategoriesProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Product Categories</span>
      <span>{JSON.stringify(props, null, 2)}</span>
    </div>
  </div>
);

export const Default = (props: ProductCategoriesProps): JSX.Element => {
  const [isLoading] = useState<boolean>(false);
  const [categories] = useState<RequiredDeep<ListPage<Category>>>(props?.categories ?? null);
  const [myCategories, setMyCategories] = useState<MyCategory[]>([]);

  const router = useRouter();
  const path = router?.query?.requestPath ?? router?.query?.path;
  const numberOfWildcards = path?.length ?? 0;
  const newPath =
    numberOfWildcards == 1 ? router.asPath : router.asPath.slice(0, router.asPath.lastIndexOf('/'));
  const currentCategory = router.asPath.slice(router.asPath.lastIndexOf('/') + 1);

  useEffect(() => {
    const existingCategories: MyCategory[] = [];
    if (categories) {
      categories?.Items?.forEach((element) => {
        const myCategory: MyCategory = {
          name: element.Name,
          id: element.ID,
          url: newPath + '/' + element.ID,
          numberProducts:
            props.categoryProductAssignments?.Items?.filter((assignmentElement) => {
              return assignmentElement.CategoryID == element.ID;
            })?.length ?? 0,
        };
        existingCategories.push(myCategory);
      });

      setMyCategories(existingCategories);
    }
  }, []);

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <Box pl={4} className={`component ${props.params.styles}`} id={id ? id : undefined}>
        <Heading
          mt={2}
          pt={2}
          mr={2}
          pl={1}
          fontSize={{ base: 'lg', sm: 'lg', md: 'xl', lg: '2xl' }}
          display={{ base: 'inline-block', xs: 'block', sm: 'block', md: 'inline-block' }}
        >
          More Categories:
        </Heading>
        {isLoading ? (
          <Center mt={4}>
            <Spinner variant={'brandPrimary'} />
            <Heading>Loading...</Heading>
          </Center>
        ) : (!isLoading && !categories) || categories?.Items?.length == 0 ? (
          <Center mt={4}>
            <Heading>No Categories found...</Heading>
          </Center>
        ) : !isLoading && categories ? (
          myCategories?.map((element) => {
            const isCurrentElementActive = currentCategory == element.id;
            return (
              <Link
                key={element.id}
                href={element.url}
                style={{
                  pointerEvents: isCurrentElementActive ? 'none' : 'auto',
                }}
              >
                <Tag
                  display={'inline-block'}
                  rounded={'full'}
                  px={4}
                  py={2}
                  mr={4}
                  my={2}
                  size={'xl'}
                  fontSize={{ base: 'lg', sm: 'lg', md: 'xl', lg: '2xl' }}
                  colorScheme={isCurrentElementActive ? 'secondary' : 'brand'}
                  _hover={{ boxShadow: isCurrentElementActive ? 'none' : 'outline' }}
                >
                  {element.name} ({element.numberProducts})
                </Tag>
              </Link>
            );
          })
        ) : (
          <></>
        )}
        {/* <Divider colorScheme="brand" /> */}
      </Box>
    );
  }

  return <ProductCategoriesDefaulComponent {...props} />;
};

export const getStaticProps: GetStaticComponentProps = async (_rendering, _layoutData, context) => {
  const path = context?.params?.requestPath ?? context?.params?.path;
  const numberOfWildcards = path?.length ?? 0;

  let catalogId = '';
  let categoryId = '';
  if (numberOfWildcards == 1) {
    if (path !== undefined) {
      if (typeof path !== 'string') {
        catalogId = path[path.length - 1] ?? '';
      } else {
        catalogId = path;
      }
    }
  } else if (numberOfWildcards == 2) {
    if (path !== undefined) {
      if (typeof path !== 'string') {
        categoryId = path[path.length - 1] ?? '';
        catalogId = path[path.length - 2] ?? '';
      }
    }
  }

  if (!catalogId && !categoryId) {
    return null;
  }

  SetConfiguration();
  await Login(ocConfig.adminUserName, ocConfig.adminPw, true);

  const categories = await Categories.List(catalogId).catch(() => {
    return null;
  });

  const categoryProductAssignments = await Categories.ListProductAssignments(catalogId).catch(
    () => {
      return null;
    }
  );

  return {
    categories: categories ?? [],
    categoryProductAssignments: categoryProductAssignments ?? [],
  };
};
