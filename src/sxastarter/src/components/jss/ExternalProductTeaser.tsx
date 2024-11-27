import React, { useEffect, useState } from 'react';
import { ComposedProduct, GetComposedProduct } from 'src/services/Ordercloud/ProductsService';
import { Flex, Box, chakra, Badge, Link, Skeleton, useColorModeValue } from '@chakra-ui/react';
import config from 'temp/config';
import {
  Field,
  LayoutServicePageState,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
// import PimProductHandler from './integration/PimProductHandler';
import { IsEditingHost } from 'src/services/Head/EnvironmentService';
import { ExtractRenderingParams } from 'src/services/Head/RenderingParamsService';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import dynamic from 'next/dynamic';

interface Fields {
  ProductId: Field<string>;
}

type ProductProps = {
  params: { [key: string]: string };
  fields: Fields;
  url: string;
  rendering: {
    dataSource: string;
  };
};

const ProductDefaultComponent = (props: ProductProps): JSX.Element => (
  <div className={`component productTeaser ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">External Product Teaser</span>
    </div>
  </div>
);

export const Default = (props: ProductProps): JSX.Element => {
  const [product, setProduct] = useState<ComposedProduct | null>();
  const { color, textColor } = ExtractRenderingParams(props.params);
  const { sitecoreContext } = useSitecoreContext();
  const bg = useColorModeValue(color + '.300', color + '.700');
  const text = textColor;
  const [productId, setProductId] = useState<string>(props?.fields?.ProductId?.value ?? '');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [publicUrl, setPublicUrl] = useState<string>(config.publicUrl);
  const isEditing = IsEditingHost();
  const doNotRender =
    !isEditing ||
    (process?.env?.NEXT_PUBLIC_CUSTOM_PIM_INTEGRATION_ACTIVATED ?? 'false') != 'true' ||
    sitecoreContext.pageState != LayoutServicePageState.Edit;

  useEffect(() => {
    if (!sitecoreContext.pageEditing) {
      setPublicUrl(window.location.host);
    }
  }, [sitecoreContext.pageEditing]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function DynamicPimProductHandler(props: any) {
    const PimProductHandler = dynamic(
      () => import(/* webpackChunkName: "PimProductHandler" */ './integration/PimProductHandler')
    );
    return <PimProductHandler {...props} />;
  }

  async function onProductIdChanged(productId: string) {
    setProductId(productId);
  }

  useEffect(() => {
    setIsLoading(true);
    async function LoadProduct() {
      const loadedProduct = await GetComposedProduct(productId ?? '');

      if (loadedProduct) {
        setProduct(loadedProduct);
      } else {
        setProduct(null);
      }
      setIsLoading(false);
    }

    LoadProduct();
  }, [productId]);

  interface TeaserContainerProps {
    url: string | undefined;
    children: React.ReactNode;
  }

  const id = props.params.RenderingIdentifier;
  const TeaserContainer = ({ url, children }: TeaserContainerProps) => {
    return sitecoreContext.pageState != LayoutServicePageState.Edit && url && url != '' ? (
      <Link href={url} _hover={{ textDecoration: 'none' }}>
        {children}
      </Link>
    ) : (
      <div>{children}</div>
    );
  };

  if (props.fields) {
    return (
      <Box
        className={`component ${props.params.styles}`}
        px={6}
        pb={8}
        pt={2}
        id={id ? id : undefined}
      >
        {!doNotRender ? (
          <DynamicPimProductHandler
            itemId={props.rendering.dataSource}
            fieldName="ProductId"
            onProductChanged={onProductIdChanged}
          />
        ) : (
          <></>
        )}

        {isLoading || product ? (
          <TeaserContainer
            url={
              product?.Product.ID
                ? `${IsEditingHost() ? publicUrl : ''}/catalogs/catalog/Products/${
                    product?.Product.ID
                  }`
                : undefined
            }
          >
            <Box
              mx="auto"
              height={'100%'}
              bg={bg}
              shadow="lg"
              rounded="lg"
              _hover={{ shadow: 'dark-lg', color: 'black' }}
            >
              <Skeleton height={isLoading ? 660 : 'full'} isLoaded={!isLoading}>
                <Box px={4} py={2}>
                  <chakra.h1
                    fontWeight="bold"
                    fontSize="4xl"
                    color={text}
                    textTransform="uppercase"
                    _hover={{ textDecoration: 'none' }}
                  >
                    {product?.Product?.Name}
                  </chakra.h1>
                  <chakra.p
                    noOfLines={3}
                    mt={1}
                    fontSize="xl"
                    color={text}
                    _hover={{ textDecoration: 'none' }}
                  >
                    {product?.Product?.Description}
                  </chakra.p>
                </Box>

                <Box
                  position={'relative'}
                  m={'auto'}
                  width={'auto'}
                  px={1}
                  pb={{ base: 4, sm: 4, md: 12, lg: 4 }}
                >
                  {sitecoreContext.pageState == LayoutServicePageState.Normal ? (
                    <Image
                      style={{ objectFit: 'cover', width: 'full', height: 'auto', margin: 'auto' }}
                      width={200}
                      height={300}
                      sizes="(max-width: 480px) 25vw, (max-width: 768px) 30vw, (max-width: 1280px) 50vw, 60vw"
                      src={product?.Product?.xp?.Images[0]?.Url ?? ''}
                      alt={product?.Product?.Name ?? ''}
                    />
                  ) : (
                    <img
                      style={{ objectFit: 'cover', width: 'full', height: 'auto', margin: 'auto' }}
                      width={200}
                      height={300}
                      sizes="(max-width: 480px) 25vw, (max-width: 768px) 30vw, (max-width: 1280px) 50vw, 60vw"
                      src={product?.Product?.xp?.Images[0]?.Url ?? ''}
                      alt={product?.Product?.Name ?? ''}
                    />
                  )}
                </Box>

                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  px={4}
                  py={2}
                  bg={bg}
                  roundedBottom="lg"
                >
                  <chakra.h1 color={text} fontWeight="bold" fontSize="2xl">
                    {product?.Product?.PriceSchedule?.PriceBreaks[0]?.Price ? (
                      <>
                        {product?.Product?.PriceSchedule?.Currency == 'USD' ? '$' : ''}
                        {product?.Product?.PriceSchedule?.PriceBreaks[0]?.Price?.toFixed(2)}
                        {product?.Product?.PriceSchedule?.Currency == 'EUR' ? '€' : ''}
                      </>
                    ) : (
                      <></>
                    )}
                  </chakra.h1>
                  <Flex alignItems="center" justifyContent="flex-end" gap={2} roundedBottom="lg">
                    {product?.Product?.Inventory?.QuantityAvailable ?? 0 > 0 ? (
                      <Badge rounded="full" px="2" py="1" fontSize="0.8em" colorScheme="green">
                        IN STOCK
                      </Badge>
                    ) : (
                      <Badge rounded="full" px="2" py="1" fontSize="0.8em" colorScheme="red">
                        OUT OF STOCK
                      </Badge>
                    )}
                  </Flex>
                </Flex>
              </Skeleton>
            </Box>
          </TeaserContainer>
        ) : (
          <TeaserContainer url="">
            <Box
              mx="auto"
              bg={bg}
              shadow="lg"
              rounded="lg"
              _hover={{ shadow: 'dark-lg', color: 'black' }}
            >
              <Box px={4} py={2}>
                <chakra.h1
                  fontWeight="bold"
                  fontSize="2xl"
                  color={text}
                  textTransform="uppercase"
                  _hover={{ textDecoration: 'none' }}
                >
                  No product found
                </chakra.h1>
                <chakra.p mt={1} fontSize="lg" color={text} _hover={{ textDecoration: 'none' }}>
                  Please try again later
                </chakra.p>
              </Box>
              <Box
                position={'relative'}
                m={'auto'}
                width={'auto'}
                px={1}
                pb={{ base: 4, sm: 4, md: 12, lg: 4 }}
              >
                <Image
                  style={{ objectFit: 'cover', width: 'full', height: 'auto', margin: 'auto' }}
                  width={200}
                  height={300}
                  sizes="(max-width: 480px) 25vw, (max-width: 768px) 30vw, (max-width: 1280px) 50vw, 60vw"
                  src={`${publicUrl}/Untitled.png`}
                  alt={'Coming Soon'}
                />
              </Box>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                px={4}
                py={2}
                bg={bg}
                roundedBottom="lg"
              >
                <Flex alignItems="center" justifyContent="flex-end" gap={2} roundedBottom="lg">
                  <Badge rounded="full" px="2" py="1" fontSize="0.8em" colorScheme="red">
                    NO INFORMATION
                  </Badge>
                </Flex>
              </Flex>
            </Box>
          </TeaserContainer>
        )}
      </Box>
    );
  }

  return <ProductDefaultComponent {...props} />;
};
