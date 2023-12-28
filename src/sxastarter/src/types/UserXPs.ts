export interface UserXPs {
  PersonalPreferences?: PersonalPrferences;
  Wishlist?: Wishlist;
}

export interface Wishlist {
  Products: string[];
}

export interface PersonalPrferences {
  Browser: boolean;
  Email: boolean;
  TextMessage: boolean;
  Post: boolean;
}
