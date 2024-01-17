import React, { useEffect, useState } from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComposedMe, GetComposedMe } from 'src/services/Ordercloud/AccountService';
import {
  Spinner,
  Center,
  Box,
  Heading,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  Avatar,
  Flex,
  Tag,
  Input,
  AvatarBadge,
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
  useColorModeValue,
  useDisclosure,
  Wrap,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { FiPhone, FiUser } from 'react-icons/fi';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { useToast } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { MeUser, Me } from 'ordercloud-javascript-sdk';
import { FaEdit } from 'react-icons/fa';
import { GoVerified, GoGlobe, GoCalendar } from 'react-icons/go';
import { useSession } from 'next-auth/react';
import { SetTokensBySession } from 'src/services/Ordercloud/AuthenticationService';
import { BrandedBox } from 'src/shared/_brandedBox';

interface Fields {
  Title: Field<string>;
}

type ProfileUserDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ProfileUserDataDefaultComponent = (props: ProfileUserDataProps): JSX.Element => (
  <div className={`component profileUserData ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Profile User Data Module</span>
    </div>
  </div>
);

export const Default = (props: ProfileUserDataProps): JSX.Element => {
  const [me, setMe] = useState<ComposedMe>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const toast = useToast();
  const avatarColor = useColorModeValue('white', 'gray.700');
  const iconColor = useColorModeValue('blue.500', 'blue.200');
  const profileImageBackgroundColor = useColorModeValue('white', 'gray.700');

  const SaveNotAllowd = !firstName || !lastName || !telephone;
  const profileImageFallback =
    'https://ch-ha-composable-chub.sitecoresandbox.cloud/api/public/content/15d82786f61548729eca2949582780b3?v=dda410c2';

  const { data: session } = useSession();

  useEffect(() => {
    async function GetMe() {
      const tmpMe = await GetComposedMe();
      if (tmpMe && !(tmpMe?.isAnon ?? true)) {
        setMe(tmpMe);
        setFirstName(tmpMe?.Profile?.FirstName ?? '');
        setLastName(tmpMe?.Profile?.LastName ?? '');
        setTelephone(tmpMe?.Profile?.Phone ?? '');
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    GetMe();
    if (session) {
      SetTokensBySession(session);
    }
  }, [session]);

  async function onModalSave() {
    if (SaveNotAllowd) {
      toast({
        title: 'Could not update profile',
        description: 'Please fill out Firstname, Lastname AND Telephone',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      if (me) {
        const newMe: MeUser = {
          FirstName: firstName,
          LastName: lastName,
          Phone: telephone,
        };
        await Me.Patch(newMe);
      }
      const tmpMe = await GetComposedMe();
      if (tmpMe) {
        setMe(tmpMe);
      }

      onClose();
      setIsLoading(false);
      toast({
        title: 'Profile Updated',
        description: 'Profile was successfully updated...',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component profileUserData ${props.params.styles}`} id={id ? id : undefined}>
        <BrandedBox>
          <>
            {isLoading ? (
              <Box bg={profileImageBackgroundColor} p={{ base: '3', md: '3' }}>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '4', md: '10' }}>
                  <SkeletonCircle size={'75'} isLoaded={!isLoading} />
                  <Box width="full">
                    <SkeletonText
                      mt="1"
                      noOfLines={1}
                      spacing="1"
                      skeletonHeight="12"
                      isLoaded={!isLoading}
                      fadeDuration={2}
                    />
                    <SkeletonText
                      noOfLines={7}
                      spacing="4"
                      skeletonHeight="10"
                      isLoaded={!isLoading}
                      fadeDuration={2}
                    />
                  </Box>
                </Stack>
              </Box>
            ) : (me?.isAnon ?? true) && !session ? (
              <div className="profileUserData-content">
                <Heading size={{ base: 'sm', md: 'lg' }}>
                  Please login to see your User Data
                </Heading>
              </div>
            ) : (
              <>
                <Box bg={profileImageBackgroundColor} p={{ base: '3', md: '3' }}>
                  <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: '4', md: '10' }}
                  >
                    <Avatar
                      size="2xl"
                      name={session?.user?.name ?? ''}
                      src={
                        session
                          ? session?.user?.image ?? profileImageFallback
                          : profileImageFallback
                      }
                    >
                      <AvatarBadge
                        borderWidth="4px"
                        borderColor={avatarColor}
                        insetEnd="3"
                        bottom="3"
                        bg={avatarColor}
                      >
                        <Icon as={GoVerified} fontSize="2xl" color={iconColor} />
                      </AvatarBadge>
                    </Avatar>
                    <Box width="full">
                      <Flex justifyContent="space-between" alignItems="center">
                        <Heading
                          size="2xl"
                          fontWeight="extrabold"
                          letterSpacing="tight"
                          marginEnd="6"
                        >
                          {session?.user?.name ??
                            me?.Profile?.FirstName + ' ' + me?.Profile?.LastName}
                        </Heading>
                        {!(me?.isAnon ?? true) ? (
                          <Tooltip label="Edit Profile Data">
                            <Button
                              onClick={onOpen}
                              colorScheme={'brand'}
                              className="profileModule-content-subheadline-editButton"
                            >
                              <FaEdit />
                            </Button>
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                      </Flex>
                      <Text mt="1" fontSize={'3xl'} fontWeight="medium">
                        {session?.user?.Role ?? 'Demo User'}
                      </Text>
                      <Stack spacing="1" mt="2">
                        <HStack fontSize="2xl">
                          <Icon as={GoGlobe} color="gray.500" />
                          <Text>Dublin, Ireland</Text>
                        </HStack>
                        <HStack fontSize="2xl">
                          <Icon as={GoCalendar} color="gray.500" />
                          <Text>June, 1988</Text>
                        </HStack>
                        <HStack fontSize="2xl">
                          <Icon as={AiOutlineMail} color="gray.500" />
                          <Text>{me?.Profile?.Email ?? session?.user?.email}</Text>
                        </HStack>
                        {(me?.Profile?.Phone ?? '') != '' ? (
                          <HStack fontSize="2xl">
                            <Icon as={AiOutlinePhone} color="gray.500" />
                            <Text>{me?.Profile?.Phone}</Text>
                          </HStack>
                        ) : (
                          <></>
                        )}
                      </Stack>

                      <Text fontSize={'4xl'} fontWeight="semibold" mt="8" mb="2">
                        Interests
                      </Text>
                      <Wrap shouldWrapChildren>
                        <Tag fontSize={'2xl'}>Productivity</Tag>
                        <Tag fontSize={'2xl'}>Work</Tag>
                        <Tag fontSize={'2xl'}>Business</Tag>
                        <Tag fontSize={'2xl'}>Woman</Tag>
                      </Wrap>
                    </Box>
                  </Stack>
                </Box>

                <Modal size={'2xl'} isCentered isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader color={'white'}>EDIT PROFILE DATA</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                      {isLoading ? (
                        <Center>
                          <Spinner variant={'brandPrimary'} />
                        </Center>
                      ) : (
                        <>
                          <InputGroup className="profileModule-modal-input" mb={'2'}>
                            <InputLeftElement pointerEvents="none">
                              <FiUser />
                            </InputLeftElement>
                            <Input
                              type="text"
                              placeholder="FIRSTNAME"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                            {firstName ? (
                              <InputRightElement>
                                <CheckIcon color="brand.500" />
                              </InputRightElement>
                            ) : (
                              <></>
                            )}
                          </InputGroup>

                          <InputGroup className="profileModule-modal-input" mb={'2'}>
                            <InputLeftElement pointerEvents="none">
                              <FiUser />
                            </InputLeftElement>
                            <Input
                              type="text"
                              placeholder="LASTNAME"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                            {lastName ? (
                              <InputRightElement>
                                <CheckIcon color="brand.500" />
                              </InputRightElement>
                            ) : (
                              <></>
                            )}
                          </InputGroup>

                          <InputGroup className="profileModule-modal-input">
                            <InputLeftElement pointerEvents="none">
                              <FiPhone />
                            </InputLeftElement>
                            <Input
                              type={'tel'}
                              placeholder="TELEPHONE"
                              value={telephone}
                              onChange={(e) => setTelephone(e.target.value)}
                              required
                            />
                            {telephone ? (
                              <InputRightElement>
                                <CheckIcon color="brand.500" />
                              </InputRightElement>
                            ) : (
                              <></>
                            )}
                          </InputGroup>
                        </>
                      )}
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="brand"
                        mr={3}
                        onClick={onModalSave}
                        disabled={isLoading || SaveNotAllowd}
                      >
                        Change
                      </Button>
                      <Button variant="ghost" disabled={isLoading} onClick={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            )}
            {/* </Skeleton> */}
          </>
        </BrandedBox>
      </div>
    );
  }

  return <ProfileUserDataDefaultComponent {...props} />;
};
