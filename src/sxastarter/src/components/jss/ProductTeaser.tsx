import React, { useEffect, useState } from 'react';
import { ComposedProduct, GetComposedProduct } from 'src/services/Ordercloud/ProductsService';
import {
  Center,
  Spinner,
  Flex,
  Box,
  chakra,
  Image,
  Badge,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { LayoutServicePageState, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  data: {
    datasource: {
      productId: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      marketingText: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      url: {
        path: string;
      };
    };
  };
}

type ProductProps = {
  params: { [key: string]: string };
  fields: Fields;
  url: string;
};

const ProductDefaultComponent = (props: ProductProps): JSX.Element => (
  <div className={`component productTeaser ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Product Information</span>
    </div>
  </div>
);

export const Default = (props: ProductProps): JSX.Element => {
  const [product, setProduct] = useState<ComposedProduct | null>();
  const { sitecoreContext } = useSitecoreContext();
  const bg = useColorModeValue('brand.300', 'brand.700');
  const text = useColorModeValue('brandedTextColor.100', 'brandedTextColor.900');

  useEffect(() => {
    async function LoadProduct() {
      const loadedProduct = await GetComposedProduct(
        props?.fields?.data?.datasource?.productId?.jsonValue?.value
      );

      if (loadedProduct) {
        setProduct(loadedProduct);
      }
    }

    LoadProduct();
  }, [props?.fields?.data?.datasource?.productId?.jsonValue?.value]);

  interface TeaserContainerProps {
    url: string;
    children: React.ReactNode;
  }

  const id = props.params.RenderingIdentifier;
  const TeaserContainer = ({ url, children }: TeaserContainerProps) => {
    return sitecoreContext.pageState != LayoutServicePageState.Edit ? (
      <Link href={url} _hover={{ textDecoration: 'none' }}>
        {children}
      </Link>
    ) : (
      <div>{children}</div>
    );
  };

  const chakraStyling = true;
  if (props.fields) {
    return (
      <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
        {product && chakraStyling ? (
          <TeaserContainer url={props?.fields?.data?.datasource?.url?.path}>
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
                  fontSize="4xl"
                  color={text}
                  textTransform="uppercase"
                  _hover={{ textDecoration: 'none' }}
                >
                  {product?.Product?.Name}
                </chakra.h1>
                <chakra.p mt={1} fontSize="2xl" color={text} _hover={{ textDecoration: 'none' }}>
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
                  {product?.Product?.Inventory?.QuantityAvailable > 0 ? (
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
            </Box>
          </TeaserContainer>
        ) : product && !chakraStyling ? (
          <div className={`productTeaser`}>
            <div className="product-field-image">
              <img src={product?.Product?.xp?.Images[0]?.Url} alt={product?.Product?.Name} />
            </div>
            <div className="productTeaser-component-content">
              <div className="productTeaser-text">
                <div>
                  <h2 className="productTeaser-headline">{product?.Product?.Name}</h2>
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
                      {product?.Product?.PriceSchedule?.PriceBreaks[0]?.Price ? (
                        <div className="productTeaser-text-field-price">
                          Price: {product?.Product?.PriceSchedule?.Currency == 'USD' ? '$' : ''}
                          {product?.Product?.PriceSchedule?.PriceBreaks[0]?.Price?.toFixed(2)}
                          {product?.Product?.PriceSchedule?.Currency == 'EUR' ? '€' : ''}
                        </div>
                      ) : (
                        <></>
                      )}
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
                        {product?.Product?.PriceSchedule?.PriceBreaks.map((element) => {
                          <li>
                            {element.Quantity} = {element.Price}{' '}
                            {product?.Product?.PriceSchedule?.Currency}
                          </li>;
                        })}
                      </>
                    </ul>
                  </div>
                  <div className="productTeaser-cta">
                    <a href={props?.fields?.data?.datasource?.url?.path}>DETAILS</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
