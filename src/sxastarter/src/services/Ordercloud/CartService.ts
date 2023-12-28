import { Cart, LineItem, LineItemSpec, Variant } from 'ordercloud-javascript-sdk';
import { ProductXPs } from 'src/types/ProductXPs';
import { ComposedOrder, GetComposedOrder } from './OrderService';

export async function GetCart(): Promise<ComposedOrder> {
  const currentCart = await Cart.Get();
  const currentCartAsComposedOrder = GetComposedOrder(currentCart.ID);
  return currentCartAsComposedOrder;
}

export async function AddOrUpdateLineItem(
  productId: string,
  Variant: Variant | undefined,
  quantity: number
): Promise<boolean> {
  const lineItemId = Variant?.ID ?? productId;
  const existingLineItem = await Cart.GetLineItem(lineItemId).catch(() => {
    return null;
  });
  if (existingLineItem) {
    const existingLineItemQuantity = existingLineItem.Quantity;
    const newQuantity = existingLineItemQuantity + quantity;
    existingLineItem.Quantity = newQuantity;
    const result = await Cart.PatchLineItem(lineItemId, existingLineItem).catch(() => {
      return null;
    });
    return result ? true : false;
  } else {
    const lineItem: LineItem<any, ProductXPs, any> = {
      Quantity: quantity,
      ProductID: productId,
      ID: lineItemId,
      Specs: Variant?.Specs?.map((element) => {
        const lineSpec: LineItemSpec = {
          SpecID: element.SpecID,
          OptionID: element.OptionID,
        };
        return lineSpec;
      }),
    };
    const result = await Cart.CreateLineItem(lineItem).catch(() => {
      return null;
    });

    return result ? true : false;
  }
}
