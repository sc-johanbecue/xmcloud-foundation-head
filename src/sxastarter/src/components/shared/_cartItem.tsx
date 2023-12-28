import { CloseButton, Flex, Button, useToast, Box, Text } from '@chakra-ui/react';
import * as React from 'react';
import { CartProductMeta } from './_cartProductMeta';
import { Cart, LineItem } from 'ordercloud-javascript-sdk';
import { ProductXPs } from 'src/types/ProductXPs';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { AddOrUpdateLineItem } from 'src/services/Ordercloud/CartService';
import { ComposedProduct, GetComposedProduct } from 'src/services/Ordercloud/ProductsService';
import { PriceTag } from './_priceTag';

interface QuantitySelectProps {
  quantity: number;
  productsAvailable: number;
  productId: string;
}

interface CartLineProps {
  lineItem: LineItem<any, ProductXPs, any>;
  currency: string;
  onLineItemQuantityChanged: () => Promise<void>;
  onLineItemDeleted: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CartItem = ({
  lineItem,
  currency,
  onLineItemQuantityChanged,
  onLineItemDeleted,
}: CartLineProps) => {
  const [product, setProduct] = React.useState<ComposedProduct>();
  const [isRemoving, setIsRemoving] = React.useState<boolean>(false);
  const [isAdding, setIsAdding] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const toast = useToast();

  React.useEffect(() => {
    async function GetProductDetails() {
      if (lineItem?.Product?.ID) {
        const loadedProduct = await GetComposedProduct(lineItem?.Product?.ID);
        if (loadedProduct) {
          setProduct(loadedProduct);
        }
      }
    }
    GetProductDetails();
  }, [lineItem?.Product?.ID]);

  async function onClickDelete() {
    setIsDeleting(true);

    if (lineItem?.ID) {
      await Cart.DeleteLineItem(lineItem?.ID).catch((error) => {
        if (error.isOrderCloudError) {
          toast({
            title: 'Line Item Deletion Failed',
            description: (
              <Box>
                <Text pb={2}>{error.errors.Errors[0].Message}</Text>
              </Box>
            ),
            status: 'error',
            duration: 9000,
            isClosable: true,
          });

          setIsDeleting(false);
        }
      });
    }

    await onLineItemDeleted();
    setIsDeleting(false);
  }

  const QuantitySelect = ({ productsAvailable, productId }: QuantitySelectProps) => {
    async function onChangeQuantity(quantity: number) {
      quantity > 0 ? setIsAdding(true) : setIsRemoving(true);
      await AddOrUpdateLineItem(productId, lineItem.Variant, quantity);
      await onLineItemQuantityChanged();
      quantity > 0 ? setIsAdding(false) : setIsRemoving(false);
    }

    return (
      <>
        <Button
          loadingText=""
          isLoading={isRemoving}
          disabled={(lineItem.Quantity == 1 ? true : false) || isRemoving || isAdding || isDeleting}
          onClick={() => onChangeQuantity(-1)}
          size={'md'}
          colorScheme={'brand'}
          variant={'outline'}
        >
          <FiMinus />
        </Button>
        {lineItem.Quantity}
        <Button
          loadingText=""
          isLoading={isAdding}
          disabled={productsAvailable <= lineItem.Quantity || isRemoving || isAdding || isDeleting}
          onClick={() => onChangeQuantity(1)}
          size={'md'}
          colorScheme={'brand'}
          variant={'outline'}
        >
          <FiPlus />
        </Button>
      </>
    );
  };

  return lineItem ? (
    <Box>
      <Flex
        blur={'xl'}
        direction={{ base: 'column', md: 'row' }}
        gap={6}
        justify="space-between"
        align="center"
      >
        <CartProductMeta
          name={lineItem.Product?.Name ?? ''}
          description={lineItem.Product?.Description ?? ''}
          image={lineItem.Product?.xp?.Images[0].Url ?? ''}
          isGiftWrapping={false}
          specs={lineItem.Specs}
        />

        {/* Desktop */}
        <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
          <QuantitySelect
            quantity={lineItem.Quantity}
            productsAvailable={
              product?.Variants?.find((element) => element?.ID == lineItem?.Variant?.ID)?.Inventory
                ?.QuantityAvailable ??
              product?.Product?.Inventory?.QuantityAvailable ??
              0
            }
            productId={lineItem?.Product?.ID ?? ''}
          />
          <PriceTag price={lineItem?.LineTotal ?? 0.0} currency={currency} />
          <CloseButton
            colorScheme={'brand'}
            disabled={isRemoving || isAdding || isDeleting}
            aria-label={`Delete ${lineItem?.Product?.Name} from cart`}
            onClick={onClickDelete}
          />
        </Flex>

        {/* Mobile */}
        <Flex
          mt="4"
          align="center"
          width="full"
          justify="space-between"
          display={{ base: 'flex', md: 'none' }}
        >
          <Button
            disabled={isRemoving || isAdding || isDeleting}
            onClick={onClickDelete}
            fontSize="sm"
            textDecor="underline"
          >
            Delete
          </Button>
          <QuantitySelect
            quantity={lineItem.Quantity}
            productsAvailable={
              product?.Variants?.find((element) => element?.ID == lineItem?.Variant?.ID)?.Inventory
                ?.QuantityAvailable ??
              product?.Product?.Inventory?.QuantityAvailable ??
              0
            }
            productId={lineItem?.Product?.ID ?? ''}
          />
          <PriceTag price={lineItem?.LineTotal ?? 0.0} currency={currency} />
        </Flex>
      </Flex>
    </Box>
  ) : (
    <></>
  );
};
