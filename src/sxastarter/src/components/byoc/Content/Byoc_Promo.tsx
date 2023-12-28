import { Box, Button, Container, Heading, Stack, Text, Image } from '@chakra-ui/react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import Link from 'next/link';

interface button {
  text: string;
  link: string;
}
export default function ExampleClientsideComponent(props: {
  title: string;
  text?: string;
  image?: string;
  cta?: button;
  datasources?: FEAAS.DataScopes;
}) {
  return (
    <Box bg="bg.surface">
      <Container py={{ base: '16', md: '24' }}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '12', lg: '16' }}>
          <Stack spacing={{ base: '8', md: '10' }} width="full" justify="center">
            <Stack spacing={{ base: '4', md: '6' }}>
              <Heading size={{ base: 'sm', md: 'lg' }}>{props.title}</Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="fg.muted">
                {props.text}
              </Text>
            </Stack>
            <Stack direction={{ base: 'column-reverse', md: 'row' }} spacing="3">
              {/* <Button variant="secondary" size="xl">
                Learn more
              </Button> */}
              <Link href={props.cta?.link ?? ''}>
                <Button as="a" size="xl">
                  {props.cta?.text}
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Image
            width="full"
            height={{ base: 'auto', md: 'lg' }}
            objectFit="cover"
            src={props.image}
          />
        </Stack>
      </Container>
    </Box>
  );
}
FEAAS.registerComponent(ExampleClientsideComponent, {
  name: 'promo',
  title: 'Promo',
  description: 'Promo Component',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Content',
  required: [],
  properties: {
    title: { type: 'string', title: 'Title' },
    text: { type: 'string', title: 'Description' },
    image: { type: 'string', title: 'Image' },
    cta: { type: 'object', title: 'CTA' },
  },
  ui: {
    title: {
      'ui:autofocus': true,
      'ui:emptyValue': '',
      'ui:placeholder': 'Write some title',
    },
  },
});
