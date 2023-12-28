import { Me, MeUser } from 'ordercloud-javascript-sdk';
import { UserXPs, Wishlist } from 'src/types/UserXPs';
import Cookies from 'universal-cookie';
import { CachedMe } from '../Ordercloud/AccountService';

const WISHLIST_COOKIE_KEY = 'wishlist';

export async function GetWishList(): Promise<string[]> {
  const composedMe = await CachedMe.read();
  if (composedMe?.isAnon) {
    const cookies = new Cookies();
    const wishlist = cookies.get(WISHLIST_COOKIE_KEY);
    return wishlist && (wishlist as string[]);
  } else {
    return composedMe?.Profile.xp?.Wishlist?.Products ?? [];
  }
}

export async function AddProductToWishlist(productId: string): Promise<string[]> {
  const composedMe = await CachedMe.read();
  const isAnon = composedMe?.isAnon;
  if (isAnon) {
    const cookies = new Cookies();
    const wishlist = cookies.get(WISHLIST_COOKIE_KEY);
    let wishlistProducts: string[] = [];
    if (wishlist) {
      wishlistProducts = wishlist && (wishlist as string[]);
    }

    wishlistProducts.push(productId);
    cookies.set(WISHLIST_COOKIE_KEY, wishlistProducts, { secure: true, path: '/' });
    return wishlistProducts;
  } else {
    let productList = composedMe?.Profile.xp?.Wishlist?.Products;
    if (!productList) {
      productList = [];
    }

    productList?.push(productId);
    await UpdateWishlist(productList);
    return productList;
  }
}

export async function RemoveProductFromWishlist(productId: string): Promise<string[]> {
  const composedMe = await CachedMe.read();
  if (composedMe?.isAnon) {
    const cookies = new Cookies();
    const wishlist = cookies.get(WISHLIST_COOKIE_KEY);
    let wishlistProducts: string[] = [];
    if (wishlist) {
      wishlistProducts = wishlist && (wishlist as string[]);
    }
    wishlistProducts = wishlistProducts.filter((element) => element != productId);
    cookies.set(WISHLIST_COOKIE_KEY, wishlistProducts, { secure: true, path: '/' });
    return wishlistProducts;
  } else {
    let productList = composedMe?.Profile.xp?.Wishlist?.Products;
    if (!productList) {
      productList = [];
    }

    productList = productList?.filter((element) => element != productId);
    await UpdateWishlist(productList);
    return productList;
  }
}

export async function UpdateWishlist(products: string[]): Promise<void> {
  const wishList: Wishlist = {
    Products: products,
  };

  const userXp: UserXPs = {
    Wishlist: wishList,
  };

  const me: MeUser<UserXPs> = {
    xp: userXp,
  };

  await Me.Patch(me);
}
