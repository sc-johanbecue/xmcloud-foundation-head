import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  brand: {
    100: 'var(--chakra-colors-gray-100)',
    200: 'var(--chakra-colors-gray-200)',
    300: 'var(--chakra-colors-gray-300)',
    400: 'var(--chakra-colors-gray-400)',
    500: 'var(--chakra-colors-gray-500)',
    600: 'var(--chakra-colors-gray-600)',
    700: 'var(--chakra-colors-gray-700)',
    800: 'var(--chakra-colors-gray-800)',
    900: 'var(--chakra-colors-gray-900)',
  },
  primary: {
    '50': '#F3F2F2',
    '100': '#DDDBDA',
    '200': '#C6C3C2',
    '300': '#B0ACAA',
    '400': '#9A9493',
    '500': '#847D7B',
    '600': '#6A6462',
    '700': '#4F4B4A',
    '800': '#353231',
    '900': '#1A1919',
  },
  secondary: {
    '50': '#F2F2F2',
    '100': '#DBDBDB',
    '200': '#C4C4C4',
    '300': '#ADADAD',
    '400': '#969696',
    '500': '#808080',
    '600': '#666666',
    '700': '#4D4D4D',
    '800': '#333333',
    '900': '#1A1A1A',
  },
  monochromLight: {
    '50': '#F2F2F2',
    '100': '#DCDBDB',
    '200': '#C5C3C3',
    '300': '#AFACAC',
    '400': '#989595',
    '500': '#827D7D',
    '600': '#686464',
    '700': '#4E4B4B',
    '800': '#343232',
    '900': '#1A1919',
  },
  monochromDark: {
    '50': '#ffffff',
    '100': '#ffffff',
    '200': '#ffffff',
    '300': '#ffffff',
    '400': '#ffffff',
    '500': '#000000',
    '600': '#000000',
    '700': '#000000',
    '800': '#000000',
    '900': '#000000',
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
