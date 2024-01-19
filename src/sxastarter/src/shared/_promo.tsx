import { Box, Button, Container, Heading, Link, Stack, Text, Image } from '@chakra-ui/react';
import { MyImage, MyLink } from './types/sharedTypes';

interface PromoProps {
  PromoText?: string;
  PromoText2?: string;
  PromoLink?: MyLink;
  PromoIcon?: MyImage;
}

export const SharedPromo = (props: PromoProps) => {
  return (
    <Box bg="bg.surface">
      <Container py={{ base: '16', md: '24' }}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '12', lg: '16' }}>
          <Stack spacing={{ base: '8', md: '10' }} width="full" justify="center">
            <Stack spacing={{ base: '4', md: '6' }}>
              <Heading size={{ base: 'sm', md: 'lg' }}>
                <p dangerouslySetInnerHTML={{ __html: props?.PromoText ?? '' }}></p>
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="fg.muted">
                <p dangerouslySetInnerHTML={{ __html: props?.PromoText2 ?? '' }}></p>
              </Text>
            </Stack>
            <Stack direction={{ base: 'column-reverse', md: 'row' }} spacing="3">
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
};
