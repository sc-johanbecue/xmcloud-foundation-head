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

const solid = defineStyle(({ colorMode }) => ({
  borderWidth: 'medium',
  borderStyle: 'solid',
  borderColor: colorMode == 'light' ? 'gray.200' : 'gray.600',
}));
const outline = defineStyle(({ colorMode }) => ({
  borderWidth: 'medium',
  borderStyle: 'solid',
  borderColor: colorMode == 'light' ? 'gray.600' : 'gray.200',
}));
const none = defineStyle(({ colorMode }) => ({
  borderWidth: 'medium',
  borderStyle: 'solid',
  borderColor: colorMode == 'light' ? 'black' : 'white',
}));

export const dividerTheme = defineStyleConfig({
  variants: { brandPrimary, solid, outline, none },
});
