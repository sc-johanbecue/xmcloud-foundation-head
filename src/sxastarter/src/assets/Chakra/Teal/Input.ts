import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  selectAnatomy.keys
);

const brandPrimary = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'brand.400',
    borderRadius: 'full',
    color: 'BrandedTextColor.900',
    _dark: {
      color: 'BrandedTextColor.100',
    },
  },
  addon: {
    border: '1px solid',
    borderColor: 'gray.200',
    background: 'gray.200',
    borderRadius: 'full',
    color: 'gray.500',

    _dark: {
      borderColor: 'gray.600',
      background: 'gray.600',
      color: 'gray.400',
    },
  },
  element: {
    color: 'brand.400',
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { brandPrimary },
});
