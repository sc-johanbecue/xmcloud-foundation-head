import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brandPrimary = defineStyle({
  color: 'BrandedTextColor.900',
  maxW: 'container.xl',

  // let's also provide dark mode alternatives
  _dark: {
    color: 'BrandedTextColor.100',
  },
});

export const containerTheme = defineStyleConfig({
  variants: { brandPrimary },
});
