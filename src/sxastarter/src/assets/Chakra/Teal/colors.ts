import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  brand: {
    100: 'var(--chakra-colors-teal-100)',
    200: 'var(--chakra-colors-teal-200)',
    300: 'var(--chakra-colors-teal-300)',
    400: 'var(--chakra-colors-teal-400)',
    500: 'var(--chakra-colors-teal-500)',
    600: 'var(--chakra-colors-teal-600)',
    700: 'var(--chakra-colors-teal-700)',
    800: 'var(--chakra-colors-teal-800)',
    900: 'var(--chakra-colors-teal-900)',
  },
  BrandedTextColor: {
    100: 'white',
    900: 'black',
  },
  HeaderColor: {
    100: 'var(--chakra-colors-brand-300)',
    900: 'var(--chakra-colors-brand-700)',
  },
  FooterColor: {
    100: 'var(--chakra-colors-brand-300)',
    900: 'var(--chakra-colors-brand-700)',
  },
};

/** override chakra colors here */
const overriddenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overriddenChakraColors,
  ...extendedColors,
};
