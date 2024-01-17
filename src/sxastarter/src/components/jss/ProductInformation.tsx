import React, { useEffect, useState } from 'react';
import { ComposedProduct, GetComposedProduct } from 'src/services/Ordercloud/ProductsService';
import {
  AspectRatio,
  Center,
  SimpleGrid,
  Skeleton,
  Spinner,
  Tag,
  useToast,
  Image as ChakraImage,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiClock, FiHeart, FiBox, FiAlertCircle, FiBatteryCharging } from 'react-icons/fi';
import { RiRulerLine } from 'react-icons/ri';
import {
  LayoutServicePageState,
  // PosResolver,
  RichText,
  RichTextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { AddOrUpdateLineItem } from 'src/services/Ordercloud/CartService';
import { SpecOption, Variant } from 'ordercloud-javascript-sdk';
import useSWR, { useSWRConfig } from 'swr';
import {
  AddProductToWishlist,
  GetWishList,
  RemoveProductFromWishlist,
} from 'src/services/Ordercloud/Wishlist';
import { usePathname } from 'next/navigation';
import { VariantXPs } from 'src/types/VariantXPs';
// import config from 'temp/config';
// import { siteResolver } from 'lib/site-resolver';
// import { init } from '@sitecore/engage';
import { useRouter } from 'next/router';
import { ColorPicker } from 'src/shared/_colorPicker';
import { Gallery } from 'src/shared/_gallery';
import { PriceTag } from 'src/shared/_priceTag';
import { QuantityPicker } from 'src/shared/_quantityPicker';
import { Rating } from 'src/shared/_rating';
import { SizePicker } from 'src/shared/_sizePicker';

interface Fields {
  data: {
    contextItem: {
      productId: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      productImageAspectRatio: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      marketingText: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      id: string;
    };
  };
}

type ProductProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ProductDefaultComponent = (props: ProductProps): JSX.Element => (
  <div className={`component product ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Product Information</span>
    </div>
  </div>
);

interface BundledProductsProps {
  products: (ComposedProduct | null)[];
  title: string;
}

interface AvailableVariantsProps {
  variants: Variant[];
}

const ProductOverviewLight = ({ products, title }: BundledProductsProps): JSX.Element => {
  const path = usePathname();
  const pathParts = path.split('/');
  const productIdByUrl = pathParts[pathParts.length - 1];
  const rootPath = path.replace(productIdByUrl, '');
  return (
    <>
      {products && (
        <Box mt={4}>
          <Text fontWeight={'bold'}>{title}</Text>
          <SimpleGrid
            columns={4}
            columnGap={{ base: '4', md: '6' }}
            rowGap={{ base: '8', md: '10' }}
          >
            <>
              {products &&
                products?.map((element, key) => {
                  return (
                    <Stack key={key} spacing={{ base: '4', md: '5' }}>
                      <Box position="relative">
                        <AspectRatio ratio={4 / 3}>
                          <ChakraImage
                            src={element?.Product.xp.Images[0].Url}
                            alt={element?.Product.Name}
                            draggable="false"
                            fallback={<Skeleton />}
                            borderRadius={{ base: 'md', md: 'xl' }}
                          />
                        </AspectRatio>
                      </Box>

                      <Stack align="center">
                        {/* <Link textDecoration="underline" fontWeight="medium" color={'gray.600'}>
                      Visit Product
                    </Link> */}
                        <Text fontSize={'1.2rem'}>{element?.Product?.Name}</Text>
                        <Button
                          colorScheme="brand"
                          width="full"
                          onClick={() => {
                            window.location.href = rootPath + element?.Product.ID;
                          }}
                        >
                          Visit Product
                        </Button>
                      </Stack>
                    </Stack>
                  );
                })}
            </>
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export const Default = (props: ProductProps): JSX.Element => {
  const router = useRouter();
  const toast = useToast();
  const { sitecoreContext } = useSitecoreContext();
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [chosenVariant, setChosenVariant] = useState<Variant<VariantXPs>>();
  const [chosenColor, setChosenColor] = useState<SpecOption>();
  const [chosenSize, setChosenSize] = useState<SpecOption>();
  const [availableColors, setAvailableColors] = useState<SpecOption[]>();
  const [availableSizes, setAvailableSizes] = useState<SpecOption[]>();
  const [availableVariants, setAvailableVariants] = useState<Variant[]>();

  const [bundledProducts, setBundledProducts] = useState<(ComposedProduct | null)[]>();
  const [bundleProducts, setBundleProducts] = useState<(ComposedProduct | null)[]>();
  const [featuredProducts, setFeaturedProducts] = useState<(ComposedProduct | null)[]>();

  const [canBeAddedToCart, setCanBeAddedToCart] = useState<boolean>(false);
  const { data, isLoading } = useSWR('Product', productFetcher);
  const [availableQuantity, setAvailableQuantity] = useState<number>(
    data?.Product?.Inventory?.QuantityAvailable ?? 0
  );
  const [salePrice, setSalePrice] = useState<number>();

  async function productFetcher(): Promise<ComposedProduct | null> {
    const routerPath = router?.query?.path;
    const productIdByPath =
      routerPath != undefined ? routerPath.at(routerPath?.length - 1) : undefined;
    const productIdByField = props?.fields?.data?.contextItem?.productId?.jsonValue?.value;
    return await GetComposedProduct(productIdByField ?? productIdByPath);
  }

  const { data: wishlist } = useSWR('Wishlist', GetWishList);
  const { mutate } = useSWRConfig();
  const [numberOfPiecesToAdd, SetNumberOfPiecesToAdd] = useState<number>(0);

  async function toggleWishlistProduct(productId: string) {
    if (wishlist?.find((element) => element == productId)) {
      await RemoveProductFromWishlist(productId);
    } else {
      await AddProductToWishlist(productId);
    }

    mutate('Wishlist');
  }

  const AvailableVariants = ({ variants }: AvailableVariantsProps): JSX.Element => {
    const variantSelected = (event: string) => {
      const value = event;
      const variant = data?.Variants.find((element) => element.ID == value);
      setChosenVariant(variant);
      if (salePrice && variant?.Specs[0]?.PriceMarkup) {
        const basePrice =
          data?.Product?.PriceSchedule?.PriceBreaks[0]?.SalePrice ??
          data?.Product?.PriceSchedule?.PriceBreaks[0].Price ??
          0.0;
        setSalePrice(basePrice + basePrice * (variant?.Specs[0]?.PriceMarkup / 100));
        setAvailableQuantity(variant?.Inventory?.QuantityAvailable ?? 0);
      }
    };
    return (
      <>
        <RadioGroup onChange={variantSelected} value={chosenVariant?.ID}>
          {variants.map((element, key) => {
            const specs = element.Specs;
            const firstSpec = specs?.length == 1 ? specs[0] : undefined;
            let variantName = element?.Name ?? element.ID;
            if (firstSpec != undefined && firstSpec.PriceMarkup) {
              variantName += ' (+' + firstSpec.PriceMarkup + '%)';
            }
            return (
              <Box key={key}>
                <Radio value={element.ID}>{variantName}</Radio>
              </Box>
            );
          })}
        </RadioGroup>
        {/* <Select placeholder="Select a Variant" onChange={variantSelected}>
          {variants.map((element, key) => {
            return (
              <option key={key} value={element.ID}>
                Test
              </option>
            );
          })}
        </Select> */}
      </>
    );
  };

  function GetAvailableSpecValues(
    loadedProduct: ComposedProduct,
    specName: string
  ): SpecOption[] | undefined {
    return loadedProduct.Specs.find((element) => element.Name == specName)?.Options;
  }

  function SetNewNumberOfPiecesToAdd(newVal: number) {
    const hasVariants = data?.Variants.length != 0;
    setCanBeAddedToCart(
      newVal > 0 && availableQuantity > 0 && (!hasVariants || chosenVariant != undefined)
        ? true
        : false
    );
    SetNumberOfPiecesToAdd(newVal);
  }

  function SetNewSizeValue(newVal: SpecOption) {
    setChosenSize(newVal);
    if (data?.Specs?.length == 1) {
      const variant = data?.Variants.find((element) =>
        element.Specs.find((innerElement) => innerElement.Value == newVal.Value)
      );
      setChosenVariant(variant);
      setAvailableQuantity(variant?.Inventory?.QuantityAvailable ?? 0);
      console.log(variant);
    } else if (data?.Specs?.length == 2 && chosenColor) {
      const variant = data?.Variants.find((element) => {
        const matchingColor = element.Specs.find(
          (innerElement) => innerElement.Value == newVal.Value
        );
        const matchingSize = element.Specs.find(
          (innerElement) => innerElement.Value == chosenColor.Value
        );

        return matchingColor && matchingSize;
      });
      setChosenVariant(variant);
      setAvailableQuantity(variant?.Inventory?.QuantityAvailable ?? 0);
      console.log(variant);
    }
  }

  function SetNewColorValue(newVal: SpecOption) {
    setChosenColor(newVal);
    if (data?.Specs?.length == 1) {
      const variant = data?.Variants.find((element) =>
        element.Specs.find((innerElement) => innerElement.Value == newVal.Value)
      );
      setChosenVariant(variant);
      setAvailableQuantity(variant?.Inventory?.QuantityAvailable ?? 0);
      console.log(variant);
    } else if (data?.Specs?.length == 2 && chosenSize) {
      const variant = data?.Variants.find((element) => {
        const matchingColor = element.Specs.find(
          (innerElement) => innerElement.Value == newVal.Value
        );
        const matchingSize = element.Specs.find(
          (innerElement) => innerElement.Value == chosenSize.Value
        );

        return matchingColor && matchingSize;
      });
      setChosenVariant(variant);
      setAvailableQuantity(variant?.Inventory?.QuantityAvailable ?? 0);
      console.log(variant);
    }
  }

  // const {
  //   sitecoreContext: { route, site },
  // } = useSitecoreContext();

  async function AddToCart() {
    if (numberOfPiecesToAdd <= 0) {
      toast({
        title: 'Could not add Item to cart - Please specify number of items',
        description: '',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (data) {
      setIsAdding(true);

      /* CDP RELATED STUFF */
      /* Initial Version, will be enahnced */

      // const siteInfo = siteResolver.getByName(site?.name || config.jssAppName);
      // const language = route?.itemLanguage || config.defaultLanguage;
      // //let result = true;
      // const pointOfSale = PosResolver.resolve(siteInfo, language);
      // const engage = await init({
      //   clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      //   targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      //   // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      //   cookieDomain: window.location.hostname.replace(/^www\./, ''),
      //   // Cookie may be created in personalize middleware (server), but if not we should create it here
      //   forceServerCookieMode: false,
      // });

      // const page = route?.name;
      // engage.addProduct({
      //   channel: 'WEB',
      //   pointOfSale,
      //   page,
      //   language,
      //   product: {
      //     type: 'PRODUCT',
      //     itemId: data.Product.ID,
      //     name: data.Product.Name,
      //     orderedAt: new Date().toISOString(),
      //     quantity: numberOfPiecesToAdd,
      //     price: data?.Product?.PriceSchedule?.PriceBreaks[0].Price,
      //     productId: data.Product.ID,
      //     currency: data?.Product?.PriceSchedule?.Currency,
      //     referenceId: data.Product.ID,
      //   },
      //   currency: data?.Product?.PriceSchedule?.Currency,
      // });

      //* END

      const result = await AddOrUpdateLineItem(
        data?.Product.ID,
        chosenVariant,
        numberOfPiecesToAdd
      );

      if (result == null) {
        toast({
          title:
            'Could not add ' + numberOfPiecesToAdd + ' pieces of ' + data.Product.Name + ' to Cart',
          description: '',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Added ' + numberOfPiecesToAdd + ' pieces of ' + data.Product.Name + ' to Cart',
          description: '',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }

      setIsAdding(false);
    } else {
      toast({
        title: 'Error in adding product to cart',
        description: 'Please try again or reach out to our support team via support@hahn-solo.net',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    }

    SetNewNumberOfPiecesToAdd(1);
  }

  useEffect(() => {
    mutate('Product');
    async function LoadProduct() {
      if (data) {
        const tmpAvailableColors = GetAvailableSpecValues(data, 'Color');
        setAvailableColors(tmpAvailableColors ?? undefined);

        const tmpAvailableSizes = GetAvailableSpecValues(data, 'Size');
        setAvailableSizes(tmpAvailableSizes ?? undefined);

        if (!tmpAvailableColors && !tmpAvailableSizes) {
          setAvailableVariants(data.Variants);
        }

        setAvailableQuantity(data.Product.Inventory.QuantityAvailable ?? 0);

        const bundledProducts = data.Product.xp.BundleProducts;
        if (bundledProducts) {
          const loadedBundledProducts = await Promise.all(
            bundledProducts?.map(async (bundledProduct) => {
              return await GetComposedProduct(bundledProduct);
            })
          );
          setBundledProducts(loadedBundledProducts);
        }

        const includedInBundle = data.Product.xp.IncludedInBundle;
        if (includedInBundle) {
          const loadedBundles = await Promise.all(
            includedInBundle?.map(async (includedBundle) => {
              return await GetComposedProduct(includedBundle);
            })
          );
          setBundleProducts(loadedBundles);
        }

        const featuredProducts = data.Product.xp.FeaturedProducts;
        if (featuredProducts) {
          const loadedFeaturedProducts = await Promise.all(
            featuredProducts?.map(async (featuredProduct) => {
              return await GetComposedProduct(featuredProduct);
            })
          );
          setFeaturedProducts(loadedFeaturedProducts);
        }

        setSalePrice(
          data.Product.PriceSchedule.PriceBreaks[0]?.SalePrice ??
            data.Product.PriceSchedule.PriceBreaks[0].SalePrice
        );
      }
    }

    LoadProduct();
  }, [data, mutate]);

  const linkColor = useColorModeValue('gray.600', 'gray.400');
  const id = props.params.RenderingIdentifier;
  const text: RichTextField = {
    value: props?.fields?.data?.contextItem?.marketingText?.jsonValue?.value,
    editable: props?.fields?.data?.contextItem?.marketingText?.jsonValue?.editable,
  };

  if (!props.fields) {
    return <ProductDefaultComponent {...props} />;
  }

  return (
    <div className={`component product ${props.params.styles}`} id={id ? id : undefined}>
      {isLoading ? (
        <div className="centered space-s">
          <Center>
            <Spinner variant={'brandPrimary'} />
          </Center>
          <Center pt={2}>Loading...</Center>
        </div>
      ) : !data ? (
        <div className="centered space-s">
          <Center pt={2}>No product data...</Center>
        </div>
      ) : (
        <>
          <Stack
            direction={{ base: 'column-reverse', lg: 'row' }}
            spacing={{ base: '6', lg: '12', xl: '16' }}
          >
            <Stack spacing={{ base: '6', lg: '8' }} maxW={{ lg: '2xl' }} justify="center">
              <Stack spacing={{ base: '3', md: '4' }}>
                <Stack spacing="2">
                  <HStack alignSelf="baseline">
                    <Rating defaultValue={4} size="sm" />
                    <Link href="#" fontSize="sm" fontWeight="medium" color={linkColor}>
                      12 Reviews
                    </Link>
                  </HStack>
                  <HStack>
                    <Heading size="lg" fontWeight="medium">
                      {data?.Product.Name}
                    </Heading>
                    <HStack spacing="3" pb={3}>
                      {(data?.Product?.xp?.New == 'true' ? true : false) ?? false ? (
                        <Tag size={'lg'} bg={`brand.500`} color="white" fontWeight="semibold">
                          New
                        </Tag>
                      ) : (
                        <></>
                      )}
                      {data?.Product?.PriceSchedule?.PriceBreaks[0]?.SalePrice !=
                      (data?.Product?.PriceSchedule?.PriceBreaks[0]?.Price ??
                        data?.Product?.PriceSchedule?.PriceBreaks[0]?.SalePrice) ? (
                        <Tag size={'md'} bg={`blue.500`} color="white" fontWeight="semibold">
                          Offer
                        </Tag>
                      ) : (
                        <></>
                      )}
                    </HStack>
                  </HStack>

                  {data?.Product?.xp?.Brand && (
                    <Text size="lg" fontWeight="bold" color={'brand.600'}>
                      {data?.Product?.xp?.Brand}
                    </Text>
                  )}
                </Stack>
                {data?.Product?.PriceSchedule?.PriceBreaks && (
                  <PriceTag
                    price={data?.Product?.PriceSchedule?.PriceBreaks[0].Price}
                    salePriceProps={{
                      pb: 4,
                      color:
                        (data?.Product?.PriceSchedule?.PriceBreaks[0].SalePrice ??
                          data?.Product?.PriceSchedule?.PriceBreaks[0].Price) ==
                        data?.Product?.PriceSchedule?.PriceBreaks[0].Price
                          ? 'gray.800'
                          : 'red.600',
                    }}
                    salePrice={data?.Product?.PriceSchedule?.PriceBreaks[0].SalePrice}
                    currency={data?.Product?.PriceSchedule?.Currency}
                    priceProps={{ color: 'gray.800' }}
                    rootProps={{ fontSize: 'xl' }}
                  />
                )}

                <Text textAlign={'justify'} color={linkColor}>
                  {chosenVariant?.Description ?? data?.Product.Description}
                </Text>
              </Stack>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '6', md: '8' }}>
                <Stack flex="1">
                  {availableColors && (
                    <ColorPicker options={availableColors} setChosenValue={SetNewColorValue} />
                  )}
                  {availableQuantity == 0 ? (
                    <HStack spacing="1" color={linkColor}>
                      <Icon as={FiAlertCircle} />
                      <Text fontSize="xs" fontWeight="medium">
                        Out of stock
                      </Text>
                    </HStack>
                  ) : availableQuantity < 5 ? (
                    <HStack spacing="1" color={linkColor}>
                      <Icon as={FiClock} />
                      <Text fontSize="xs" fontWeight="medium">
                        Low stock ({availableQuantity})
                      </Text>
                    </HStack>
                  ) : availableQuantity >= 5 && availableQuantity < 10 ? (
                    <HStack spacing="1" color={linkColor}>
                      <Icon as={FiBatteryCharging} />
                      <Text fontSize="xs" fontWeight="medium">
                        Medium stock ({availableQuantity})
                      </Text>
                    </HStack>
                  ) : (
                    <HStack spacing="1" color={linkColor}>
                      <Icon as={FiBox} />
                      <Text fontSize="xs" fontWeight="medium">
                        High stock ({availableQuantity})
                      </Text>
                    </HStack>
                  )}
                </Stack>
                <Stack flex="1">
                  <>
                    {availableSizes && (
                      <>
                        <SizePicker
                          defaultValue="32"
                          options={availableSizes}
                          setChosenValue={SetNewSizeValue}
                        />{' '}
                        <HStack spacing="1" color={linkColor}>
                          <Icon as={RiRulerLine} />
                          <Link
                            href="#"
                            fontSize="xs"
                            fontWeight="medium"
                            textDecoration="underline"
                          >
                            View our sizing guide
                          </Link>
                        </HStack>
                      </>
                    )}
                  </>
                </Stack>
              </Stack>
              {availableVariants && <AvailableVariants variants={availableVariants} />}
              <HStack spacing={{ base: '4', md: '8' }} align="flex-end" justify="space-evenly">
                <Box flex="1">
                  {(data.Variants.length > 0 && chosenVariant) || data ? (
                    <QuantityPicker
                      newVal={numberOfPiecesToAdd}
                      defaultValue={numberOfPiecesToAdd > 0 ? 1 : 0}
                      min={availableQuantity > 0 ? 1 : 0}
                      max={availableQuantity}
                      setChosenValue={SetNewNumberOfPiecesToAdd}
                    />
                  ) : (
                    <></>
                  )}
                </Box>
                <Box flex="1">
                  <Button
                    variant="outline"
                    size="lg"
                    fontSize="md"
                    width="full"
                    color={
                      wishlist &&
                      wishlist.find(
                        (innerElement) => innerElement == props.fields.data.contextItem.id
                      )
                        ? 'white'
                        : 'brand.400' ?? 'brand.400'
                    }
                    backgroundColor={
                      wishlist &&
                      wishlist.find(
                        (innerElement) => innerElement == props.fields.data.contextItem.id
                      )
                        ? 'brand.400'
                        : 'white' ?? 'white'
                    }
                    onClick={() => toggleWishlistProduct(props.fields.data.contextItem.id)}
                    leftIcon={<Icon as={FiHeart} boxSize="4" />}
                  >
                    Favorite
                  </Button>
                </Box>
              </HStack>

              <Button
                _hover={{ cursor: canBeAddedToCart ? 'pointer' : 'not-allowed' }}
                onClick={canBeAddedToCart ? AddToCart : undefined}
                loadingText="Adding..."
                isLoading={isAdding}
                colorScheme={'brand'}
                size="lg"
              >
                Add to cart{' '}
                {chosenVariant ? (
                  <>
                    ({salePrice}
                    {data?.Product?.PriceSchedule?.Currency})
                  </>
                ) : (
                  <></>
                )}
              </Button>

              <div className="product-marketingText">
                {!data || !text.value ? (
                  <></>
                ) : (
                  <div>
                    <b>Additional Information</b>
                  </div>
                )}
                {data || sitecoreContext.pageState === LayoutServicePageState.Edit ? (
                  <div>
                    <RichText field={text} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Stack>
            <Gallery
              rootProps={{ overflow: 'hidden', flex: '1' }}
              images={chosenVariant?.xp?.Images ?? data?.Product.xp.Images}
              aspectRatio={Number(
                props?.fields?.data?.contextItem?.productImageAspectRatio?.jsonValue?.value ??
                  '1.33'
              )}
            />
          </Stack>

          {bundledProducts && (
            <ProductOverviewLight
              products={bundledProducts}
              title={'Get the following products in the bundle'}
            />
          )}
          {bundleProducts && (
            <ProductOverviewLight
              products={bundleProducts}
              title={'Save more if you buy this product in one of our attractive bundles'}
            />
          )}
          {featuredProducts && (
            <ProductOverviewLight
              products={featuredProducts}
              title={'These Products might also be interesting for you'}
            />
          )}
        </>
      )}
    </div>
  );
};
