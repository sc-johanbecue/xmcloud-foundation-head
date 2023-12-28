import { Box, Button, Container, Heading, Stack, Text, Image } from '@chakra-ui/react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import Link from 'next/link';

interface xmcImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface xmcLink {
  href: string;
  text: string;
  linktype: string;
}

export default function ExampleClientsideComponent(props: {
  PromoIcon: xmcImage;
  PromoIcon2: xmcImage;
  PromoText: string;
  PromoText2: string;
  PromoText3: string;
  PromoLink: xmcLink;
  datasources?: FEAAS.DataScopes;
}) {
  return (
    <Box bg="bg.surface">
      <Container py={{ base: '16', md: '24' }}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '12', lg: '16' }}>
          <Stack spacing={{ base: '8', md: '10' }} width="full" justify="center">
            <Stack spacing={{ base: '4', md: '6' }}>
              <Heading size={{ base: 'sm', md: 'lg' }}>
                <p dangerouslySetInnerHTML={{ __html: props?.PromoText }}></p>
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="fg.muted">
                <p dangerouslySetInnerHTML={{ __html: props?.PromoText2 }}></p>
              </Text>
            </Stack>
            <Stack direction={{ base: 'column-reverse', md: 'row' }} spacing="3">
              {/* <Button variant="secondary" size="xl">
                Learn more
              </Button> */}
              <Link href={props?.PromoLink?.href ?? ''}>
                <Button as="a" size="xl">
                  {props?.PromoLink?.text ?? 'DETAILS'}
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Image
            width="full"
            height={{ base: 'auto', md: 'lg' }}
            objectFit="cover"
            src={props?.PromoIcon?.src}
          />
        </Stack>
      </Container>
    </Box>
  );
}
FEAAS.registerComponent(ExampleClientsideComponent, {
  name: 'xmc_promo',
  title: 'XMC Promo',
  description: 'Promo Component',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Content',
  required: [],
  properties: {},
  ui: {},
});
