import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  brand: {
    '50': '#F9EBEB',
    '100': '#EFC7C7',
    '200': '#E5A4A4',
    '300': '#DB8080',
    '400': '#D15C5C',
    '500': '#C73838',
    '600': '#9F2D2D',
    '700': '#772222',
    '800': '#501616',
    '900': '#280B0B',
  },
  primary: {
    '50': '#F9F1EB',
    '100': '#EED8C8',
    '200': '#E3BFA5',
    '300': '#D9A582',
    '400': '#CE8C5F',
    '500': '#C3733C',
    '600': '#9C5C30',
    '700': '#754524',
    '800': '#4E2E18',
    '900': '#27170C',
  },
  secondary: {
    '50': '#EDF1F7',
    '100': '#CED9E9',
    '200': '#AEC0DB',
    '300': '#8EA8CC',
    '400': '#6F8FBE',
    '500': '#4F77B0',
    '600': '#3F5F8D',
    '700': '#2F476A',
    '800': '#202F46',
    '900': '#101823',
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
