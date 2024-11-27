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
  icon: {
    color: 'brand.400',
  },
});

export const selectTheme = defineMultiStyleConfig({
  variants: { brandPrimary },
});
