import React from 'react';
import {
  NextImage as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Stack, Heading, Button, Box, Text, Flex } from '@chakra-ui/react';
import Image from 'next/image';

interface Fields {
  Title: Field<string>;
  Cta: LinkField;
  Text: Field<string>;
  Image: ImageField;
}

type HeroBannerProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HeroBannerDefaultComponent = (props: HeroBannerProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Hero Banner</span>
    </div>
  </div>
);

export const Default = (props: HeroBannerProps): JSX.Element => {
  return TextRight(props);
};

export const TextLeft = (props: HeroBannerProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`${props.params.styles}`} id={id ? id : undefined}>
        <Box mb={3} bg="gray.800" as="section" minH="140px" position="relative">
          <Box py="32" position="relative" zIndex={1}>
            <Box
              maxW={{ base: 'xl', md: '7xl' }}
              mx="auto"
              px={{ base: '6', md: '8' }}
              color="white"
              height={'300px'}
            >
              <Box
                position={'absolute'}
                top={'20%'}
                left={'8%'}
                height={'60%'}
                width={'46%'}
                backgroundColor={'rgba(255, 255, 255, 0.57)'}
                p={'16'}
                backdropFilter={'blur(10px)'}
                rounded={'7px'}
                opacity={1}
              >
                <Heading as="h1" size="4xl">
                  <JssRichText field={props.fields.Title} />
                </Heading>
                <Text as="div" fontSize={{ md: '2xl' }} mt="4" pt={4}>
                  <JssRichText field={props.fields.Text} />
                </Text>
                <Stack direction={{ base: 'column', md: 'row' }} mt="10" spacing="4">
                  {sitecoreContext.pageEditing ? (
                    <Button
                      colorScheme="brand"
                      px="10"
                      rounded="full"
                      size={{ base: 'xl', sm: 'lg', md: 'xl', lg: 'xl', xl: 'xl' }}
                      fontSize="2xl"
                      py={6}
                      fontWeight="bold"
                    >
                      <JssLink field={props.fields.Cta} />
                    </Button>
                  ) : (
                    <Button
                      colorScheme="brand"
                      px="10"
                      rounded="full"
                      size={{ base: 'xl', sm: 'lg', md: 'xl', lg: 'xl', xl: 'xl' }}
                      fontSize="2xl"
                      py={6}
                      fontWeight="bold"
                    >
                      {props.fields.Cta?.value?.text ?? props.fields.Cta?.value?.title}
                    </Button>
                  )}
                </Stack>
              </Box>
            </Box>
          </Box>
          <Flex
            id="image-wrapper"
            position="absolute"
            insetX="0"
            insetY="0"
            w="full"
            h="full"
            overflow="hidden"
            align="center"
          >
            <Box position="relative" w="full" h="full">
              {sitecoreContext.pageState === 'normal' ? (
                <Image
                  src={props.fields.Image.value?.src ?? ''}
                  alt="Main Image"
                  fill={true}
                  sizes="(max-width: 768px) 30vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ margin: 'auto' }}
                  objectPosition="top bottom"
                />
              ) : (
                // <Img
                //   src={props.fields.Image.value?.src}
                //   alt="Main Image"
                //   w="full"
                //   h="full"
                //   objectFit="cover"
                //   objectPosition="top bottom"
                //   position="absolute"
                // />
                <JssImage field={props.fields.Image} />
              )}

              <Box position="absolute" w="full" h="full" bg="blackAlpha.600" />
            </Box>
          </Flex>
        </Box>
      </div>
    );
  }

  return <HeroBannerDefaultComponent {...props} />;
};

