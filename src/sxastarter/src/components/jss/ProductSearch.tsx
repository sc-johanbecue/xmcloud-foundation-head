import {
  Stack,
  Box,
  Text,
  Link,
  HStack,
  SimpleGrid,
  Tag,
  Center,
  Heading,
  useColorMode,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { Rating } from 'src/shared/_rating';
import { PriceTag } from 'src/shared/_priceTag';
import { useRouter } from 'next/router';
import {
  ComponentRendering,
  Field,
  GetStaticComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Categories, Me, BuyerProduct } from 'ordercloud-javascript-sdk';
import { ProductXPs } from 'src/types/ProductXPs';
import { Login, SetConfiguration } from 'src/services/Ordercloud/AuthenticationService';
import ocConfig from 'src/services/Ordercloud/constants/ordercloud-config';

interface Fields {
  categoryId: Field<string>;
}

export type ProductTeaserProps = {
  name?: string;
  internalId?: string;
  id: string;
  new?: boolean;
  image?: string;
  brand?: string;
  price?: string;
  oldPrice?: string;
  url?: string;
  templateName?: string;
  description?: string;
  showReview?: boolean;
  ImageAspectRatio?: number;
};

type ProductSearchProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
  fields: Fields;
  products: ProductTeaserProps[];
};

const ProductSearchDefaulComponent = (props: ProductSearchProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Product Search</span>
      <span>{JSON.stringify(props, null, 2)}</span>
    </div>
  </div>
);

export const Default = (props: ProductSearchProps): JSX.Element => {
  const router = useRouter();
  const path = router?.query?.requestPath ?? router?.query?.path;
  const numberOfWildcards = path?.length ?? 0;
  const newPath =
    numberOfWildcards == 1 ? router.asPath : router.asPath.slice(0, router.asPath.lastIndexOf('/'));

  const numberOfProducts = Number(props.params['NumberProducts']) ?? 12;
  const numberOfProductsPerRow = parseInt(props.params['NumberProductsPerGrid'] ?? 4);
  const base = 1;
  const sm = 2;
  const md = numberOfProductsPerRow > 1 ? numberOfProductsPerRow - 1 : 1;
  const lg = numberOfProductsPerRow;
  const [products] = useState<ProductTeaserProps[]>(props.products);
  const [isLoading] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const productImageHeight = useBreakpointValue({
    base: 192,
    xs: 192,
    sm: 192,
    md: 280,
    lg: 385,
    xl: 385,
    '2xl': 385,
  });
  const productImageWidth = useBreakpointValue({
    base: 150,
    xs: 150,
    sm: 150,
    md: 200,
    lg: 300,
    xl: 300,
    '2xl': 300,
  });
  const colorModeValue = useColorModeValue('brand.600', 'brand.400');

  useEffect(() => {
    props.products.forEach((element) => {
      element.url = newPath + '/Products/' + element.id;
    });
  }, [newPath]);

  const ProductTeaser = (props: ProductTeaserProps): JSX.Element => (
    <Stack spacing={{ base: '3', md: '5' }} p={2}>
      <Box position="relative">
        <Box
          height={{ base: 200, sm: 200, md: 300, lg: 400 }}
          border={
            colorMode === 'light' ? '1px solid rgba(0,0,0,0.5)' : '1px solid rgba(255,255,255,0.5)'
          }
          rounded={'lg'}
        >
          <Box
            position={'relative'}
            m={'auto'}
            width={'auto'}
            top={'50%'}
            // maxH={{ base: 190, sm: 190, md: 290, lg: 390 }}
            transform={'translateY(-50%)'}
            px={1}
          >
            <Image
              style={{ margin: 'auto' }}
              height={productImageHeight}
              width={productImageWidth}
              sizes="(max-width: 480px) 25vw, (max-width: 768px) 30vw, (max-width: 1280px) 50vw, 60vw"
              src={props.image ?? ''}
              alt={props.name ?? ''}
            />
          </Box>
        </Box>
        <HStack spacing="3" position="absolute" bottom="3" left="3">
          {props.new ?? false ? (
            <Tag size={'xl'} p={2} bg={`brand.500`} color="white" fontWeight="semibold">
              New
            </Tag>
          ) : (
            <></>
          )}
          {props.oldPrice != undefined &&
          props.price != undefined &&
          (props?.oldPrice ?? '') != '' &&
          (props?.price ?? '') != '' &&
          props.price != (props?.oldPrice ?? props.price) ? (
            <Tag size={'xl'} p={2} bg={`secondary.500`} color="white" fontWeight="semibold">
              Offer
            </Tag>
          ) : (
            <></>
          )}
        </HStack>
      </Box>
      <Stack spacing="-4">
        {props?.brand ? (
          <Text pb={3} fontSize="2xl" color={colorModeValue}>
            {props.brand}
          </Text>
        ) : (
          <Text pb={0} fontSize="2xl" color={colorModeValue}>
            &nbsp;
          </Text>
        )}
        <HStack justifyContent="space-between">
          <Link href={props.url} textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <Text fontWeight="medium">{props.name}</Text>
          </Link>

          <PriceTag
            currency={'EUR'}
            price={Number(props.price)}
            priceProps={{ fontSize: '1.3rem' }}
            salePrice={Number(props.oldPrice)}
            salePriceProps={{
              color: (props?.oldPrice ?? props.price) == props.price ? 'gray' : 'red',
            }}
          />
        </HStack>
        <Text noOfLines={4} pb={0} fontSize="xl">
          {props.description}
        </Text>
        {props?.showReview && (
          <HStack>
            <Rating defaultValue={Math.floor(Math.random() * 5)} size="xl" />
            <Text fontWeight="medium" fontSize="2xl">
              ({Math.floor(Math.random() * 1000)})
            </Text>
          </HStack>
        )}
      </Stack>
    </Stack>
  );

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <Box className={`component ${props.params.styles}`} id={id ? id : undefined}>
        {((!isLoading && !products) || products?.length) == 0 ? (
          <Center mt={4}>
            <Heading>No Products found...</Heading>
          </Center>
        ) : products ? (
          <SimpleGrid
            mt={4}
            columns={{ base: base, sm: sm, md: md, lg: lg }}
            gap={{ base: '8', lg: '10' }}
          >
            {products?.map((product, key) => {
              if (key >= numberOfProducts) {
                return <></>;
              }
              return (
                <ProductTeaser
                  key={product.id}
                  internalId={product.internalId}
                  id={product.id}
                  brand={product.brand}
                  image={product.image}
                  name={product.name}
                  new={product.new}
                  oldPrice={product.oldPrice}
                  price={product.price}
                  url={product.url}
                  description={product.description}
                  showReview={true}
                  ImageAspectRatio={product.ImageAspectRatio}
                />
              );
            })}
          </SimpleGrid>
        ) : (
          <></>
        )}
      </Box>
    );
  }

  return <ProductSearchDefaulComponent {...props} />;
};

