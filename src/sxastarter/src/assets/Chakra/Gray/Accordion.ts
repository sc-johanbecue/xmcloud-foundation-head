import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  accordionAnatomy.keys
);

const brandPrimary = definePartsStyle({
  panel: {
    background: 'gray.200',
    borderRadius: '5px',

    // Let's also provide dark mode alternatives
    _dark: {
      background: 'gray.700',
    },
  },
  icon: {
    borderColor: 'brand.200',
    background: 'brand.200',
    color: 'brand.800',
    rounded: 'full',

    _dark: {
      borderColor: 'brand.700',
      background: 'brand.700',
      color: 'brand.200',
    },
  },
  button: {
    bg: 'brand.700',
    rounded: 'lg',
    color: 'BrandedTextColor.100',
    _hover: { bg: 'brand.600', color: 'BrandedTextColor.900' },
    _expanded: { bg: 'brand.500', color: 'BrandedTextColor.900' },
    _dark: {
      color: 'BrandedTextColor.900',
      bg: 'brand.400',
      _hover: { bg: 'brand.500', color: 'BrandedTextColor.100' },
      _expanded: { bg: 'brand.600', color: 'BrandedTextColor.100' },
    },
  },
});

export const accordionTheme = defineMultiStyleConfig({
  variants: { brandPrimary },
});
