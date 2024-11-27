import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  brand: {
    '50': '#F9EBEB',
    '100': '#EFC7C7',
    '200': '#E5A3A3',
    '300': '#DC7F7F',
    '400': '#D25B5B',
    '500': '#C83737',
    '600': '#A02C2C',
    '700': '#782121',
    '800': '#501616',
    '900': '#280B0B',
  },
  primary: {
    '50': '#EDF8F8',
    '100': '#CCEBEA',
    '200': '#AADEDD',
    '300': '#89D1D0',
    '400': '#68C5C2',
    '500': '#47B8B5',
    '600': '#399391',
    '700': '#2B6E6D',
    '800': '#1C4A48',
    '900': '#0E2524',
  },
  secondary: {
    '50': '#F0ECF8',
    '100': '#D5CAED',
    '200': '#B9A8E1',
    '300': '#9E86D5',
    '400': '#8364C9',
    '500': '#6841BE',
    '600': '#533498',
    '700': '#3E2772',
    '800': '#2A1A4C',
    '900': '#150D26',
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
    100: 'var(--chakra-colors-gray-400)',
    900: 'var(--chakra-colors-gray-600)',
  },
  FooterColor: {
    100: 'var(--chakra-colors-gray-400)',
    900: 'var(--chakra-colors-gray-600)',
  },
};

/** override chakra colors here */
const overriddenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overriddenChakraColors,
  ...extendedColors,
};
