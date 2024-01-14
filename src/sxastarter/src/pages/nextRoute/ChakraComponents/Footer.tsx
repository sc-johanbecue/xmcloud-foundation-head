import { ReactNode } from 'react';

import { Box, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

const Logo = () => {
  return <Image src="/hahn.png" width={50} height={50} alt="Picture of the author" />;
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoLeft() {
  return (
    <Box
      p={4}
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }} spacing={8}>
        <Stack spacing={6}>
          <Box>
            <Logo />
          </Box>
          <Text fontSize={'sm'}>© 2023 Christian Hahn - christian@hahn-solo.net</Text>
        </Stack>
        <Stack align={'flex-start'}>
          <ListHeader>Product</ListHeader>
          <Box as="a">Overview</Box>
          <Box as="a">Features</Box>
          <Box as="a">Tutorials</Box>
          <Box as="a">Pricing</Box>
          <Box as="a">Releases</Box>
        </Stack>
        <Stack align={'flex-start'}>
          <ListHeader>Company</ListHeader>
          <Box as="a">About</Box>
          <Box as="a">Press</Box>
          <Box as="a">Careers</Box>
          <Box as="a">Contact</Box>
          <Box as="a">Partners</Box>
        </Stack>
        <Stack align={'flex-start'}>
          <ListHeader>Support</ListHeader>
          <Box as="a">Help Center</Box>
          <Box as="a">Terms of Service</Box>
          <Box as="a">Legal</Box>
          <Box as="a">Privacy Policy</Box>
          <Box as="a">Status</Box>
        </Stack>
        <Stack align={'flex-start'}>
          <ListHeader>Follow Us</ListHeader>
          <Box as="a">Facebook</Box>
          <Box as="a">Twitter</Box>
          <Box as="a">Dribbble</Box>
          <Box as="a">Instagram</Box>
          <Box as="a">LinkedIn</Box>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
