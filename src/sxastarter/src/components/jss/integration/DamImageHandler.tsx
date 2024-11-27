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
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { LayoutServicePageState, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
// import { useRouter } from 'next/router';
import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { Asset, SearchForAssets } from 'src/services/Dam/FrontifyService';
import { IsEditingHost } from 'src/services/Head/EnvironmentService';
import { UpdateItem } from 'src/services/XMCloud/ItemService';

type DamImageHandlerProps = {
  itemId: string;
  fieldName: string;
  onImageChanged: (value: SetStateAction<string>) => void;
};

export const DamImageHandler = (props: DamImageHandlerProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sitecoreContext } = useSitecoreContext();
  const [externalImages, setExternalImages] = useState<Asset[]>();
  const [chosenImage, setChosenImage] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isEditing = IsEditingHost();
  const shouldBeStopped =
    !isEditing ||
    sitecoreContext.pageState != LayoutServicePageState.Edit ||
    (process?.env?.NEXT_PUBLIC_CUSTOM_DAM_INTEGRATION_ACTIVATED ?? 'false') != 'true';

  useEffect(() => {
    async function GetExternalImages() {
      const images = await SearchForAssets(searchQuery);
      setExternalImages(images);
      setIsLoading(false);
    }

    if (!shouldBeStopped) {
      GetExternalImages();
    }
  }, []);

  async function onSaveAndClose() {
    await UpdateItem(
      props.itemId,
      sitecoreContext?.language ?? '',
      props.fieldName,
      chosenImage ? chosenImage : ''
    );
    // router.reload();
    props.onImageChanged(chosenImage ? chosenImage : '');
    onClose();
  }

  async function onRemoveExternalImage() {
    await UpdateItem(props.itemId, sitecoreContext?.language ?? '', props.fieldName, '');
    props.onImageChanged('');
    // router.reload();
  }
  async function onSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    setSearchQuery(e.target.value);
    const valueToStore = e.target.value.length < 3 ? '' : e.target.value;
    const images = await SearchForAssets(valueToStore);
    setExternalImages(images);
    setIsLoading(false);
  }

  function onChooseImage(imageUrl: string) {
    setChosenImage(imageUrl);
  }

  if (shouldBeStopped) {
    return <></>;
  }

  return (
    <Box>
      <Tooltip label="Add an external DAM image">
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
          onClick={onRemoveExternalImage}
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
      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'4xl'}>
            <Center>Choose from DAM </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs colorScheme="brand">
              <TabList>
                <Tab width={'15%'} fontSize={'4xl'}>
                  Frontify
                </Tab>
                <Tab width={'15%'} fontSize={'4xl'}>
                  Bynder
                </Tab>
                <Tab width={'15%'} fontSize={'4xl'}>
                  Canto
                </Tab>
                <Tab width={'15%'} fontSize={'4xl'}>
                  Acquia
                </Tab>
                <Tab width={'15%'} fontSize={'4xl'}>
                  Aprimo
                </Tab>
                <Tab width={'15%'} fontSize={'4xl'}>
                  Cloudinary
                </Tab>
                <Tab width={'15%'} fontSize={'4xl'}>
                  Celum
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
                        placeholder="Search for asset"
                        onChange={onSearchInputChange}
                        value={searchQuery}
                      />
                    </InputGroup>
                    {(externalImages?.length ?? 0) == 0 && !isLoading ? (
                      <Box pt={4}>
                        <Center>
                          <Heading size={'4xl'}>No Results...</Heading>
                        </Center>
                      </Box>
                    ) : (
                      <Grid pt={2} templateColumns="repeat(4, 1fr)" gap={6}>
                        {externalImages?.map((element, key) => {
                          return (
                            <Skeleton
                              isLoaded={!isLoading}
                              rounded={'15px'}
                              py={6}
                              mt={2}
                              key={key}
                              bgColor={chosenImage == element.previewUrl ? 'brand.600' : ''}
                              position={'relative'}
                              onClick={() => onChooseImage(element.previewUrl)}
                              _hover={{ boxShadow: 'dark-lg' }}
                            >
                              <img
                                src={element.previewUrl}
                                alt={element.title}
                                sizes="100vw"
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                }}
                                width={200}
                                height={100}
                              />
                              <Heading py={6} px={4}>
                                {element.title}
                              </Heading>
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
            <Button colorScheme="brand" mr={3} onClick={onSaveAndClose}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Abort
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <Divider variant={'dashed'} borderColor={'brand.600'} /> */}
    </Box>
  );
};
