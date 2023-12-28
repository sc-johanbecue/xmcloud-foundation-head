export interface ProductXPs {
  Name: string;
  Brand: string;
  Images: XpImage[];
  New: string;
  BundleProducts: string[];
  IncludedInBundle: string[];
  FeaturedProducts: string[];
}

export interface XpImage {
  Url: string;
  ThumbnailUrl: string;
}
