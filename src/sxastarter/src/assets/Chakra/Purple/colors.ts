import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  brand: {
    '50': '#F1EFF6',
    '100': '#D7D2E5',
    '200': '#BEB5D4',
    '300': '#A598C3',
    '400': '#8B7BB2',
    '500': '#725EA1',
    '600': '#5B4B81',
    '700': '#443861',
    '800': '#2E2640',
    '900': '#171320',
  },
  primary: {
    '50': '#F7EEF2',
    '100': '#E7CFDC',
    '200': '#D8B1C5',
    '300': '#C992AE',
    '400': '#BA7397',
    '500': '#AA5581',
    '600': '#884467',
    '700': '#66334D',
    '800': '#442233',
    '900': '#22111A',
  },
  secondary: {
    '50': '#EDF2F8',
    '100': '#CBDCEB',
    '200': '#AAC5DF',
    '300': '#89AED2',
    '400': '#6798C6',
    '500': '#4681B9',
    '600': '#386794',
    '700': '#2A4D6F',
    '800': '#1C344A',
    '900': '#0E1A25',
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
