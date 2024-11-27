import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brandPrimary = defineStyle({
  color: 'brand.500',
  width: 50,
  height: 50,
  borderWidth: 5,

  // let's also provide dark mode alternatives
  _dark: {
    color: 'brand.300',
  },
});
const xxl = defineStyle({
  height: 100,
  width: 100,
});

export const spinnerTheme = defineStyleConfig({
  variants: { brandPrimary },
  sizes: { xxl },
});
