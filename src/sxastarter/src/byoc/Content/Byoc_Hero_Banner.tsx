import * as FEAAS from '@sitecore-feaas/clientside/react';
import React from 'react';
import { MyImage, MyLink } from 'src/shared/types/sharedTypes';
import { Box, Button, Flex, Heading, Img, Stack, Text } from '@chakra-ui/react';
export default function HeroBanner(props: {
  Title: string;
  Text: string;
  Cta: MyLink;
  Image: MyImage;
  DebugInformation?: boolean;
  datasources?: FEAAS.DataScopes;
}) {
  // const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;

  const cleanImageUrl = props.Image.src?.split('?')[0] ?? '';
  return (
    <>
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
              right={'8%'}
              height={'60%'}
              width={'46%'}
              backgroundColor={'rgba(255, 255, 255, 0.57)'}
              p={'16'}
              backdropFilter={'blur(10px)'}
              rounded={'7px'}
              opacity={1}
            >
              <Heading as="h1" size="4xl">
                {props.Title}
              </Heading>
              <Text as="div" fontSize={{ md: '2xl' }} mt="4" pt={4}>
                {props.Text}
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} mt="10" spacing="4">
                <Button
                  as="a"
                  href={props.Cta.href}
                  backgroundColor="rgba(85, 72, 217, 1)"
                  px="10"
                  rounded="full"
                  size={{ base: 'xl', sm: 'lg', md: 'xl', lg: 'xl', xl: 'xl' }}
                  fontSize="2xl"
                  py={6}
                  fontWeight="bold"
                >
                  {props.Cta.text}
                </Button>
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
            <Img
              src={cleanImageUrl}
              alt="Main Image"
              w="full"
              h="full"
              objectFit="cover"
              objectPosition="top bottom"
              position="absolute"
            />

            <Box position="absolute" w="full" h="full" bg="blackAlpha.600" />
          </Box>
        </Flex>
      </Box>
    </>
  );
}
FEAAS.registerComponent(HeroBanner, {
  name: 'Hero Banner',
  title: 'Hero Banner',
  description: 'Hero Banner from XMC',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Content',
  required: [],
  properties: {},
  ui: {},
});
