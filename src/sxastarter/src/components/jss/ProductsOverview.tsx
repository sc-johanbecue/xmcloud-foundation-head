import {
  Stack,
  Heading,
  Box,
  Text,
  Image,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
  Link,
  HStack,
  SimpleGrid,
  AspectRatio,
  Skeleton,
  LightMode,
  IconButton,
  Tag,
  Divider,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  SkeletonText,
} from '@chakra-ui/react';
import {
  DictionaryPhrases,
  useSitecoreContext,
  GraphQLDictionaryService,
} from '@sitecore-jss/sitecore-jss-nextjs';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { MdOutlineTextFields } from 'react-icons/md';
import { AiOutlineRight } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';
import { GetComposedProduct } from 'src/services/Ordercloud/ProductsService';
import config from 'temp/config';
import {
  RemoveProductFromWishlist,
  AddProductToWishlist,
  GetWishList,
} from 'src/services/Ordercloud/Wishlist';
import useSWR, { useSWRConfig } from 'swr';
import { Rating } from 'src/shared/_rating';
import { PriceTag } from 'src/shared/_priceTag';
import { ProductTeaserSkeleton } from 'src/shared/_productTeaserSkeleton';

interface Product {
  id: string;
  name: string;
  displaynName: string;
  productId: {
    jsonValue: {
      value: string;
    };
  };
  productImageAspectRatio: {
    jsonValue: {
      value: string;
      editable: string;
    };
  };
  url: {
    path: string;
  };
  template: {
    name: string;
  };
  children: {
    results: Product[];
  };
}

interface Fields {
  data: {
    products: {
      children: {
        results: Product[];
      };
    };
  };
}

type ProductTeaserProps = {
  name?: string;
  internalId: string;
  id: string;
  new?: boolean;
  image?: string;
  brand?: string;
  price?: string;
  oldPrice?: string;
  url?: string;
  templateName?: string;
  description?: string;
  showReview?: boolean;
  ImageAspectRatio?: number;
};

type ProductsOverviewProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ProductsOverviewDefaultComponent = (props: ProductsOverviewProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Products Overview</span>
      <span>{JSON.stringify(props, null, 2)}</span>
    </div>
  </div>
);