export const getStaticProps: GetStaticComponentProps = async (_rendering, _layoutData, context) => {
  const productList: ProductTeaserProps[] = [];
  const path = context?.params?.requestPath ?? context?.params?.path;
  const numberOfWildcards = path?.length ?? 0;
  let catalogId = '';
  let categoryId = '';
  let productId = '';
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
  } else if (numberOfWildcards == 3) {
    if (path !== undefined) {
      if (typeof path !== 'string') {
        productId = path[path.length - 1] ?? '';
        categoryId = path[path.length - 2] ?? '';
        catalogId = path[path.length - 3] ?? '';
      }
    }
  }

  if (!catalogId && !categoryId && !productId) {
    return;
  }

  SetConfiguration();
  await Login(ocConfig.adminUserName, ocConfig.adminPw, true);

  const categoryProductAssignments = await Categories.ListProductAssignments(catalogId, {
    categoryID: categoryId,
  }).catch(() => {
    return null;
  });

  for await (const element of categoryProductAssignments?.Items ?? []) {
    const productId = element.ProductID;
    const ocProduct = await Me.GetProduct<BuyerProduct<ProductXPs>>(productId).catch((error) =>
      console.log(error)
    );

    console.log(JSON.stringify(ocProduct, null, 2));
    // Ensure only active products are used
    if (ocProduct && ocProduct.Active) {
      const product: ProductTeaserProps = {
        id: productId,
        brand: ocProduct?.xp?.Brand ?? '',
        image: ocProduct?.xp?.Images?.at(0)?.Url ?? '',
        name: ocProduct?.Name ?? '',
        oldPrice: ocProduct?.PriceSchedule?.PriceBreaks[0]?.Price?.toString() ?? null,
        price: ocProduct?.PriceSchedule?.PriceBreaks[0]?.SalePrice?.toString() ?? null,
        url: '',
        description: ocProduct?.Description ?? '',
        new: ocProduct?.xp?.New == 'true' ? true : false ?? false,
        ImageAspectRatio: ocProduct?.xp?.ImageAspectRation ?? 1,
        showReview: false,
      };
      productList.push(product);
    }
  }

  return { products: productList ?? [] };
};