export const TextRight = (props: HeroBannerProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isBoxVisible =
    sitecoreContext.pageEditing ||
    props.fields?.Title.value ||
    props.fields?.Text.value ||
    props.fields?.Cta.value.href;
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`${props.params.styles}`} id={id ? id : undefined}>
        <Box
          mb={3}
          bg="gray.800"
          as="section"
          // minH={{ base: '450px', sm: 450, md: 550, lg: 650, xl: 753, '2xl': 850 }}
          position="relative"
        >
          <Box position="relative" zIndex={1}>
            {isBoxVisible && (
              <Box
                maxW={{ base: 'xl', md: '6xl', sm: '2xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}
                color="white"
                height={{ base: '250px', sm: 250, md: 300 }}
              >
                <Box
                  position={'absolute'}
                  top={{ base: '5%', sm: '5%', md: '10%' }}
                  right={'8%'}
                  // height={{ base: '80%', sm: '80%', md: '75%' }}
                  width={{ base: '70%', sm: '60%', md: '55%' }}
                  backgroundColor={'rgba(255, 255, 255, 0.37)'}
                  p={{ base: '4', md: '6', lg: '8', xl: '8', '2xl': '8' }}
                  backdropFilter={'blur(10px)'}
                  rounded={'7px'}
                  opacity={1}
                >
                  <Heading as="h1" size={{ base: 'lg', sm: 'lg', md: 'xl', lg: 'xl', xl: 'xl' }}>
                    <JssRichText field={props.fields.Title} />
                  </Heading>
                  <Text
                    as="div"
                    fontSize={{ base: 'md', sm: 'md', md: 'lg', lg: 'lg', xl: 'lg' }}
                    mt="4"
                    pt={4}
                    noOfLines={{
                      base: sitecoreContext.pageEditing ? 100 : 2,
                      sm: sitecoreContext.pageEditing ? 100 : 3,
                      md: sitecoreContext.pageEditing ? 100 : 4,
                      lg: sitecoreContext.pageEditing ? 100 : 4,
                      xl: sitecoreContext.pageEditing ? 100 : 6,
                    }}
                  >
                    <JssRichText field={props.fields.Text} />
                  </Text>
                  {sitecoreContext.pageEditing || props.fields.Cta.value.href ? (
                    <Stack direction={{ base: 'column', md: 'row' }} mt="4" spacing="4">
                      {sitecoreContext.pageEditing ? (
                        <Button
                          colorScheme="brand"
                          px="10"
                          rounded="full"
                          size={{ base: 'lg', sm: 'lg', md: 'xl', lg: 'xl', xl: 'xl' }}
                          fontSize="2xl"
                          py={4}
                          fontWeight="bold"
                        >
                          <JssLink field={props.fields.Cta} />
                        </Button>
                      ) : (
                        <Button
                          colorScheme="brand"
                          px="10"
                          rounded="full"
                          size={{ base: 'xs', sm: 'xs', md: 'sm', lg: 'md', xl: 'lg' }}
                          fontSize={{
                            base: '2xl',
                            sm: 'md',
                            md: 'lg',
                            lg: 'lg',
                            xl: 'xl',
                            '2xl': 'xl',
                          }}
                          py={6}
                          fontWeight="bold"
                        >
                          {props.fields.Cta?.value?.text ?? props.fields.Cta?.value?.title}
                        </Button>
                      )}
                    </Stack>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            )}
          </Box>
          <Flex
            id="image-wrapper"
            position="absolute"
            insetX="0"
            insetY="0"
            w="full"
            h="full"
            overflow="hidden"
            align="center"
          >
            <Box position="relative" w="full" h="full">
              {sitecoreContext.pageState === 'normal' ? (
                <Image
                  style={{ objectFit: 'cover' }}
                  src={props?.fields?.Image?.value?.src ?? ''}
                  alt="Main Image"
                  fill={true}
                  sizes="(max-width: 480px) 52vw, (max-width: 768px) 48vw, (max-width: 1280px) 48vs, 58vw"
                  priority={true}
                />
              ) : (
                <JssImage field={props.fields.Image} />
              )}

              <Box position="absolute" w="full" h="full" bg="blackAlpha.600" />
            </Box>
          </Flex>
        </Box>
      </div>
    );
  }

  return <HeroBannerDefaultComponent {...props} />;
};