export const Default = (props: ProductsOverviewProps): JSX.Element => {
  const { mutate } = useSWRConfig();
  // console.error(JSON.stringify(props, null, 2));
  const [products, setProducts] = useState<ProductTeaserProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: wishlist } = useSWR('Wishlist', GetWishList);

  async function toggleWishlistProduct(productId: string) {
    if (wishlist?.find((element) => element == productId)) {
      await RemoveProductFromWishlist(productId);
    } else {
      await AddProductToWishlist(productId);
    }

    mutate('Wishlist');
  }

  useEffect(() => {
    setIsLoading(true);
    async function LoadProduct() {
      const productList: ProductTeaserProps[] = [];
      let secondLevelProductList: Product[] = [];
      const firstLevelProductList: Product[] =
        props?.fields?.data?.products?.children?.results.filter(
          (element) => element.template.name == 'Product Page'
        );
      if (props?.fields?.data?.products?.children) {
        props?.fields?.data?.products?.children?.results.forEach((element) => {
          secondLevelProductList = secondLevelProductList.concat(
            element.children.results.filter((element) => element.template.name == 'Product Page')
          );
        });
        const allProducts = [...firstLevelProductList, ...secondLevelProductList];
        for await (const element of allProducts) {
          const productId = element?.productId?.jsonValue?.value ?? undefined;
          if (productId) {
            const ocProduct = await GetComposedProduct(productId).catch(() => {
              return undefined;
            });
            if (ocProduct) {
              const product: ProductTeaserProps = {
                id: productId,
                internalId: element.id,
                brand: ocProduct?.Product?.xp?.Brand,
                image: ocProduct?.Product?.xp?.Images?.at(0)?.Url ?? '',
                name: ocProduct?.Product?.Name,
                oldPrice: ocProduct?.Product?.PriceSchedule?.PriceBreaks[0]?.Price?.toString(),
                price: ocProduct?.Product?.PriceSchedule?.PriceBreaks[0]?.SalePrice?.toString(),
                url: element?.url?.path,
                templateName: element?.template?.name,
                description: ocProduct?.Product?.Description,
                new: ocProduct?.Product?.xp?.New == 'true' ? true : false ?? false,
                ImageAspectRatio: element?.productImageAspectRatio?.jsonValue?.value
                  ? Number(element.productImageAspectRatio.jsonValue.value)
                  : undefined,
              };
              productList.push(product);
            }
          }
        }
      }

      setProducts(productList);
      setIsLoading(false);
    }

    LoadProduct();
  }, [props?.fields?.data?.products?.children]);

  // console.log(JSON.stringify(props, null, 2));
  // const id = props.params.RenderingIdentifier;
  const numberOfProducts = Number(props.params['NumberProducts']) ?? 12;
  const numberOfProductsPerRow = parseInt(props.params['NumberProductsPerGrid']);
  const base = numberOfProductsPerRow > 2 ? numberOfProductsPerRow - 2 : 1;
  const sm = numberOfProductsPerRow > 2 ? numberOfProductsPerRow - 2 : 1;
  const md = numberOfProductsPerRow > 1 ? numberOfProductsPerRow - 1 : 1;
  const lg = numberOfProductsPerRow;

  const ProductTeaser = (props: ProductTeaserProps): JSX.Element => (
    <Stack spacing={{ base: '3', md: '5' }}>
      <Box position="relative">
        <AspectRatio ratio={props?.ImageAspectRatio ?? 3 / 4}>
          <Image
            src={props.image ?? ''}
            alt={props.name ?? ''}
            draggable="false"
            fallback={<Skeleton />}
          />
        </AspectRatio>
        <LightMode>
          <IconButton
            isRound
            color={
              wishlist?.find((element) => element == props.internalId)
                ? 'white'
                : 'brand.400' ?? 'brand.400'
            }
            backgroundColor={
              wishlist?.find((element) => element == props.internalId)
                ? 'brand.400'
                : 'white' ?? 'white'
            }
            size="lg"
            _hover={{ transform: 'scale(1.2)' }}
            sx={{ ':hover > svg': { transform: 'scale(1.2)' } }}
            transition="all 0.15s ease"
            icon={<Icon as={FiHeart} transition="all 0.15s ease" />}
            boxShadow="base"
            position="absolute"
            top="5"
            right="5"
            onClick={() => {
              toggleWishlistProduct(props.internalId);
            }}
            aria-label={`Add ${props.name} to your favourites`}
          />
        </LightMode>
        <HStack spacing="3" position="absolute" bottom="3" left="3">
          {props.new ?? false ? (
            <Tag size={'xl'} p={2} bg={`brand.500`} color="white" fontWeight="semibold">
              New
            </Tag>
          ) : (
            <></>
          )}
          {props.price != (props.oldPrice ?? props.price) ? (
            <Tag size={'xl'} p={2} bg={`red.500`} color="white" fontWeight="semibold">
              Offer
            </Tag>
          ) : (
            <></>
          )}
        </HStack>
      </Box>
      <Stack spacing="-4">
        {props?.brand ? (
          <Text pb={3} fontSize="2xl" color={'brand.400'}>
            {props.brand}
          </Text>
        ) : (
          <Text pb={0} fontSize="2xl" color={'brand.400'}>
            &nbsp;
          </Text>
        )}
        <HStack justifyContent="space-between">
          <Link href={props.url} textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <Text fontWeight="medium">{props.name}</Text>
          </Link>

          <PriceTag
            currency={'EUR'}
            price={Number(props.oldPrice)}
            priceProps={{ color: 'gray.800' }}
            salePrice={Number(props.price)}
            salePriceProps={{
              pb: 4,
              color: (props.oldPrice ?? props.price) == props.price ? 'gray.800' : 'red.600',
            }}
          />
        </HStack>
        {props?.showReview && (
          <HStack>
            <Rating defaultValue={3} size="xl" />
            <Text fontWeight="medium" fontSize="2xl">
              (22)
            </Text>
          </HStack>
        )}
      </Stack>
    </Stack>
  );

  if (props.fields) {
    return (
      <SimpleGrid columns={{ base: base, sm: sm, md: md, lg: lg }} gap={{ base: '8', lg: '10' }}>
        {products?.map((product, key) => {
          if (product?.templateName == 'Page Data') {
            return null;
          }
          if (key >= numberOfProducts) {
            return <></>;
          } else if (isLoading) {
            return (
              <>
                <ProductTeaser internalId="0" id="0" key={0} showReview={false} />
              </>
            );
          } else {
            return (
              <ProductTeaser
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
                description={product.description}
                showReview={true}
                ImageAspectRatio={product.ImageAspectRatio}
              />
            );
          }
        })}
      </SimpleGrid>
    );
  }

  return <ProductsOverviewDefaultComponent {...props} />;
};

