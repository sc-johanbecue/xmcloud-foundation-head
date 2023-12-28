import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  brand: {
    100: '#E9D8FD',
    200: '#D6BCFA',
    300: '#B794F4',
    400: '#9F7AEA',
    500: '#805AD5',
    600: '#6B46C1',
    700: '#553C9A',
    800: '#44337A',
    900: '#322659',
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
