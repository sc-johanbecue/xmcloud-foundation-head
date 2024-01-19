import React, { useEffect, useState } from 'react';
import { Text as JSSText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComposedMe, GetComposedMe } from 'src/services/Ordercloud/AccountService';
import {
  Center,
  Box,
  Heading,
  Button,
  HStack,
  Icon,
  Square,
  Stack,
  Text,
  VStack,
  FormControl,
  Tag,
  SimpleGrid,
  GridItem,
  Input,
  SkeletonText,
} from '@chakra-ui/react';
import { FiUploadCloud } from 'react-icons/fi';
import { VscFilePdf } from 'react-icons/vsc';
import { useAnimation } from 'framer-motion';
import { useToast } from '@chakra-ui/react';
import useSWR, { useSWRConfig } from 'swr';
import {
  GetAssetsFrom,
  MediaSearchResponse,
  UploadMedia,
} from 'src/services/ContentHub/MediaService';
import { AiOutlineFileImage, AiFillFileWord, AiOutlineQuestionCircle } from 'react-icons/ai';
import { IconType } from 'react-icons';
import { useSession } from 'next-auth/react';
import { BrandedBox } from 'src/shared/_brandedBox';

interface Fields {
  Title: Field<string>;
}

type PersonalAssetsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PersonalAssetsDefaultComponent = (props: PersonalAssetsProps): JSX.Element => (
  <div className={`component personalAssets ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Profile Module</span>
    </div>
  </div>
);

export const Default = (props: PersonalAssetsProps): JSX.Element => {
  const [me, setMe] = useState<ComposedMe>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();
  async function assetFetcher(): Promise<MediaSearchResponse[] | null> {
    return await GetAssetsFrom();
  }
  const { data } = useSWR('Assets', assetFetcher);
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();

  const DataTypeIconMapping: { [id: string]: IconType } = {
    jpg: AiOutlineFileImage,
    pdf: VscFilePdf,
    png: AiOutlineFileImage,
    doc: AiFillFileWord,
    unknown: AiOutlineQuestionCircle,
  };

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

  async function uploadTriggered(event: any) {
    event.preventDefault();
    if (
      event != null &&
      event.target != null &&
      event.target.files != null &&
      event.target.files.length > 0
    ) {
      const file = event.target.files[event.target.files.length - 1];
      const entityId = await UploadMedia(file);
      toast({
        title: 'Uploaded Asset',
        description: 'Uploaded ' + file.name + ' as ' + entityId,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setTimeout(async () => {
        const media = await GetAssetsFrom();
        if (media != null) {
          mutate('Assets');
        }
      }, 1000);
    }
  }

  type MYDocumentProps = {
    name: string;
    size: string;
    icon: JSX.Element;
    type: string;
    url: string;
    chubUrl: string;
  };

  const MyDocument = ({ name, size, icon, type, url, chubUrl }: MYDocumentProps): JSX.Element => {
    return (
      <>
        <Box bg="bg-surface" boxShadow="sm" p={{ base: '1', md: '2' }}>
          <Stack spacing="5">
            <Box p={{ base: '0', md: '4' }}>
              <Stack justify="space-between" direction={{ base: 'column', md: 'row' }} spacing="5">
                <HStack spacing="3">
                  <Square size="10" bg="bg-subtle" borderRadius="lg">
                    {icon}
                  </Square>
                  <Box>
                    <Text fontSize="2xl" color="black" fontWeight="medium">
                      {name}
                      <Tag ml={4} px={1} size={'xl'} variant="solid" colorScheme="brand">
                        {type}
                      </Tag>
                    </Text>
                    <Text fontSize="xl" mt={2} color="muted">
                      {size}
                    </Text>
                  </Box>
                </HStack>
                <Stack spacing="3" direction={{ base: 'column-reverse', md: 'row' }}>
                  <Button as={'a'} href={url} download colorScheme={'brand'}>
                    Download
                  </Button>
                  <Button
                    colorScheme={'brand'}
                    variant="outline"
                    onClick={() => window.open(chubUrl)}
                  >
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

  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();

  if (props.fields) {
    return (
      <div className={`component personalAssets ${props.params.styles}`} id={id ? id : undefined}>
        <BrandedBox>
          {isLoading ? (
            <>
              <SkeletonText
                noOfLines={1}
                spacing="1"
                skeletonHeight="14"
                isLoaded={!isLoading}
                fadeDuration={2}
              />
              <SkeletonText
                mt="4"
                noOfLines={2}
                spacing="4"
                skeletonHeight="10"
                isLoaded={!isLoading}
                fadeDuration={2}
              />
            </>
          ) : (me?.isAnon ?? true) && !session ? (
            <div className="personalAssets-content">
              <Heading size={{ base: 'sm', md: 'lg' }}>
                Please login to see your Personal Assets
              </Heading>
            </div>
          ) : session && !session?.user?.CHubToken ? (
            <div className="personalAssets-content">
              <Heading size={{ base: 'sm', md: 'lg' }}>
                Personal Assets not available with social login
              </Heading>
            </div>
          ) : (
            <>
              <Heading>
                {' '}
                <JSSText as={'h1'} field={props.fields.Title} />
              </Heading>

              <SimpleGrid columns={{ base: 2, sm: 1, md: 2 }}>
                <GridItem>
                  <Box>
                    {data == null ? (
                      <SkeletonText
                        noOfLines={2}
                        spacing="4"
                        skeletonHeight="3"
                        isLoaded={!isLoading}
                        fadeDuration={2}
                      />
                    ) : data?.length == 0 ? (
                      <Heading mt={4}>No Personal Assets Available</Heading>
                    ) : (
                      data?.map((element, key) => {
                        return (
                          <>
                            <MyDocument
                              key={key}
                              icon={
                                <Icon
                                  as={
                                    DataTypeIconMapping[
                                      element?.properties?.FileProperties?.properties?.extension
                                    ] ?? DataTypeIconMapping['unknown']
                                  }
                                  boxSize="10"
                                />
                              }
                              name={element.properties.Title}
                              size={
                                element.properties.FileSize == undefined
                                  ? 'processing ...'
                                  : element.properties.FileSize?.toPrecision(2) + 'MB'
                              }
                              type={element.properties.FileProperties.properties.extension?.toUpperCase()}
                              url={element.renditions.downloadOriginal[0].href}
                              chubUrl={
                                process.env.NEXT_PUBLIC_CONTENTHUB_DAM_URL +
                                '/en-us/asset/' +
                                element.id
                              }
                            />
                          </>
                        );
                      })
                    )}
                  </Box>
                </GridItem>
                <GridItem height={'full'}>
                  <FormControl id="file" height={'full'}>
                    <Center
                      borderWidth="1px"
                      borderRadius="lg"
                      borderStyle={'dashed'}
                      px="6"
                      py="4"
                      bg="white"
                      height={'full'}
                      _hover={{
                        shadow: 'md',
                      }}
                    >
                      <VStack spacing="3">
                        <Square size="10" bg="bg-subtle" borderRadius="lg">
                          <Icon
                            as={FiUploadCloud}
                            boxSize="10"
                            color="var(--chakra-colors-brand-500)"
                          />
                        </Square>
                        <VStack spacing="1">
                          <HStack spacing="1" whiteSpace="nowrap">
                            <Button variant="link" colorScheme="brand" size="xl">
                              Click to upload
                            </Button>
                            <Text fontSize="xl" color="muted">
                              or drag and drop
                            </Text>
                          </HStack>
                          <Text fontSize="xl" color="muted">
                            PNG, JPG or PDF up to 2MB
                          </Text>
                          <Input
                            type="file"
                            height="100%"
                            width="100%"
                            position="absolute"
                            top="0"
                            left="0"
                            opacity="0"
                            aria-hidden="true"
                            accept=".jpg, .jpeg, .png, .pdf, .doc"
                            onDragEnter={startAnimation}
                            onDragLeave={stopAnimation}
                            onChange={uploadTriggered}
                          />
                        </VStack>
                      </VStack>
                    </Center>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </>
          )}
        </BrandedBox>
      </div>
    );
  }

  return <PersonalAssetsDefaultComponent {...props} />;
};
