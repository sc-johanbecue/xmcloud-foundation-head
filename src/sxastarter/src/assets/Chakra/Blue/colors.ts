import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  brand: {
    100: 'var(--chakra-colors-blue-100)',
    200: 'var(--chakra-colors-blue-200)',
    300: 'var(--chakra-colors-blue-300)',
    400: 'var(--chakra-colors-blue-400)',
    500: 'var(--chakra-colors-blue-500)',
    600: 'var(--chakra-colors-blue-600)',
    700: 'var(--chakra-colors-blue-700)',
    800: 'var(--chakra-colors-blue-800)',
    900: 'var(--chakra-colors-blue-900)',
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
  sitecoreRed: {
    100: '#eb1f1f',
    200: '#ab0000',
  },
  sitecorePurple: {
    50: '#dddaf7',
    100: '#5547d9',
    200: '#333378',
  },
  sitecoreTurquoise: {
    50: '#54bcba',
    100: '#04999a',
    200: '#005e6e',
  },
};

/** override chakra colors here */
const overriddenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overriddenChakraColors,
  ...extendedColors,
};
