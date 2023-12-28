import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brandPrimary = defineStyle({
  borderWidth: '3px',
  borderStyle: 'solid',
  borderColor: 'brand.500',

  // let's also provide dark mode alternatives
  _dark: {
    borderColor: 'brand.300',
  },
});

export const dividerTheme = defineStyleConfig({
  variants: { brandPrimary },
});
