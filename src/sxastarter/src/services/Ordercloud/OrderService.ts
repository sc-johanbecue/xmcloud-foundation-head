import {
  LineItem,
  LineItems,
  Me,
  Order,
  OrderPromotion,
  Orders,
  OrderStatus,
} from 'ordercloud-javascript-sdk';
import { ProductXPs } from 'src/types/ProductXPs';
import { AddOrUpdateLineItem } from './CartService';

export interface ComposedOrder {
  Order: Order;
  LineItems: LineItem<any, ProductXPs, any, any, any>[];
  Promotions: OrderPromotion<any>[];
}

export async function GetOrders(): Promise<ComposedOrder[]> {
  const orders = await Me.ListOrders({
    filters: { isSubmitted: true },
    pageSize: 5,
    page: 1,
  });
  return await Promise.all(
    orders.Items.map(async (element) => {
      return await GetComposedOrder(element.ID);
    })
  );
}

export async function GetComposedOrder(orderId: string): Promise<ComposedOrder> {
  const order = await Orders.Get('All', orderId);
  const lineItems = await LineItems.List('All', orderId);
  const promotions = await Orders.ListPromotions('All', orderId);
  const composedOrder: ComposedOrder = {
    Order: order,
    LineItems: lineItems.Items,
    Promotions: promotions.Items,
  };

  return composedOrder;
}

export async function Reorder(order: ComposedOrder): Promise<void> {
  await Promise.all(
    order.LineItems.map(async (element) => {
      if (element?.Product?.ID) {
        await AddOrUpdateLineItem(element.Product.ID, undefined, element.Quantity);
      }
    })
  );
}

export function GetOrderStatusColor(orderStatus: OrderStatus): string | undefined {
  const colorMapping = new Map<string, string>([
    ['Unsubmitted', '#e4d00a'],
    ['AwaitingApproval', '#e4d00a'],
    ['Declined', '#C3423F'],
    ['Open', '#e4d00a'],
    ['Completed', '#204B57'],
    ['Canceled', '#C3423F'],
  ]);

  const mappedColor = colorMapping.get(orderStatus);
  return mappedColor ?? 'red';
}
