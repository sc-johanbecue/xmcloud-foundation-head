import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brandPrimary = defineStyle({
  color: 'BrandedTextColor.900',
  fontWeight: 'bold',
  size: 'xl',

  // let's also provide dark mode alternatives
  _dark: {
    color: 'BrandedTextColor.100',
  },
});

const brandPrimaryInverted = defineStyle({
  color: 'BrandedTextColor.900',
  fontWeight: 'bold',
  size: 'xl',

  // let's also provide dark mode alternatives
  _dark: {
    color: 'BrandedTextColor.100',
  },
});

const accordion = defineStyle({
  size: '3xl',
  mb: 4,
});

export const headingTheme = defineStyleConfig({
  variants: { brandPrimary, accordion, brandPrimaryInverted },
});
