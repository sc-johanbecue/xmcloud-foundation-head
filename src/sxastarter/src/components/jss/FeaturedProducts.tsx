import React, { useEffect, useState } from 'react';
import { ComposedProduct, GetComposedProduct } from 'src/services/Ordercloud/ProductsService';
import {
  Heading,
  Center,
  Spinner,
  Flex,
  Box,
  chakra,
  Image,
  Link,
  Badge,
  Text,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { Field, Text as JSSText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Product {
  fields: {
    ProductId: {
      value: string;
    };
  };
  url: string;
}

interface Fields {
  Title: Field<string>;
  Products: Product[];
}

type ProductProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ProductDefaultComponent = (props: ProductProps): JSX.Element => (
  <div className={`component featuredProducts ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Product Information</span>
    </div>
  </div>
);

export const Default = (props: ProductProps): JSX.Element => {
  const [products, setProducts] = useState<(ComposedProduct | null)[]>();
  const pathParts = usePathname().split('/');
  const productIdByUrl = pathParts[pathParts.length - 1];

  useEffect(() => {
    async function LoadProducts() {
      let finalProductList: (ComposedProduct | null)[] = [];
      let featuredProducts: (ComposedProduct | null)[] = [];
      const currentProduct = await GetComposedProduct(productIdByUrl);
      if (currentProduct) {
        const loadedFeaturedProducts = await Promise.all(
          currentProduct?.Product.xp.FeaturedProducts?.map(async (featuredProduct) => {
            return await GetComposedProduct(featuredProduct);
          })
        );
        featuredProducts = loadedFeaturedProducts;
      }

      const loadedProducts = await Promise.all(
        props?.fields?.Products?.map(async (product) => {
          return await GetComposedProduct(product?.fields?.ProductId?.value);
        })
      );

      finalProductList = [...featuredProducts, ...loadedProducts];
      if (finalProductList) {
        setProducts(finalProductList);
      }
    }

    LoadProducts();
  }, [productIdByUrl, props?.fields?.Products]);

  const id = props.params.RenderingIdentifier;
  const chakraStyling = true;
  if (props.fields) {
    return (
      <div className={`component featuredProducts ${props.params.styles}`} id={id ? id : undefined}>
        {products ? (
          <>
            <Heading>
              <JSSText field={props.fields.Title} />
            </Heading>
            <div className="container">
              <div className="row">
                {products.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="col-lg-4 col-md-6 space-bottom-m space-top-m space-right-m"
                    >
                      {product && chakraStyling ? (
                        <Link
                          href={props?.fields?.Products[index]?.url}
                          _hover={{ textDecoration: 'none' }}
                        >
                          <Box
                            mx="auto"
                            bg="var(--chakra-colors-brand-500)"
                            shadow="lg"
                            rounded="lg"
                            _hover={{ shadow: 'dark-lg' }}
                          >
                            <Box px={4} py={2} minH={160}>
                              <chakra.h1
                                fontWeight="bold"
                                fontSize="4xl"
                                color={'white'}
                                textTransform="uppercase"
                                _hover={{ textDecoration: 'none' }}
                              >
                                {product?.Product?.Name}
                              </chakra.h1>
                              <chakra.p
                                mt={1}
                                fontSize="2xl"
                                color="white"
                                _hover={{ textDecoration: 'none' }}
                              >
                                {product?.Product?.Description}
                              </chakra.p>
                            </Box>

                            <Image
                              w="full"
                              fit="cover"
                              mt={2}
                              src={product?.Product?.xp?.Images[0]?.Url}
                              alt={product?.Product?.Name}
                            />

                            <Flex
                              alignItems="center"
                              justifyContent="space-between"
                              px={4}
                              py={2}
                              bg="var(--chakra-colors-brand-500)"
                              roundedBottom="lg"
                            >
                              <chakra.h1 color="white" fontWeight="bold" fontSize="2xl">
                                {product?.Product?.PriceSchedule?.PriceBreaks[0]?.Price ? (
                                  <>
                                    {product?.Product?.PriceSchedule?.Currency == 'USD' ? '$' : ''}
                                    {product?.Product?.PriceSchedule?.PriceBreaks[0]?.Price?.toFixed(
                                      2
                                    )}
                                    {product?.Product?.PriceSchedule?.Currency == 'EUR' ? '€' : ''}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </chakra.h1>
                              <Flex
                                alignItems="center"
                                justifyContent="flex-end"
                                gap={2}
                                roundedBottom="lg"
                              >
                                {product?.Product?.Inventory?.QuantityAvailable > 0 ? (
                                  <Badge
                                    rounded="full"
                                    px="2"
                                    py="1"
                                    fontSize="0.8em"
                                    colorScheme="green"
                                  >
                                    IN STOCK
                                  </Badge>
                                ) : (
                                  <Badge
                                    rounded="full"
                                    px="2"
                                    py="1"
                                    fontSize="0.8em"
                                    colorScheme="red"
                                  >
                                    OUT OF STOCK
                                  </Badge>
                                )}
                              </Flex>
                            </Flex>
                          </Box>
                        </Link>
                      ) : product && !chakraStyling ? (
                        <>
                          <div className={`productTeaser`}>
                            <div className="product-field-image">
                              <img
                                src={product?.Product?.xp?.Images[0]?.Url}
                                alt={product?.Product?.Name}
                              />
                            </div>
                            <div className="productTeaser-component-content">
                              <div className="productTeaser-text">
                                <div>
                                  <h2 className="productTeaser-headline">
                                    {product?.Product?.Name}
                                  </h2>
                                  <div className="productTeaser-text-field-description">
                                    {product?.Product?.Description}
                                  </div>
                                  <div className="productTeaser-text-field-quantiy">
                                    {/* {product?.Product?.Inventory?.QuantityAvailable ? (
                                    <>{product?.Product?.Inventory?.QuantityAvailable} Items left</>
                                  ) : (
                                    <></>
                                  )} */}
                                    <div className="productTeaser-text-field-availability">
                                      <div className="productTeaser-text-field-price">
                                        {product?.Product?.PriceSchedule?.PriceBreaks[0]?.Price ? (
                                          <>
                                            Price:{' '}
                                            {product?.Product?.PriceSchedule?.Currency == 'USD'
                                              ? '$'
                                              : ''}
                                            {product?.Product?.PriceSchedule?.PriceBreaks[0]?.Price?.toFixed(
                                              2
                                            )}
                                            {product?.Product?.PriceSchedule?.Currency == 'EUR'
                                              ? '€'
                                              : ''}
                                          </>
                                        ) : (
                                          <>NO PRICE AVAILABLE</>
                                        )}
                                      </div>
                                      <div className="productTeaser-text-field-stocklevel">
                                        {product?.Product?.Inventory?.QuantityAvailable > 0 ? (
                                          <div className="inStock">IN STOCK</div>
                                        ) : (
                                          <div className="outOfStock">OUT OF STOCK</div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="productTeaser-text-field-pricebreaks">
                                    <ul>
                                      <>
                                        {product?.Product?.PriceSchedule?.PriceBreaks.map(
                                          (element) => {
                                            <li>
                                              {element.Quantity} = {element.Price}{' '}
                                              {product?.Product?.PriceSchedule?.Currency}
                                            </li>;
                                          }
                                        )}
                                      </>
                                    </ul>
                                  </div>
                                  <div className="productTeaser-cta">
                                    <a href={props?.fields?.Products[index]?.url}>DETAILS</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div>Please choose Products in Content View</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="space-s">
            <Center>
              <div>
                <Spinner variant={'brandPrimary'} />
              </div>
            </Center>
            <Center>
              <div>
                <Text pt={2} fontWeight={'bold'}>
                  Loading...
                </Text>
              </div>
            </Center>
          </div>
        )}
      </div>
    );
  }

  return <ProductDefaultComponent {...props} />;
};
