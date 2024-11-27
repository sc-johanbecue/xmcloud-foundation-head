import React, { useEffect, useState } from 'react';
import { Text as JSSText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComposedMe, GetComposedMe } from 'src/services/Ordercloud/AccountService';
import {
  Spinner,
  Center,
  Box,
  Heading,
  Button,
  HStack,
  Icon,
  Square,
  Stack,
  Text,
  Avatar,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { FiFileText } from 'react-icons/fi';
import { GiVideoConference } from 'react-icons/gi';
import { HiBadgeCheck } from 'react-icons/hi';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

interface Fields {
  Title: Field<string>;
}

type ProfileProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ProfileDefaultComponent = (props: ProfileProps): JSX.Element => (
  <div className={`component loginModule ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Profile Module</span>
    </div>
  </div>
);

export const Default = (props: ProfileProps): JSX.Element => {
  const [me, setMe] = useState<ComposedMe>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  }, []);

  type DownloadItemProps = {
    name: string;
    size: string;
    url: string;
    showDownload: boolean;
    icon: JSX.Element;
  };

  const DownloadItem = ({
    name,
    size,
    url,
    showDownload,
    icon,
  }: DownloadItemProps): JSX.Element => {
    return (
      <>
        <Box bg="bg-surface" boxShadow="sm" borderRadius="lg" p={{ base: '1', md: '2' }}>
          <Stack spacing="5">
            <Box
              borderWidth={{ base: '0', md: '1px' }}
              p={{ base: '0', md: '4' }}
              borderRadius="lg"
            >
              <Stack justify="space-between" direction={{ base: 'column', md: 'row' }} spacing="5">
                <HStack spacing="3">
                  <Square size="10" bg="bg-subtle" borderRadius="lg">
                    {icon}
                  </Square>
                  <Box fontSize="xl">
                    <Text color="black" fontWeight="medium">
                      {name}
                    </Text>
                    <Text mt={2} color="muted">
                      {size}
                    </Text>
                  </Box>
                </HStack>
                <Stack spacing="3" direction={{ base: 'column-reverse', md: 'row' }}>
                  {showDownload && (
                    <Button as={'a'} href={url} download colorScheme={'brand'}>
                      Download
                    </Button>
                  )}

                  <Button colorScheme={'brand'} variant="outline" onClick={() => window.open(url)}>
                    View
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </>
    );
  };

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component profileModule ${props.params.styles}`} id={id ? id : undefined}>
        {isLoading ? (
          <div className="space-s">
            <Center>
              <Spinner variant={'brandPrimary'} />
            </Center>
            <Center>
              <div>
                <Text pt={2} fontWeight={'bold'}>
                  Loading...
                </Text>
              </div>
            </Center>
          </div>
        ) : me?.isAnon ?? true ? (
          <div className="profileModule-content">
            <Heading size={{ base: 'sm', md: 'lg' }}>Please login to see your Profile Data</Heading>
          </div>
        ) : (
          <div className="profileModule-content">
            <div className="profileModule-content-headline">
              <Center>
                <JSSText as={'h1'} field={props.fields.Title} />
              </Center>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Box
                  bg="white"
                  border={'3px solid var(--chakra-colors-brand-500)'}
                  boxShadow={'1px 1px 7px var(--chakra-colors-brand-500)'}
                  pb={2}
                  pr={4}
                  pl={4}
                  pt={2}
                  mb={2}
                  mt={2}
                  borderRadius={6}
                  height={'full'}
                >
                  <Heading>Our recommendation for you</Heading>

                  <Heading pt={4} fontSize={'2xl'}>
                    Documents
                  </Heading>
                  <DownloadItem
                    icon={<Icon as={FiFileText} boxSize="5" />}
                    showDownload={false}
                    name={'The future of financial services is in machine learning'}
                    size={'1.2MB'}
                    url={
                      'https://www.walkersglobal.com/images/Publications/Articles/2017/03.21.2017_MFinTech_MachineLearning.pdf'
                    }
                  />

                  <DownloadItem
                    icon={<Icon as={FiFileText} boxSize="5" />}
                    showDownload={false}
                    name={
                      'Learning from Mistakes: Imposing Constructive Trusts over Mistaken Payments'
                    }
                    size={'1.8MB'}
                    url={
                      'https://www.walkersglobal.com/images/Learning_from_Mistakes_Imposing_Constructive_Trusts_over_Mistaken_Payments_ICR20-1-8.pdf'
                    }
                  />

                  <Heading pt={4} fontSize={'2xl'}>
                    Conferences
                  </Heading>
                  <DownloadItem
                    icon={<Icon as={GiVideoConference} boxSize="5" />}
                    showDownload={false}
                    name={'Channel Islands Employment Law Conference'}
                    size={' '}
                    url={
                      'https://www.walkersglobal.com/index.php/events/3140-channel-islands-employment-law-conference'
                    }
                  />
                </Box>
              </div>
              <div className="col-md-4">
                <Box
                  bg="white"
                  border={'3px solid var(--chakra-colors-brand-500)'}
                  boxShadow={'1px 1px 7px var(--chakra-colors-brand-500)'}
                  pb={2}
                  pr={4}
                  pl={4}
                  pt={2}
                  mb={2}
                  borderRadius={6}
                  height={'full'}
                >
                  <Heading>Your representative</Heading>

                  <Flex
                    direction="column"
                    alignItems="center"
                    rounded="md"
                    padding="8"
                    position="relative"
                    bg={'white'}
                    shadow={{ md: 'base' }}
                    mt={4}
                  >
                    <Box
                      position="absolute"
                      inset="0"
                      height="20"
                      bg="var(--chakra-colors-brand-500)"
                      roundedTop="inherit"
                    />
                    <Avatar
                      size="2xl"
                      src="https://www.walkersglobal.com/images/professional/Large/WWIP336-3072447-Headshots-Large-Colour-Jason-Allison-275-x-220px.jpg"
                    />
                    <VStack mb={4} mt="3" spacing="1" flex="1">
                      <HStack>
                        <Text fontSize={'5xl'} fontWeight="bold">
                          Jason Allison
                        </Text>
                        <Icon as={HiBadgeCheck} color="blue.300" verticalAlign="text-bottom" />
                      </HStack>
                      <Text
                        fontSize="3xl"
                        fontWeight={'medium'}
                        textAlign="center"
                        noOfLines={2}
                        color={'gray.600'}
                      >
                        Partner - Cayman Islands
                      </Text>
                      <HStack spacing="1" fontSize="xl" color={'gray.600'} my={2}>
                        <Icon as={AiOutlineMail} />
                        <Text>ason.allison@walkersglobal.com</Text>
                      </HStack>
                      <HStack spacing="1" fontSize="xl" color={'gray.600'} mb={10}>
                        <Icon as={AiOutlinePhone} />
                        <Text>+1 345 914 6358</Text>
                      </HStack>
                      <Text pt={4} fontSize={'xl'} px={1} textAlign={'justify'}>
                        Practice Areas Jason Allison is a partner in Walkers&apos; Global Investment
                        Funds Group. He advises on Cayman Islands corporate and investment funds
                        law, with particular expertise advising institutional investment managers...
                      </Text>
                    </VStack>
                    <Button
                      as={'a'}
                      href={
                        'https://www.linkedin.com/in/jasonallison70?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAACDyJwBPR7qCgZ7XbmIadXX4usxErOPUc8&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B%2BhM7tEdGQ8%2https://www.linkedin.com/in/jasonallison70?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAACDyJwBPR7qCgZ7XbmIadXX4usxErOPUc8&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B%2BhM7tEdGQ8%2BM8%2BqsP0tAUg%3D%3DM8%2BqsP0tAUg%3D%3D'
                      }
                      target={'_blank'}
                      variant="outline"
                      colorScheme="brand"
                      rounded="full"
                      size="xl"
                      width="full"
                      p={4}
                    >
                      View Profile
                    </Button>
                  </Flex>
                </Box>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <ProfileDefaultComponent {...props} />;
};
