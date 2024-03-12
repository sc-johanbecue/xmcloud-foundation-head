import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Heading, Img, Box, Text, Flex } from '@chakra-ui/react';

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
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`${props.params.styles}`}
        id={id ? id : undefined}
        style={{ padding: '0px', margin: '0px' }}
      >
        <Box mb={3} bg="gray.800" as="section" minH="140px" position="relative">
          <Box py="32" position="relative" zIndex={1}>
            <Box
              maxW={{ base: 'xl', md: '7xl' }}
              mx="auto"
              px={{ base: '6', md: '8' }}
              color="white"
            >
              <Box maxW="xl">
                <Heading as="h1" size="3xl" fontWeight="extrabold">
                  <JssRichText field={props.fields.Title} />
                </Heading>
                <Text as="div" fontSize={{ md: '2xl' }} mt="4" maxW="lg">
                  <JssRichText field={props.fields.Text} />
                </Text>
                <JssLink field={props.fields.Cta}></JssLink>
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
                <Img
                  src={props.fields.Image.value?.src}
                  alt="Main Image"
                  w="full"
                  h="full"
                  objectFit="cover"
                  objectPosition="top bottom"
                  position="absolute"
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
