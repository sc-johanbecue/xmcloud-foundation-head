import { Box } from '@chakra-ui/react';

export const BrandedBox = ({ children }: any): JSX.Element => {
  return (
    <Box
      bg="white"
      border={'3px solid var(--chakra-colors-brand-500)'}
      boxShadow={'1px 1px 7px var(--chakra-colors-brand-500)'}
      pb={3}
      pr={4}
      pl={4}
      pt={3}
      mb={3}
      mt={3}
      borderRadius={6}
      height={'99%'}
    >
      {children}
    </Box>
  );
};
