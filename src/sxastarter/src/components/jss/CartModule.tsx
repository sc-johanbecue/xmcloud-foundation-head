import React, { useEffect, useState } from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { Spinner, Center, Box, Flex, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { GetCart } from 'src/services/Ordercloud/CartService';
import useSWR, { useSWRConfig } from 'swr';
import { CartItem } from 'src/shared/_cartItem';
import { CartOrderSummary } from 'src/shared/_cartOrderSummary';

interface Fields {
  Title: Field<string>;
}

type CartProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const CartDefaultComponent = (props: CartProps): JSX.Element => (
  <div className={`component cartModule ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Cart Module</span>
    </div>
  </div>
);

export const Default = (props: CartProps): JSX.Element => {
  const { data } = useSWR('Cart', GetCart);
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onLineItemQuantityChanged() {
    mutate('Cart');
  }

  async function onDeletePromotion() {
    mutate('Cart');
  }

  async function onAddPromotion() {
    mutate('Cart');
  }

  async function onLineItemDeleted() {
    mutate('Cart');
  }

  useEffect(() => {
    setIsLoading(true);
    mutate('cart');
    setIsLoading(false);
  }, []);

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component cartModule ${props.params.styles}`} id={id ? id : undefined}>
        {isLoading ? (
          <Center>
            <Spinner variant={'brandPrimary'} />
          </Center>
        ) : !data?.Order?.ID || data?.LineItems.length == 0 ? (
          <Text fontWeight={'bold'}>Please add line Items to you cart</Text>
        ) : data ? (
          <Box
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              align={{ lg: 'flex-start' }}
              spacing={{ base: '8', md: '16' }}
            >
              <Stack spacing={{ base: '8', md: '10' }} flex="2">
                <Heading fontSize="2xl" fontWeight="extrabold">
                  Shopping Cart ({data?.LineItems.length} item(s))
                </Heading>

                <Stack spacing="6">
                  {data?.LineItems?.map((element) => (
                    <CartItem
                      key={element.ID}
                      lineItem={element}
                      currency={data?.Order?.Currency ?? ''}
                      onLineItemQuantityChanged={onLineItemQuantityChanged}
                      onLineItemDeleted={onLineItemDeleted}
                    />
                  ))}
                </Stack>
              </Stack>

              <Flex direction="column" align="center" flex="1">
                <CartOrderSummary
                  order={data}
                  onOuterDeletePromotion={onDeletePromotion}
                  onOuterAddPromotion={onAddPromotion}
                />
                <HStack mt="6" fontWeight="semibold">
                  <p>or</p>
                  <br />
                  {/*TODO ADD EDITABLE LINK*/}
                  <Link href="/" color={'brand.500'}>
                    Continue shopping
                  </Link>
                </HStack>
              </Flex>
            </Stack>
          </Box>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return <CartDefaultComponent {...props} />;
};
