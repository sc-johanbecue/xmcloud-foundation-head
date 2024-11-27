import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  brand: {
    '50': '#EDF7F7',
    '100': '#CDE9E9',
    '200': '#ADDBDA',
    '300': '#8DCDCC',
    '400': '#6DBFBE',
    '500': '#4DB2AF',
    '600': '#3E8E8C',
    '700': '#2E6B69',
    '800': '#1F4746',
    '900': '#0F2423',
  },
  primary: {
    '50': '#ECF2F8',
    '100': '#CBDCEC',
    '200': '#A9C5E0',
    '300': '#87AFD4',
    '400': '#6598C7',
    '500': '#4482BB',
    '600': '#366896',
    '700': '#294E70',
    '800': '#1B344B',
    '900': '#0E1A25',
  },
  secondary: {
    '50': '#EFF6F2',
    '100': '#D2E5DA',
    '200': '#B5D4C3',
    '300': '#98C3AC',
    '400': '#7BB294',
    '500': '#5EA17D',
    '600': '#4B8164',
    '700': '#38614B',
    '800': '#254132',
    '900': '#132019',
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
