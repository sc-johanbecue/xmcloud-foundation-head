import React, { useEffect, useState } from 'react';
import {
  DictionaryPhrases,
  Field,
  GraphQLDictionaryService,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Box,
  Link,
  Heading,
  Stack,
  Image,
  Text,
  AspectRatio,
  Divider,
  Skeleton,
  Tag,
  HStack,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { GetWishList, RemoveProductFromWishlist } from 'src/services/Ordercloud/Wishlist';
import { GetComposedProduct } from 'src/services/Ordercloud/ProductsService';
import { GetProductItem } from 'src/services/XMCloud/ProductsService';
import { AiOutlineClose } from 'react-icons/ai';
import config from 'temp/config';
import useSWR, { useSWRConfig } from 'swr';
import { PriceTag } from 'src/shared/_priceTag';
import { ProductTeaserSkeleton } from 'src/shared/_productTeaserSkeleton';

interface Fields {
  Title: Field<string>;
}

type WishlistProps = {
  params: { [key: string]: string };
  fields: Fields;
};

type WishlistProduct = {
  name?: string;
  shortDescription?: string;
  internalId: string;
  id: string;
  image?: string;
  brand?: string;
  price?: string;
  oldPrice?: string;
  new?: boolean;
  url?: string;
  showReview?: boolean;
};

const WishlistDefaultComponent = (props: WishlistProps): JSX.Element => (
  <div className={`component wishlistModule ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Wishlist Module</span>
    </div>
  </div>
);

export const Default = (props: WishlistProps): JSX.Element => {
  const [dictionaryData, setDictionaryData] = useState<DictionaryPhrases>();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sitecoreContext } = useSitecoreContext();
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>();
  const language = sitecoreContext?.language ?? 'en';
  const { data: wishlist } = useSWR('Wishlist', GetWishList);
  const { mutate } = useSWRConfig();

  async function onRemoveFromWishlist(productId: string) {
    setIsClicked(true);
    await RemoveProductFromWishlist(productId);
    mutate('Wishlist');
    setIsClicked(false);
  }

  useEffect(() => {
    setIsLoading(true);
    async function GetDictionaryEntries() {
      const dictionaryService = new GraphQLDictionaryService({
        endpoint: config.graphQLEndpoint,
        apiKey: config.sitecoreApiKey,
        siteName: sitecoreContext.site?.name ?? config.sitecoreSiteName,
      });

      const entries = await dictionaryService.fetchDictionaryData(language).catch(() => {
        return null;
      });

      if (entries) {
        setDictionaryData(entries);
      }
    }

    async function GetWishlistProducts() {
      const mappedWishlistProducts: WishlistProduct[] = [];
      if (wishlist) {
        await Promise.all(
          wishlist?.map(async (element: string) => {
            const xmcProduct = await GetProductItem(element, language);
            if (xmcProduct) {
              const ocProduct = await GetComposedProduct(
                xmcProduct?.item?.productId?.jsonValue?.value
              ).catch(() => {
                return undefined;
              });

              const wishListProduct: WishlistProduct = {
                id: ocProduct?.Product?.ID ?? '',
                internalId: ocProduct?.Product?.ID ?? '',
                brand: ocProduct?.Product?.xp?.Brand,
                image: ocProduct?.Product.xp.Images.at(0)?.Url ?? '',
                name: ocProduct?.Product?.Name,
                new: (ocProduct?.Product?.xp?.New == 'true' ? true : false) ?? false,
                oldPrice: ocProduct?.Product?.PriceSchedule?.PriceBreaks[0]?.Price?.toString(),
                price: ocProduct?.Product?.PriceSchedule?.PriceBreaks[0]?.SalePrice?.toString(),
                showReview: true,
                url: xmcProduct?.item?.url?.path,
                shortDescription: ocProduct?.Product?.Description,
              };

              mappedWishlistProducts.push(wishListProduct);
            }
          })
        );

        setWishlistProducts(mappedWishlistProducts);
      }
      setIsLoading(false);
      setIsClicked(false);
    }

    GetWishlistProducts();
    GetDictionaryEntries();
  }, [language, sitecoreContext.site?.name, wishlist]);

  const ProductListTeaser = (product: WishlistProduct): JSX.Element => {
    return (
      <>
        <Box className="row" marginBottom={4}>
          <Box className="col-md-3" position="relative">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  borderRadius="lg"
                  src={product.image}
                  alt="some good alt text"
                  fallback={<Skeleton />}
                />
              </AspectRatio>
              <HStack spacing="3" position="absolute" bottom="3" left="3">
                {product.new ?? false ? (
                  <Tag size={'xl'} p={2} bg={`brand.500`} color="white" fontWeight="semibold">
                    New
                  </Tag>
                ) : (
                  <></>
                )}
                {product.price != (product.oldPrice ?? product.price) ? (
                  <Tag size={'xl'} p={2} bg={`red.500`} color="white" fontWeight="semibold">
                    Offer
                  </Tag>
                ) : (
                  <></>
                )}
              </HStack>
            </Link>
          </Box>
          <Box className="col-md-8" marginTop="4">
            <Heading lineHeight={0.3}>
              <Link href={product?.url} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                {product.brand}
              </Link>
            </Heading>
            <Link href={product.url} textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Text fontWeight="medium">{product.name}</Text>
            </Link>
            <Text paddingRight={4} fontSize={'2xl'}>
              {product.shortDescription}
            </Text>
            <PriceTag
              currency={'EUR'}
              price={Number(product.oldPrice)}
              priceProps={{ color: 'gray.800' }}
              salePrice={Number(product.price)}
              salePriceProps={{
                pb: 4,
                color:
                  (product.oldPrice ?? product.price) == product.price ? 'gray.800' : 'red.600',
              }}
            />
            <HStack justifyContent="space-between"></HStack>

            <Box>
              <Link marginTop={2} fontSize={'2xl'} textDecoration={'underline'} href={product?.url}>
                {dictionaryData && dictionaryData['products_overall_todetails']}
              </Link>
            </Box>
          </Box>
          <Box className={'col-md-1'} paddingLeft={8} marginBottom={{ base: 0, sm: 2 }}>
            <Tooltip label={'Remove ' + product.name + ' from Wishlist'} fontSize="md">
              <IconButton
                top={'40%'}
                right={'50%'}
                float={'right'}
                fontSize={'24'}
                size={'2xl'}
                colorScheme={'brand'}
                aria-label="Locate Me"
                icon={<AiOutlineClose />}
                disabled={isClicked}
                onClick={() => onRemoveFromWishlist(product.internalId)}
              />
            </Tooltip>
          </Box>
        </Box>
        <Divider variant={'brandPrimary'} />
      </>
    );
  };

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component wishlist ${props.params.styles}`} id={id ? id : undefined}>
        {!isLoading && (wishlistProducts?.length ?? 0) == 0 ? (
          <Heading fontSize="3xl" fontWeight="extrabold">
            Please add products to your wishlist
          </Heading>
        ) : wishlistProducts || isLoading ? (
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
                <Heading fontSize="3xl" fontWeight="extrabold">
                  Wishlist with ({wishlistProducts?.length ?? 'X'} item(s))
                </Heading>

                <Stack spacing="6">
                  {isLoading ? (
                    <>
                      <ProductTeaserSkeleton numberElements={4} />
                    </>
                  ) : (
                    <>
                      {wishlistProducts &&
                        wishlistProducts?.map((product, key) => (
                          <Box key={key}>
                            <ProductListTeaser
                              internalId={product.internalId}
                              id={product.id}
                              key={product.internalId}
                              brand={product.brand}
                              image={product.image}
                              name={product.name}
                              new={product.new}
                              oldPrice={product.oldPrice}
                              price={product.price}
                              url={product.url}
                              showReview={product.showReview}
                              shortDescription={product.shortDescription}
                            />
                          </Box>
                        ))}
                    </>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Box>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return <WishlistDefaultComponent {...props} />;
};
