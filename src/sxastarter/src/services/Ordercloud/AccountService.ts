import { BuyerAddress, Me, MeUser } from 'ordercloud-javascript-sdk';
import { PersonalPrferences, UserXPs } from 'src/types/UserXPs';
import { ComposedOrder, GetOrders } from './OrderService';
import { MemoryCache } from '../Caching/MemoryCache';

export interface ComposedMe {
  Profile: MeUser<UserXPs>;
  Addresses: BuyerAddress<any>[];
  Orders: ComposedOrder[];
  isAnon: boolean;
}

export const CachedMe = new MemoryCache<ComposedMe>({
  ttl: 300000, // 5 min
  update: async () => GetComposedMe(),
});

export async function GetComposedMe(): Promise<ComposedMe> {
  const me = await Me.Get();
  const addresses = await Me.ListAddresses();
  const orders = await GetOrders();

  const composedMe: ComposedMe = {
    Profile: me,
    Addresses: addresses.Items,
    Orders: orders,
    isAnon: (me?.ID ?? 'default-anonymous-shopper') == 'default-anonymous-shopper',
  };

  return composedMe;
}

export async function UpdatePersonalPreferences(
  browserPreference: boolean,
  emailPreference: boolean,
  postPreference: boolean,
  textMessagePreference: boolean
): Promise<void> {
  const personalPreference: PersonalPrferences = {
    Browser: browserPreference,
    Email: emailPreference,
    Post: postPreference,
    TextMessage: textMessagePreference,
  };

  const userXp: UserXPs = {
    PersonalPreferences: personalPreference,
  };

  const me: MeUser<UserXPs> = {
    xp: userXp,
  };

  await Me.Patch(me);
}
