import React, { ChangeEvent, useEffect, useState } from 'react';
import { Text as JSSText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComposedMe, GetComposedMe } from 'src/services/Ordercloud/AccountService';
import {
  Spinner,
  Center,
  Box,
  Heading,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
  Flex,
  SkeletonText,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { BuyerAddress, Me } from 'ordercloud-javascript-sdk';
import { FaPlus, FaMinus, FaEdit, FaRegAddressCard } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { SetTokensBySession } from 'src/services/Ordercloud/AuthenticationService';
import { BrandedBox } from 'src/shared/_brandedBox';

interface Fields {
  Title: Field<string>;
}

type ProfileAddressesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ProfileAddressesDefaultComponent = (props: ProfileAddressesProps): JSX.Element => (
  <div className={`component profileAddresses ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Profile Addresses Module</span>
    </div>
  </div>
);

export const Default = (props: ProfileAddressesProps): JSX.Element => {
  const [me, setMe] = useState<ComposedMe>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    isOpen: isAddAddressOpen,
    onOpen: onAddAddressOpen,
    onClose: onAddAddressClose,
  } = useDisclosure();
  const {
    isOpen: isEditAddressOpen,
    onOpen: onEditAddressOpen,
    onClose: onEditAddressClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteAddressOpen,
    onOpen: onDeleteAddressOpen,
    onClose: onDeleteAddressClose,
  } = useDisclosure();
  const [activeAddress, setActiveAddress] = useState<BuyerAddress>();
  const toast = useToast();
  const { data: session } = useSession();

  const [formValues, setFormValues] = useState({
    AddressName: '',
    Street: '',
    PostalCode: '',
    City: '',
    Country: '',
    FirstName: '',
    LastName: '',
    IsShipping: true,
    IsBilling: true,
  });

  useEffect(() => {
    async function GetMe() {
      const tmpMe = await GetComposedMe();
      if (tmpMe && !(tmpMe?.isAnon ?? true)) {
        setMe(tmpMe);
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    GetMe();
    if (session) {
      SetTokensBySession(session);
    }
  }, [session]);

  const handleInputChange = (fieldKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((v) => ({ ...v, [fieldKey]: e.target.value }));
  };

  const AddAddressNotAllowed =
    !formValues['AddressName'] ||
    !formValues['FirstName'] ||
    !formValues['LastName'] ||
    !formValues['PostalCode'] ||
    !formValues['Street'] ||
    !formValues['Country'] ||
    !formValues['City'];

  function EmptyFormStates() {
    formValues['AddressName'] = '';
    formValues['FirstName'] = '';
    formValues['LastName'] = '';
    formValues['Street'] = '';
    formValues['City'] = '';
    formValues['PostalCode'] = '';
    formValues['Country'] = '';
  }

  async function onAddAddressSave() {
    setIsLoading(true);
    const address: BuyerAddress<any> = {
      AddressName: formValues['AddressName'],
      Billing: formValues['IsBilling'],
      Shipping: formValues['IsShipping'],
      City: formValues['City'],
      Country: formValues['Country'],
      FirstName: formValues['FirstName'],
      LastName: formValues['LastName'],
      Street1: formValues['Street'],
      Zip: formValues['PostalCode'],
    };
    const response = await Me.CreateAddress(address).catch((error) => {
      if (error.isOrderCloudError) {
        // the request was made and the API responded with a status code
        // that falls outside of the range of 2xx, the error will be of type OrderCloudError
        // https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/orderclouderror
        console.log(JSON.stringify(error.errors, null, 4));
        toast({
          title: 'No Address saved',
          description: (
            <Box>
              <Text pb={2}>Following error(s) occured: </Text>
              <br />
              <Text pb={2}>{error.errors.Errors[0].Message}</Text>
            </Box>
          ),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    });

    if (response) {
      toast({
        title: 'New Address added',
        description: 'Successfully added ' + formValues['AddressName'],
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      const tmpMe = await GetComposedMe();
      if (!(tmpMe?.isAnon ?? true)) {
        setMe(tmpMe);
      }

      EmptyFormStates();
      setIsLoading(false);
      onAddAddressClose();
    }
  }

  async function onEditAddressSave() {
    if (!activeAddress || !activeAddress?.ID) {
      toast({
        title: 'No Address chosen',
        description: (
          <Box>
            <Text pb={2}>Please first choose one address to edit it </Text>
          </Box>
        ),
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      const address: BuyerAddress<any> = {
        AddressName: formValues['AddressName'],
        Billing: formValues['IsBilling'],
        Shipping: formValues['IsShipping'],
        City: formValues['City'],
        Country: formValues['Country'],
        FirstName: formValues['FirstName'],
        LastName: formValues['LastName'],
        Street1: formValues['Street'],
        Zip: formValues['PostalCode'],
      };

      await Me.PatchAddress(activeAddress?.ID, address).catch((error) => {
        if (error.isOrderCloudError) {
          // the request was made and the API responded with a status code
          // that falls outside of the range of 2xx, the error will be of type OrderCloudError
          // https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/orderclouderror
          console.log(JSON.stringify(error.errors, null, 4));
          toast({
            title: 'No Address saved',
            description: (
              <Box>
                <Text pb={2}>Following error(s) occured: </Text>
                <br />
                <Text pb={2}>{error.errors.Errors[0].Message}</Text>
              </Box>
            ),
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }
      });

      toast({
        title: 'Address edited',
        description: 'Successfully edited ' + formValues['AddressName'],
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      const tmpMe = await GetComposedMe();
      if (!(tmpMe?.isAnon ?? true)) {
        setMe(tmpMe);
      }

      EmptyFormStates();
      setActiveAddress(undefined);
      setIsLoading(false);
      onEditAddressClose();
    }
  }

  async function onDeleteAddressSave() {
    if (!activeAddress || !activeAddress?.ID) {
      toast({
        title: 'No Address chosen',
        description: (
          <Box>
            <Text pb={2}>Please first choose one address to edit it </Text>
          </Box>
        ),
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    } else {
      setIsLoading(true);

      const response = await Me.DeleteAddress(activeAddress?.ID)
        .then(() => {
          return true;
        })
        .catch((error) => {
          if (error.isOrderCloudError) {
            // the request was made and the API responded with a status code
            // that falls outside of the range of 2xx, the error will be of type OrderCloudError
            // https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/orderclouderror
            console.log(JSON.stringify(error.errors, null, 4));
            toast({
              title: 'No Address deleted',
              description: (
                <Box>
                  <Text pb={2}>Following error(s) occured: </Text>
                  <br />
                  <Text pb={2}>{error.errors.Errors[0].Message}</Text>
                </Box>
              ),
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
            setIsLoading(false);
          }
          return false;
        });

      if (!response) {
        return;
      }

      toast({
        title: 'Address deleted',
        description: 'Successfully deleted ' + activeAddress.AddressName,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      const tmpMe = await GetComposedMe();
      if (!(tmpMe?.isAnon ?? true)) {
        setMe(tmpMe);
      }

      setActiveAddress(undefined);
      setIsLoading(false);
      onDeleteAddressClose();
    }
  }

  function onEditAddressClicked() {
    if (!activeAddress || !activeAddress.AddressName) {
      toast({
        title: 'No Address chosen',
        description: (
          <Box>
            <Text pb={2}>Please first choose one address to edit it </Text>
          </Box>
        ),
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    formValues['AddressName'] = activeAddress?.AddressName ?? '';
    formValues['FirstName'] = activeAddress?.FirstName ?? '';
    formValues['LastName'] = activeAddress?.LastName ?? '';
    formValues['Street'] = activeAddress?.Street1 ?? '';
    formValues['City'] = activeAddress?.City ?? '';
    formValues['PostalCode'] = activeAddress?.Zip ?? '';
    formValues['Country'] = activeAddress?.Country ?? '';
    onEditAddressOpen();
  }

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component profileAddresses ${props.params.styles}`} id={id ? id : undefined}>
        <BrandedBox>
          {isLoading ? (
            <>
              <SkeletonText
                noOfLines={1}
                spacing={1}
                mb={4}
                skeletonHeight="14"
                isLoaded={!isLoading}
                fadeDuration={2}
              />
              <div className="profileModule-content-addresses">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-4 col-md-12 col-lg-6 space-bottom-s">
                      <SkeletonText
                        noOfLines={1}
                        skeletonHeight="60"
                        isLoaded={!isLoading}
                        fadeDuration={2}
                      />
                    </div>
                    <div className="col-xl-4 col-md-12 col-lg-6 space-bottom-s">
                      <SkeletonText
                        noOfLines={1}
                        skeletonHeight="60"
                        isLoaded={!isLoading}
                        fadeDuration={2}
                      />
                    </div>
                    <div className="col-xl-4 col-md-12 col-lg-6 space-bottom-s">
                      <SkeletonText
                        noOfLines={1}
                        skeletonHeight="60"
                        isLoaded={!isLoading}
                        fadeDuration={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (me?.isAnon ?? true) && !session ? (
            <div className="profileAddresses-content">
              <Heading size={{ base: 'sm', md: 'lg' }}>Please login to see your Addresses</Heading>
            </div>
          ) : session && !session?.user?.OCToken ? (
            <div className="profileModule-content">
              <Heading size={{ base: 'sm', md: 'lg' }}>
                Addresses not available with social login
              </Heading>
            </div>
          ) : (
            <>
              <Box width="full">
                <Flex justifyContent="space-between" alignItems="center">
                  <Heading>
                    <JSSText as={'h1'} field={props.fields.Title} />
                  </Heading>
                  <Flex justifyContent="flex-end" alignItems="center">
                    <Tooltip label="Add new address">
                      <Button
                        onClick={() => {
                          EmptyFormStates();
                          onAddAddressOpen();
                        }}
                        colorScheme={'brand'}
                        mr={'.5em'}
                      >
                        <FaPlus />
                      </Button>
                    </Tooltip>
                    <Tooltip label="Remove existing address">
                      <Button
                        onClick={onDeleteAddressOpen}
                        disabled={!activeAddress}
                        colorScheme={'brand'}
                        mr={'.5em'}
                      >
                        <FaMinus />
                      </Button>
                    </Tooltip>
                    <Tooltip label="Edit existing address">
                      <Button
                        onClick={onEditAddressClicked}
                        colorScheme={'brand'}
                        disabled={!activeAddress}
                      >
                        <FaEdit />
                      </Button>
                    </Tooltip>
                  </Flex>
                </Flex>
              </Box>
              <div className="profileModule-content-addresses">
                <div className="container">
                  <div className="row">
                    {me?.Addresses?.map((element, key) => {
                      return (
                        <div key={key} className="col-xl-4 col-md-12 col-lg-6 space-bottom-s">
                          <Box
                            mt={'2'}
                            width={'90%'}
                            className="profileModule-content-addresses-address"
                            as="button"
                            borderRadius="xl"
                            bg="white"
                            color="black"
                            border={'3px solid var(--chakra-colors-brand-500)'}
                            _hover={{
                              bg: 'brand.500',
                              cursor: 'pointer',
                              color: 'BrandedTextColor.100',
                            }}
                            onClick={() =>
                              setActiveAddress(
                                element.AddressName != activeAddress?.AddressName
                                  ? element
                                  : undefined
                              )
                            }
                            boxShadow={
                              activeAddress?.AddressName == element?.AddressName
                                ? '0px 0px 10px 2px var(--chakra-colors-brand-800) inset'
                                : ''
                            }
                          >
                            <div>
                              <Text fontWeight={'bold'} mb={2}>
                                {element?.AddressName}
                              </Text>
                              <p>
                                {element?.FirstName} {element?.LastName}
                              </p>
                              <p>{element?.Street1}</p>
                              <p>
                                {element?.Zip} {element?.City}
                              </p>
                              <p>{element?.Country}</p>
                            </div>
                          </Box>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Modal size={'2xl'} isCentered isOpen={isAddAddressOpen} onClose={onAddAddressClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader color={'white'}>Add Address</ModalHeader>
                  <ModalCloseButton color={'white'} />
                  <ModalBody>
                    {isLoading ? (
                      <Center>
                        <Spinner variant={'brandPrimary'} />
                      </Center>
                    ) : (
                      <div className="container">
                        <div className="row">
                          <div className="col-12">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <InputLeftElement pointerEvents="none">
                                <FaRegAddressCard />
                              </InputLeftElement>
                              <Input
                                type="text"
                                placeholder="SOME MEANINGFUL NAME"
                                value={formValues['AddressName']}
                                onChange={handleInputChange('AddressName')}
                              />
                              {formValues['AddressName'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <Text fontWeight={'bold'} fontSize={'md'} mb={'2'}>
                              Name:
                            </Text>
                          </div>
                          <div className="col-4">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="Christian"
                                value={formValues['FirstName']}
                                onChange={handleInputChange('FirstName')}
                              />
                              {formValues['FirstName'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="Hahn"
                                value={formValues['LastName']}
                                onChange={handleInputChange('LastName')}
                              />
                              {formValues['LastName'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <Text fontWeight={'bold'} fontSize={'md'} mb={'2'}>
                              Street:
                            </Text>
                          </div>
                          <div className="col-8">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="Main Street 1"
                                value={formValues['Street']}
                                onChange={handleInputChange('Street')}
                              />
                              {formValues['Street'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <Text fontWeight={'bold'} fontSize={'md'} mb={'2'}>
                              Postcal Code & City
                            </Text>
                          </div>
                          <div className="col-4">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="47443"
                                value={formValues['PostalCode']}
                                onChange={handleInputChange('PostalCode')}
                              />
                              {formValues['PostalCode'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="Moers"
                                value={formValues['City']}
                                onChange={handleInputChange('City')}
                              />
                              {formValues['City'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <Text fontWeight={'bold'} fontSize={'md'} mb={'2'}>
                              Country:
                            </Text>
                          </div>
                          <div className="col-8">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="DE"
                                value={formValues['Country']}
                                onChange={handleInputChange('Country')}
                              />
                              {formValues['Country'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                        </div>
                      </div>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="brand"
                      mr={3}
                      onClick={onAddAddressSave}
                      disabled={isLoading || AddAddressNotAllowed}
                    >
                      Add
                    </Button>
                    <Button variant="ghost" disabled={isLoading} onClick={onAddAddressClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Modal
                size={'2xl'}
                isCentered
                isOpen={isEditAddressOpen}
                onClose={onEditAddressClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader color={'white'}>Edit Address</ModalHeader>
                  <ModalCloseButton color={'white'} />
                  <ModalBody>
                    {isLoading ? (
                      <Center>
                        <Spinner variant={'brandPrimary'} />
                      </Center>
                    ) : (
                      <div className="container">
                        <div className="row">
                          <div className="col-12">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <InputLeftElement pointerEvents="none">
                                <FaRegAddressCard />
                              </InputLeftElement>
                              <Input
                                type="text"
                                placeholder="SOME MEANINGFUL NAME"
                                value={formValues['AddressName']}
                                onChange={handleInputChange('AddressName')}
                              />
                              {formValues['AddressName'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <Text fontWeight={'bold'} fontSize={'md'} mb={'2'}>
                              Name:
                            </Text>
                          </div>
                          <div className="col-4">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="Christian"
                                value={formValues['FirstName']}
                                onChange={handleInputChange('FirstName')}
                              />
                              {formValues['FirstName'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="Hahn"
                                value={formValues['LastName']}
                                onChange={handleInputChange('LastName')}
                              />
                              {formValues['LastName'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <Text fontWeight={'bold'} fontSize={'md'} mb={'2'}>
                              Street:
                            </Text>
                          </div>
                          <div className="col-8">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="Main Street 1"
                                value={formValues['Street']}
                                onChange={handleInputChange('Street')}
                              />
                              {formValues['Street'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <Text fontWeight={'bold'} fontSize={'md'}>
                              Postcal Code & City
                            </Text>
                          </div>
                          <div className="col-4">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="47443"
                                value={formValues['PostalCode']}
                                onChange={handleInputChange('PostalCode')}
                              />
                              {formValues['PostalCode'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="Moers"
                                value={formValues['City']}
                                onChange={handleInputChange('City')}
                              />
                              {formValues['City'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                          <div className="col-4">
                            <Text fontWeight={'bold'} fontSize={'md'} mb={'2'}>
                              Country:
                            </Text>
                          </div>
                          <div className="col-8">
                            <InputGroup className="profileModule-modal-input" mb={'2'}>
                              <Input
                                type="text"
                                placeholder="DE"
                                value={formValues['Country']}
                                onChange={handleInputChange('Country')}
                              />
                              {formValues['Country'] ? (
                                <InputRightElement>
                                  <CheckIcon color="brand.500" />
                                </InputRightElement>
                              ) : (
                                <></>
                              )}
                            </InputGroup>
                          </div>
                        </div>
                      </div>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="brand"
                      mr={3}
                      onClick={onEditAddressSave}
                      disabled={isLoading || AddAddressNotAllowed}
                    >
                      SAVE
                    </Button>
                    <Button variant="ghost" disabled={isLoading} onClick={onEditAddressClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Modal
                size={'2xl'}
                isCentered
                isOpen={isDeleteAddressOpen}
                onClose={onDeleteAddressClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader color={'white'}>Delete Address</ModalHeader>
                  <ModalCloseButton color={'white'} />
                  <ModalBody>
                    {isLoading ? (
                      <Center>
                        <Spinner variant={'brandPrimary'} />
                      </Center>
                    ) : (
                      <div className="container">
                        Are you sure you want to delete the following Address?
                        <br />
                        <br />
                        <Center>
                          <Text fontWeight={'bold'}>{activeAddress?.AddressName} </Text>
                        </Center>
                      </div>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="brand"
                      mr={3}
                      onClick={onDeleteAddressSave}
                      disabled={isLoading}
                    >
                      DELETE
                    </Button>
                    <Button variant="ghost" disabled={isLoading} onClick={onDeleteAddressClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
        </BrandedBox>
      </div>
    );
  }

  return <ProfileAddressesDefaultComponent {...props} />;
};
