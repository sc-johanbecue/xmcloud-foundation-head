import { VariantXPs } from 'src/types/VariantXPs';
import { ProductXPs } from '../../types/ProductXPs';
import {
  Products,
  RequiredDeep,
  Spec,
  Variant,
  Me,
  BuyerProduct,
  Filters,
  SearchType,
} from 'ordercloud-javascript-sdk';

export interface ProductListOptions {
  catalogID?: string;
  categoryID?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  depth?: string;
  searchOn?: string[];
  sortBy?: string[];
  filters?: Filters;
  searchType?: SearchType;
}

export interface ComposedProduct {
  Product: RequiredDeep<BuyerProduct<ProductXPs>>;
  Specs: RequiredDeep<Spec<any, any>>[];
  Variants: RequiredDeep<Variant<VariantXPs>>[];
}

export async function GetComposedProduct(productId: string): Promise<ComposedProduct | null> {
  if (productId) {
    const product = await Me.GetProduct(productId).catch();
    const specs = await Me.ListSpecs(productId).catch();
    const variants = await Me.ListVariants(productId).catch();

    const composedProduct: ComposedProduct = {
      Product: product,
      Specs: specs?.Items,
      Variants: variants?.Items,
    };

    return composedProduct;
  }

  return null;
}

export async function GetProductList(
  options: ProductListOptions
): Promise<RequiredDeep<ProductXPs>[]> {
  const products = await Products.List<ProductXPs>(options);
  return products.Items;
}
