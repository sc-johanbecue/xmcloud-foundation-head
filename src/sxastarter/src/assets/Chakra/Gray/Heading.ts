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

export const headingTheme = defineStyleConfig({
  variants: { brandPrimary },
});
