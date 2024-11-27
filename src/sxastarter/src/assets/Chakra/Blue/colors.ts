import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
/** Use this kind of color generator to customize https://themera.vercel.app/ */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  brand: {
    '50': '#EDF3F7',
    '100': '#CDDCEA',
    '200': '#ADC6DC',
    '300': '#8CAFCF',
    '400': '#6C99C1',
    '500': '#4C83B3',
    '600': '#3D688F',
    '700': '#2D4E6C',
    '800': '#1E3448',
    '900': '#0F1A24',
  },
  primary: {
    '50': '#EBF7FA',
    '100': '#C6E9F0',
    '200': '#A2DCE7',
    '300': '#7DCEDD',
    '400': '#59C0D4',
    '500': '#34B2CB',
    '600': '#2A8FA2',
    '700': '#1F6B7A',
    '800': '#154751',
    '900': '#0A2429',
  },
  secondary: {
    '50': '#F0EDF8',
    '100': '#D5CCEA',
    '200': '#BAACDD',
    '300': '#9F8BD0',
    '400': '#856BC2',
    '500': '#6A4AB5',
    '600': '#553B91',
    '700': '#3F2C6D',
    '800': '#2A1E48',
    '900': '#150F24',
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
