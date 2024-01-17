import React, { useEffect, useState } from 'react';
import { Text as JSSText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComposedMe, GetComposedMe } from 'src/services/Ordercloud/AccountService';
import {
  Box,
  Heading,
  Button,
  Stack,
  Text,
  Flex,
  SimpleGrid,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  chakra,
  useColorModeValue,
  SkeletonText,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { AddOrUpdateLineItem } from 'src/services/Ordercloud/CartService';
import { ComposedOrder, GetOrderStatusColor, Reorder } from 'src/services/Ordercloud/OrderService';
import { useSession } from 'next-auth/react';
import { SetTokensBySession } from 'src/services/Ordercloud/AuthenticationService';
import { BrandedBox } from 'src/shared/_brandedBox';
import { OrderSummaryItem } from 'src/shared/_cartOrderSummary';
import { formatPrice } from 'src/shared/_priceTag';

interface Fields {
  Title: Field<string>;
}

type ProfileOrderHistoryProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ProfileOrderHistoryDefaultComponent = (props: ProfileOrderHistoryProps): JSX.Element => (
  <div className={`component profileOrderHistory ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Profile Module</span>
    </div>
  </div>
);

export const Default = (props: ProfileOrderHistoryProps): JSX.Element => {
  const [me, setMe] = useState<ComposedMe>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dataColor = useColorModeValue('white', 'gray.800');
  const bg = useColorModeValue('white', 'gray.800');
  const bg2 = useColorModeValue('var(--chakra-colors-brand-500)', 'var(--chakra-colors-brand-500)');
  const toast = useToast();
  const { data: session } = useSession();

  useEffect(() => {
    async function GetMe() {
      const tmpMe = await GetComposedMe();
      if (tmpMe && !(tmpMe?.isAnon ?? true)) {
        setMe(tmpMe);
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    GetMe();
    if (session) {
      SetTokensBySession(session);
    }
  }, [session]);

  async function onReorderLineClicked(productId: string, quantity: number) {
    await AddOrUpdateLineItem(productId, undefined, quantity);
    toast({
      title: 'Successfully done',
      description: (
        <Box>
          <Text pb={2}> Added Line Item to the current cart</Text>
        </Box>
      ),
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }

  async function onReorderClicked(order: ComposedOrder) {
    await Reorder(order);
    toast({
      title: 'Successfully done',
      description: (
        <Box>
          <Text pb={2}> Added all Items to the current cart</Text>
        </Box>
      ),
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`component profileOrderHistory ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <BrandedBox>
          {isLoading ? (
            <>
              <SkeletonText
                noOfLines={1}
                spacing="1"
                skeletonHeight="14"
                isLoaded={!isLoading}
                fadeDuration={2}
              />
              <SkeletonText
                noOfLines={3}
                spacing="4"
                mt={'6'}
                skeletonHeight="12"
                isLoaded={!isLoading}
                fadeDuration={2}
              />
            </>
          ) : (me?.isAnon ?? true) && !session ? (
            <div className="profileOrderHistory-content">
              <Heading size={{ base: 'sm', md: 'lg' }}>
                Please login to see your Order History
              </Heading>
            </div>
          ) : session && !session?.user?.OCToken ? (
            <div className="profileModule-content">
              <Heading size={{ base: 'sm', md: 'lg' }}>
                Order History not available with social login
              </Heading>
            </div>
          ) : (
            <>
              <Heading>
                <JSSText field={props.fields.Title} />
              </Heading>
              <div className="profileModule-content-orders">
                {me?.Orders?.map((element, key) => {
                  return (
                    <Accordion key={key} allowToggle mb={5}>
                      <AccordionItem className="profileModule-content-orders-order">
                        <Heading>
                          <AccordionButton>
                            <Box
                              className="profileModule-content-orders-order-headline"
                              as="span"
                              flex="1"
                              textAlign="left"
                            >
                              Order ID: {element?.Order?.ID} -{' '}
                              <Text
                                display={'inline'}
                                color={
                                  element?.Order?.Status
                                    ? GetOrderStatusColor(element.Order.Status)
                                    : 'red'
                                }
                              >
                                {element.Order.Status}
                              </Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </Heading>
                        <AccordionPanel pb={4}>
                          <Stack
                            direction={{
                              base: 'column',
                            }}
                            w="full"
                            bg={{
                              md: bg,
                            }}
                            shadow="lg"
                          >
                            {element?.LineItems?.map((lineItemElement, key) => {
                              return (
                                <Flex
                                  direction={{
                                    base: 'row',
                                    md: 'column',
                                  }}
                                  bg={dataColor}
                                  key={key}
                                >
                                  <SimpleGrid
                                    spacingY={3}
                                    columns={{
                                      base: 1,
                                      md: 5,
                                    }}
                                    w={{
                                      base: 120,
                                      md: 'full',
                                    }}
                                    textTransform="uppercase"
                                    bg={bg2}
                                    color={'white'}
                                    py={{
                                      base: 1,
                                      md: 4,
                                    }}
                                    px={{
                                      base: 2,
                                      md: 10,
                                    }}
                                    fontSize="md"
                                    fontWeight="bold"
                                  >
                                    <span>Image</span>
                                    <span>Name</span>
                                    <span>Quantity</span>
                                    <span>Price</span>
                                    <chakra.span
                                      textAlign={{
                                        md: 'center',
                                      }}
                                    >
                                      Actions
                                    </chakra.span>
                                  </SimpleGrid>
                                  <SimpleGrid
                                    spacingY={3}
                                    columns={{
                                      base: 1,
                                      md: 5,
                                    }}
                                    w="full"
                                    py={2}
                                    px={10}
                                    fontWeight="hairline"
                                  >
                                    <span>
                                      <img
                                        alt={lineItemElement?.Product?.Name}
                                        src={lineItemElement?.Product?.xp?.Images[0]?.Url}
                                        width={100}
                                      />
                                    </span>
                                    <chakra.span
                                      textOverflow="ellipsis"
                                      overflow="hidden"
                                      whiteSpace="nowrap"
                                    >
                                      {lineItemElement?.Product?.Name}
                                    </chakra.span>
                                    <span>{lineItemElement?.Quantity}</span>
                                    <span>
                                      {lineItemElement?.LineTotal} {element?.Order?.Currency}
                                    </span>
                                    <Flex
                                      justify={{
                                        md: 'center',
                                      }}
                                    >
                                      <div>
                                        {element.Order.Status == 'Completed' ? (
                                          <Button
                                            textTransform={'uppercase'}
                                            variant="solid"
                                            colorScheme="brand"
                                            size="xl"
                                            onClick={() => {
                                              onReorderLineClicked(
                                                lineItemElement.Product?.ID ?? '',
                                                lineItemElement.Quantity
                                              );
                                            }}
                                            p={2}
                                          >
                                            Reorder Line
                                          </Button>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </Flex>
                                  </SimpleGrid>
                                </Flex>
                              );
                            })}
                          </Stack>
                          <Stack
                            bg={'white'}
                            spacing="8"
                            borderWidth="1px"
                            rounded="lg"
                            padding="8"
                            width="full"
                            mt={2}
                          >
                            <Heading size="md">Order Summary</Heading>

                            <Stack spacing="6">
                              <OrderSummaryItem
                                label="Subtotal"
                                value={formatPrice(element?.Order.Subtotal ?? 0.0, {
                                  currency: element?.Order.Currency,
                                })}
                              />
                              <OrderSummaryItem label="Shipping">
                                <Text>
                                  {formatPrice(element?.Order?.ShippingCost ?? 0.0, {
                                    currency: element?.Order.Currency,
                                  })}
                                </Text>
                              </OrderSummaryItem>
                              <OrderSummaryItem label="Tax">
                                <Text>
                                  {formatPrice(element?.Order?.TaxCost ?? 0.0, {
                                    currency: element?.Order.Currency,
                                  })}
                                </Text>
                              </OrderSummaryItem>
                              <OrderSummaryItem
                                label={
                                  element?.Promotions.length == 0
                                    ? 'Coupon Code '
                                    : 'Coupon Code (' + element?.Promotions[0]?.Code + ')'
                                }
                              >
                                <Text>
                                  -
                                  {formatPrice(element?.Order?.PromotionDiscount ?? 0.0, {
                                    currency: element?.Order.Currency,
                                  })}
                                </Text>
                              </OrderSummaryItem>
                              <Flex justify="space-between">
                                <Text fontSize="lg" fontWeight="semibold">
                                  Total
                                </Text>
                                <Text fontSize="xl" fontWeight="extrabold">
                                  {formatPrice(element?.Order.Total ?? 0.0, {
                                    currency: element?.Order.Currency,
                                  })}
                                </Text>
                              </Flex>
                            </Stack>
                            {element.Order.Status == 'Completed' ? (
                              <Button
                                float={'right'}
                                textTransform={'uppercase'}
                                variant="solid"
                                colorScheme="brand"
                                size="xl"
                                p={2}
                                onClick={() => {
                                  onReorderClicked(element);
                                }}
                              >
                                Reorder
                              </Button>
                            ) : (
                              <></>
                            )}
                          </Stack>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
              </div>
            </>
          )}
        </BrandedBox>
      </div>
    );
  }

  return <ProfileOrderHistoryDefaultComponent {...props} />;
};
