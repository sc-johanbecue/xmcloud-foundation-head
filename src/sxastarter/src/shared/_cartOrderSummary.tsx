import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue as mode,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import Router from 'next/router';
import * as React from 'react';
import { FaArrowRight, FaAngleDoubleRight } from 'react-icons/fa';
import { RiCoupon2Line } from 'react-icons/ri';
import { FiCheck } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import { ComposedOrder } from 'src/services/Ordercloud/OrderService';
import { formatPrice } from './_priceTag';
import { Cart } from 'ordercloud-javascript-sdk';

type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

export const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

interface CartOrderSummaryProps {
  order: ComposedOrder | undefined;
  onOuterAddPromotion(): Promise<void>;
  onOuterDeletePromotion(): Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CartOrderSummary = ({
  order,
  onOuterAddPromotion,
  onOuterDeletePromotion,
}: CartOrderSummaryProps) => {
  const [addingCoupon, setAddingCoupon] = React.useState<boolean>(false);
  const [isAddingCoupon, setIsAddingCoupon] = React.useState<boolean>(false);
  const [isDeletingCoupon, setIsDeletingCoupon] = React.useState<boolean>(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<string>('');
  const toast = useToast();

  async function onDeletePromotion() {
    setIsDeletingCoupon(true);
    const appliedPromotion = order?.Promotions[0]?.Code ?? '';
    await Cart.DeletePromotion(appliedPromotion).catch((error) => {
      if (error.isOrderCloudError) {
        toast({
          title: 'Promo code could not be removed',
          description: error.errors.Errors[0].Message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setIsDeletingCoupon(false);
        return;
      }
    });
    onOuterDeletePromotion();

    setTimeout(() => {
      setIsDeletingCoupon(false);
    }, 1500);
    return;
  }

  async function onAddPromotionCode() {
    setIsAddingCoupon(true);
    await Cart.AddPromotion(code).catch((error) => {
      if (error.isOrderCloudError) {
        toast({
          title: 'Promo code could not be added',
          description: error.errors.Errors[0].Message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setIsAddingCoupon(false);
        return;
      }
    });
    onOuterAddPromotion();

    setTimeout(() => {
      setIsAddingCoupon(false);
      setAddingCoupon(!addingCoupon);
    }, 1500);
  }

  async function onCheckoutClicked() {
    console.log('CHECKOUT CLICKED');
  }

  async function onQuickCheckoutClicked() {
    setIsSubmittingOrder(true);
    await Cart.Submit();
    Router.reload();
    // setIsSubmittingOrder(false);
  }

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem
          label="Subtotal"
          value={formatPrice(order?.Order.Subtotal ?? 0.0, { currency: order?.Order.Currency })}
        />
        <OrderSummaryItem label="Shipping">
          {/* <Link href="#" textDecor="underline">
            Calculate shipping
          </Link> */}
          <Text>
            {formatPrice(order?.Order?.ShippingCost ?? 0.0, { currency: order?.Order.Currency })}
          </Text>
        </OrderSummaryItem>
        <OrderSummaryItem label="Tax">
          {/* <Link href="#" textDecor="underline">
            Calculate shipping
          </Link> */}
          <Text>
            {formatPrice(order?.Order?.TaxCost ?? 0.0, { currency: order?.Order.Currency })}
          </Text>
        </OrderSummaryItem>
        <OrderSummaryItem
          label={
            order?.Promotions.length == 0
              ? 'Coupon Code '
              : 'Coupon Code (' + order?.Promotions[0]?.Code + ')'
          }
        >
          {order?.Promotions.length == 0 ? (
            addingCoupon ? (
              <InputGroup>
                <InputLeftElement>
                  <RiCoupon2Line />
                </InputLeftElement>
                <Input
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  placeholder="Enter Promo Code"
                />
                <Button
                  disabled={!code}
                  loadingText=""
                  isLoading={isAddingCoupon}
                  ml={3}
                  onClick={onAddPromotionCode}
                  colorScheme="brand"
                >
                  <FiCheck color={'white'} />
                </Button>
                <Button
                  disabled={isAddingCoupon}
                  ml={3}
                  onClick={() => setAddingCoupon(!addingCoupon)}
                  colorScheme="brand"
                >
                  <RxCross1 color={'white'} />
                </Button>
              </InputGroup>
            ) : (
              <Link onClick={() => setAddingCoupon(!addingCoupon)} href="#" textDecor="underline">
                Add coupon code
              </Link>
            )
          ) : (
            <>
              <Tooltip label={'Click to remove Promotion from Cart'}>
                {isDeletingCoupon ? (
                  <Text>Deleting...</Text>
                ) : (
                  <Text _hover={{ cursor: 'pointer' }} onClick={onDeletePromotion}>
                    -
                    {formatPrice(order?.Order?.PromotionDiscount ?? 0.0, {
                      currency: order?.Order.Currency,
                    })}
                  </Text>
                )}
              </Tooltip>
            </>
          )}
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(order?.Order.Total ?? 0.0, { currency: order?.Order.Currency })}
          </Text>
        </Flex>
      </Stack>
      <Button
        onClick={onQuickCheckoutClicked}
        loadingText="Processing..."
        isLoading={isSubmittingOrder}
        colorScheme="brand"
        size="lg"
        fontSize="md"
        rightIcon={<FaAngleDoubleRight />}
      >
        Order Now
      </Button>
      <Button
        onClick={onCheckoutClicked}
        colorScheme="brand"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
      >
        Checkout
      </Button>
    </Stack>
  );
};