export const List = (props: ProductsOverviewProps): JSX.Element => {
  const { mutate } = useSWRConfig();
  const { sitecoreContext } = useSitecoreContext();
  const [dictionaryData, setDictionaryData] = useState<DictionaryPhrases>();
  const language = sitecoreContext?.language ?? 'en';
  const { data: wishlist } = useSWR('Wishlist', GetWishList);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductTeaserProps[]>();

  async function toggleWishlistProduct(productId: string) {
    if (wishlist?.find((element) => element == productId)) {
      await RemoveProductFromWishlist(productId);
    } else {
      await AddProductToWishlist(productId);
    }

    mutate('Wishlist');
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

    async function LoadProduct() {
      const productList: ProductTeaserProps[] = [];
      let secondLevelProductList: Product[] = [];
      const firstLevelProductList: Product[] =
        props?.fields?.data?.products?.children?.results.filter(
          (element) => element.template.name == 'Product Page'
        );
      if (props?.fields?.data?.products?.children) {
        props?.fields?.data?.products?.children?.results.forEach((element) => {
          secondLevelProductList = secondLevelProductList.concat(
            element.children.results.filter((element) => element.template.name == 'Product Page')
          );
        });
        const allProducts = [...firstLevelProductList, ...secondLevelProductList];
        for await (const element of allProducts) {
          const productId = element?.productId?.jsonValue?.value ?? undefined;
          if (productId) {
            const ocProduct = await GetComposedProduct(productId).catch(() => {
              return undefined;
            });
            if (ocProduct) {
              const product: ProductTeaserProps = {
                id: productId,
                internalId: element.id,
                brand: ocProduct?.Product?.xp?.Brand,
                image: ocProduct?.Product?.xp?.Images?.at(0)?.Url ?? '',
                name: ocProduct?.Product?.Name,
                oldPrice: ocProduct?.Product?.PriceSchedule?.PriceBreaks[0]?.Price?.toString(),
                price: ocProduct?.Product?.PriceSchedule?.PriceBreaks[0]?.SalePrice?.toString(),
                url: element?.url?.path,
                templateName: element?.template?.name,
                description: ocProduct?.Product?.Description,
                new: ocProduct?.Product?.xp?.New == 'true' ? true : false ?? false,
                ImageAspectRatio: element?.productImageAspectRatio?.jsonValue?.value
                  ? Number(element.productImageAspectRatio.jsonValue.value)
                  : undefined,
              };
              productList.push(product);
            }
          }
        }
      }

      setProducts(productList);
      setFilteredProducts(productList);
      setIsLoading(false);
    }

    GetDictionaryEntries();
    LoadProduct();
  }, [language, props?.fields?.data?.products?.children, sitecoreContext.site?.name]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductTeaserProps[]>(products ?? []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    executeSearch(e.target.value);
  };

  const executeSearch = (query: string) => {
    const internalFilteredProducts =
      products?.filter(
        (product) =>
          product.name?.toLowerCase()?.includes(query.toLowerCase()) ||
          product.brand?.toLowerCase()?.includes(query.toLowerCase())
      ) ?? [];

    setFilteredProducts(internalFilteredProducts);
  };

  const ProductListTeaser = (product: ProductTeaserProps): JSX.Element => {
    return (
      <>
        <Box className="row" marginBottom={4}>
          <Box className="col-md-2" position="relative">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <AspectRatio ratio={product?.ImageAspectRatio ?? 3 / 4}>
                <Image
                  borderRadius="lg"
                  src={product.image}
                  alt="some good alt text"
                  height={100}
                  fallback={<Skeleton />}
                />
              </AspectRatio>
            </Link>
            <LightMode>
              <IconButton
                isRound
                color={
                  wishlist && wishlist.find((innerElement) => innerElement == product.internalId)
                    ? 'white'
                    : 'brand.400' ?? 'brand.400'
                }
                backgroundColor={
                  wishlist && wishlist.find((innerElement) => innerElement == product.internalId)
                    ? 'brand.400'
                    : 'white' ?? 'white'
                }
                size="lg"
                _hover={{ transform: 'scale(1.2)' }}
                sx={{ ':hover > svg': { transform: 'scale(1.2)' } }}
                transition="all 0.15s ease"
                icon={<Icon as={FiHeart} transition="all 0.15s ease" />}
                boxShadow="base"
                position="absolute"
                top="0"
                right="3"
                onClick={() => {
                  toggleWishlistProduct(product.internalId);
                }}
                aria-label={`Add ${product?.name}} to your favourites`}
              />
            </LightMode>
            <HStack spacing="3" position="absolute" bottom="3" left="3">
              {product.new ?? false ? (
                <Tag size={'xl'} p={2} m={1} bg={`brand.500`} color="white" fontWeight="semibold">
                  New
                </Tag>
              ) : (
                <></>
              )}
              {product.price != (product.oldPrice ?? product.price) ? (
                <Tag size={'xl'} p={2} m={1} bg={`red.500`} color="white" fontWeight="semibold">
                  Offer
                </Tag>
              ) : (
                <></>
              )}
            </HStack>
          </Box>
          <Box className="col-md-7" marginTop="4">
            <HStack justifyContent="space-between">
              <Box>
                <Heading lineHeight={0.3} color="brand.400">
                  <Link
                    href={product?.url}
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}
                  >
                    {product.brand}
                  </Link>
                </Heading>
                <Text fontSize={'3xl'} fontWeight={'bold'}>
                  <Link
                    href={product?.url}
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}
                  >
                    {product.name}
                  </Link>
                </Text>
              </Box>
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
              />{' '}
            </HStack>

            <Text fontSize={'3xl'}>{product.description}</Text>

            <Box>
              <Link marginTop={2} fontSize={'2xl'} textDecoration={'underline'} href={product?.url}>
                {dictionaryData && dictionaryData['products_overall_todetails']}
              </Link>
            </Box>
          </Box>
        </Box>
        <Divider variant={'brandPrimary'} />
      </>
    );
  };

  // const id = props.params.RenderingIdentifier;
  const numberOfNews = Number(props.params['NumberProducts']) ?? 12;
  if (props.fields) {
    return (
      <>
        <div className="container">
          <div className="row">
            {isLoading ? (
              <SkeletonText
                noOfLines={2}
                spacing="4"
                skeletonHeight="12"
                isLoaded={false}
                fadeDuration={2}
              />
            ) : (
              <>
                <div className="col-md-2">
                  <Text fontWeight={'extrabold'}>Enter Search</Text>
                </div>
                <div className="col-md-5">
                  <InputGroup>
                    <Input
                      type={'text'}
                      variant={'brandPrimary'}
                      placeholder="SEARCH"
                      value={searchQuery}
                      onChange={handleInputChange}
                    />
                    <InputRightElement pointerEvents="none">
                      <Icon as={MdOutlineTextFields} />
                    </InputRightElement>
                  </InputGroup>{' '}
                </div>
                <Box marginTop={6}>
                  <Button
                    width={'30%'}
                    loadingText=""
                    isLoading={false}
                    disabled={false}
                    size={'lg'}
                    colorScheme={'brand'}
                    variant={'solid'}
                    onClick={onOpen}
                  >
                    {dictionaryData && dictionaryData['products_comparison_comparebutton']}
                    <AiOutlineRight fontWeight={'bold'} />
                  </Button>
                </Box>
              </>
            )}
          </div>
          <hr />
          {isLoading ? (
            <ProductTeaserSkeleton numberElements={4} />
          ) : (
            <>
              {filteredProducts.map((product, key) => {
                if (key >= numberOfNews) {
                  return <></>;
                } else if (isLoading) {
                  return (
                    <>
                      <ProductTeaserSkeleton numberElements={4} />
                      {/* <ProductListTeaser internalId="0" id="0" key={0} showReview={false} /> */}
                    </>
                  );
                } else {
                  return (
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
                      description={product.description}
                      ImageAspectRatio={product.ImageAspectRatio}
                    />
                  );
                }
              })}
            </>
          )}
          {!isLoading && (
            <Box marginBottom={6}>
              <Button
                width={'30%'}
                loadingText=""
                isLoading={false}
                disabled={false}
                size={'lg'}
                colorScheme={'brand'}
                variant={'solid'}
                onClick={onOpen}
              >
                {dictionaryData && dictionaryData['products_comparison_comparebutton']}{' '}
                <AiOutlineRight fontWeight={'bold'} />
              </Button>
            </Box>
          )}
        </div>

        <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color={'BrandedTextColor.100'}>Product Comparison</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table size={'lg'} variant="simple" colorScheme="brand">
                  <Thead>
                    <Tr>
                      <Th></Th>
                      {filteredProducts?.map((element, key) => {
                        return (
                          <Th key={key} borderLeft={'1px'} borderLeftColor={'brand.400'}>
                            <Image
                              borderRadius="lg"
                              src={element.image}
                              alt="some good alt text"
                              height={100}
                              fallback={<Skeleton />}
                            />
                          </Th>
                        );
                      })}
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Heading>
                          {' '}
                          {dictionaryData && dictionaryData['products_comparison_labels_brand']}
                        </Heading>
                        <Text>
                          {dictionaryData && dictionaryData['products_comparison_labels_type']}
                        </Text>
                      </Td>
                      {filteredProducts?.map((element, key) => {
                        return (
                          <Td key={key} borderLeft={'1px'} borderLeftColor={'brand.400'}>
                            <>
                              <Heading>{element?.brand}</Heading>
                              <Text>{element?.name}</Text>
                            </>
                          </Td>
                        );
                      })}
                    </Tr>
                    <Tr>
                      <Td>
                        <Text>
                          {dictionaryData && dictionaryData['products_comparison_labels_price']}
                        </Text>
                      </Td>
                      {filteredProducts?.map((element, key) => {
                        return (
                          <Td key={key} borderLeft={'1px'} borderLeftColor={'brand.400'}>
                            <PriceTag currency="EUR" price={Number(element?.price)} />
                          </Td>
                        );
                      })}
                    </Tr>
                    <Tr>
                      <Td>
                        <Text>
                          {dictionaryData &&
                            dictionaryData['products_comparison_labels_description']}
                        </Text>
                      </Td>
                      {filteredProducts?.map((element, key) => {
                        return (
                          <Td key={key} borderLeft={'1px'} borderLeftColor={'brand.400'}>
                            <>
                              {element?.description?.split('.').map((innerElement, key) => {
                                return innerElement && <Text key={key}>{innerElement}.</Text>;
                              })}
                            </>
                          </Td>
                        );
                      })}
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              {/* <Button variant="ghost">Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return <ProductsOverviewDefaultComponent {...props} />;
};
