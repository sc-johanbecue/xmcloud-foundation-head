import { AddIcon, MinusIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useDisclosure,
  Text,
  Flex,
  Stack,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { LayoutServicePageState, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
// import { useRouter } from 'next/router';
import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { GetProductList, ProductListOptions } from 'src/services/Ordercloud/ProductsService';
import { UpdateItem } from 'src/services/XMCloud/ItemService';
import { Product, RequiredDeep, ListPageWithFacets, Filters } from 'ordercloud-javascript-sdk';
import { ProductXPs } from 'src/types/ProductXPs';
import { Login } from 'src/services/Ordercloud/AuthenticationService';
import { IsEditingHost } from 'src/services/Head/EnvironmentService';

type PimProductHandlerProps = {
  itemId: string;
  fieldName: string;
  onProductChanged: (value: SetStateAction<string>) => void;
};

export const PimProductHandler = (props: PimProductHandlerProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sitecoreContext } = useSitecoreContext();
  const [externalProducts, setExternalProducts] =
    useState<RequiredDeep<ListPageWithFacets<Product<ProductXPs>>>>();
  const [chosenProduct, setChosenProduct] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({});
  const [checkboxGroupValues, setCheckboxGroupValues] = useState<string[]>();
  const isEditing = IsEditingHost();
  const shouldBeStopped =
    !isEditing ||
    (process?.env?.NEXT_PUBLIC_CUSTOM_PIM_INTEGRATION_ACTIVATED ?? 'false') != 'true' ||
    sitecoreContext.pageState != LayoutServicePageState.Edit;

  useEffect(() => {
    async function GetExternalProducts() {
      const options: ProductListOptions = {
        search: searchQuery,
        // This line is to kick out customer specific data for videos ;-)
        filters: { 'xp.Brand': 'Hahn-Solo' },
      };
      const products = await GetProductList(options).catch(() => {
        return null;
      });
      if (products) {
        setExternalProducts(products);
      }

      setIsLoading(false);
    }

    if (!shouldBeStopped) {
      GetExternalProducts();
    }
  }, []);

  async function onSaveAndClose() {
    setIsLoading(true);
    await UpdateItem(
      props.itemId,
      sitecoreContext?.language ?? '',
      props.fieldName,
      chosenProduct ? chosenProduct : ''
    );
    // router.reload();
    props.onProductChanged(chosenProduct ? chosenProduct : '');
    onClose();
    setIsLoading(false);
  }

  async function onRemoveExternalProduct() {
    setIsLoading(true);
    await UpdateItem(props.itemId, sitecoreContext?.language ?? '', props.fieldName, '');
    props.onProductChanged('');
    setIsLoading(false);
    // router.reload();
  }
  async function onSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    setSearchQuery(e.target.value);
    const valueToStore = e.target.value.length < 3 ? '' : e.target.value;
    const options: ProductListOptions = {
      search: valueToStore,
      // This line is to kick out customer specific data for videos ;-)
      filters: { 'xp.Brand': 'Hahn-Solo' },
    };
    const products = await GetProductList(options);
    setExternalProducts(products);
    setIsLoading(false);
  }

  function onChooseProduct(imageUrl: string) {
    setChosenProduct(imageUrl);
  }

  async function onCheckboxChanged(groupName: string, groupValues: string[]) {
    setIsLoading(true);
    const newFilters: Filters = filters;
    const newCheckboxGroupValue = groupValues.join(',');
    newFilters['xp.' + groupName] = newCheckboxGroupValue;
    // This line is to kick out customer specific data for videos ;-)
    newFilters['xp.Brand'] = 'Hahn-Solo';
    const options: ProductListOptions = {
      search: searchQuery,
      filters: newFilters,
    };
    const products = await GetProductList(options);
    setExternalProducts(products);
    setFilters(newFilters);
    setCheckboxGroupValues(groupValues);
    setIsLoading(false);
  }

  if (shouldBeStopped) {
    return <></>;
  }

  Login(
    process?.env?.NEXT_PUBLIC_OC_ADMIN_USERNAME ?? '',
    process?.env?.NEXT_PUBLIC_OC_ADMIN_PASSWORD ?? '',
    true
  );

  return (
    <Box>
      <Tooltip label="Add an external PIM product">
        <IconButton
          position={'absolute'}
          top={'4%'}
          right={{ base: '20%', sm: '14%', md: '14%' }}
          zIndex={100}
          size={'lg'}
          onClick={onOpen}
          isRound={true}
          variant="solid"
          bgColor="#d7d4ff"
          _hover={{ bgColor: '#877efa' }}
          _dark={{ bgColor: '#5548d9', _hover: { bgColor: '#372b9b' } }}
          aria-label="Add"
          fontSize="10px"
          icon={<AddIcon />}
        />
      </Tooltip>
      <Tooltip label="Remove external DAM image">
        <IconButton
          isLoading={isLoading}
          onClick={onRemoveExternalProduct}
          position={'absolute'}
          zIndex={100}
          top={'4%'}
          right={'6%'}
          isRound={true}
          size={'lg'}
          variant="solid"
          bgColor="#ffcdc3"
          _hover={{ bgColor: '#f65944' }}
          _dark={{ bgColor: '#db251b', _hover: { bgColor: '#930000' } }}
          aria-label="Add"
          fontSize="10px"
          icon={<MinusIcon />}
        />
      </Tooltip>

      {/* <Divider variant={'dashed'} borderColor={'brand.600'} />
      <Heading>Additional Settings</Heading>
      <Button onClick={onOpen} leftIcon={<SmallAddIcon />} colorScheme="teal" variant="solid">
        Add external Image
      </Button> 

      <Button
        ml={2}
        onClick={onRemoveExternalImage}
        leftIcon={<SmallCloseIcon />}
        colorScheme="brand"
        variant="solid"
      >
        Remove external Image
      </Button>
*/}
      <Modal size={'xxl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent zIndex={10000000000}>
          {/* <ModalHeader fontSize={'4xl'}>
            <Center>Choose from PIM </Center>
          </ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Tabs colorScheme="purple">
              <TabList width={'99%'}>
                <Tab width={'25%'} fontSize={'4xl'}>
                  OrderCloud
                </Tab>
                <Tab width={'25%'} fontSize={'4xl'}>
                  Content Hub PCM
                </Tab>
                <Tab width={'25%'} fontSize={'4xl'}>
                  ...
                </Tab>
                <Tab width={'25%'} fontSize={'4xl'}>
                  ...
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box py={6}>
                    <InputGroup size="md">
                      <InputLeftElement pointerEvents="none">
                        <SearchIcon color="brand.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Search for product"
                        onChange={onSearchInputChange}
                        value={searchQuery}
                      />
                    </InputGroup>
                    <Box pt={4}>
                      {externalProducts?.Meta.Facets.map((element, key) => {
                        return (
                          <Box key={key} pt={2}>
                            <Text decoration={'underline'} fontWeight={'bold'}>
                              {element.Name}:
                            </Text>

                            <CheckboxGroup
                              colorScheme="brand"
                              onChange={(e) => onCheckboxChanged(element.Name, e as string[])}
                              value={checkboxGroupValues}
                            >
                              <Stack direction="row">
                                {element.Values.map((innerElement, innerKey) => {
                                  return (
                                    <Checkbox
                                      size={'lg'}
                                      px={2}
                                      key={innerKey + 1}
                                      value={innerElement.Value}
                                    >
                                      {innerElement.Value == 'true'
                                        ? 'Yes'
                                        : innerElement.Value == 'false'
                                        ? 'No'
                                        : innerElement.Value}{' '}
                                      ({innerElement.Count})
                                    </Checkbox>
                                  );
                                })}
                              </Stack>
                            </CheckboxGroup>
                          </Box>
                        );
                      })}
                    </Box>
                    {(externalProducts?.Items?.length ?? 0) == 0 && !isLoading ? (
                      <Box pt={4}>
                        <Center>
                          <Heading size={'4xl'}>No Results...</Heading>
                        </Center>
                      </Box>
                    ) : (
                      <Grid pt={2} templateColumns="repeat(4, 1fr)" gap={6}>
                        {externalProducts?.Items?.map((element, key) => {
                          return (
                            <Skeleton
                              isLoaded={!isLoading}
                              rounded={'15px'}
                              py={6}
                              mt={2}
                              key={key}
                              bgColor={chosenProduct == element.ID ? 'brand.600' : ''}
                              position={'relative'}
                              onClick={() => onChooseProduct(element.ID)}
                              _hover={{ boxShadow: 'dark-lg' }}
                            >
                              <img
                                src={element.xp.Images[0].ThumbnailUrl}
                                alt={element.Name}
                                sizes="100vw"
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                }}
                                width={200}
                                height={100}
                              />
                              <Heading py={6} px={4}>
                                {element.Name}
                              </Heading>
                              <Box>
                                <Text py={6} px={4} noOfLines={3}>
                                  {element.Description}
                                </Text>
                              </Box>
                            </Skeleton>
                          );
                        })}
                      </Grid>
                    )}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <Heading size={'4xl'}>NOT IMPELEMENTED</Heading>
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <Heading size={'4xl'}>NOT IMPELEMENTED</Heading>
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <Heading size={'4xl'}>NOT IMPELEMENTED</Heading>
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <Heading size={'4xl'}>NOT IMPELEMENTED</Heading>
                  </Center>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex alignItems="center" gap="2">
              <Button
                minW={'3rem'}
                height={'3rem'}
                fontSize={'2rem'}
                color={'white'}
                rounded={'full'}
                size={'lg'}
                bgColor="#5548d9"
                _hover={{ bgColor: '#372b9b' }}
                mr={3}
                isLoading={isLoading}
                onClick={onSaveAndClose}
              >
                Save
              </Button>
              <Button
                minW={'3rem'}
                height={'3rem'}
                fontSize={'2rem'}
                color={'white'}
                rounded={'full'}
                size={'lg'}
                bgColor="#db251b"
                _hover={{ bgColor: '#930000' }}
                onClick={onClose}
              >
                Abort
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <Divider variant={'dashed'} borderColor={'brand.600'} /> */}
    </Box>
  );
};

export default PimProductHandler;
