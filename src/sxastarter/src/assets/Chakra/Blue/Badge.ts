import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brandFilled = defineStyle({
  background: 'brand.400',
  color: 'BrandedTextColor.100',
  fontSize: '1.2rem',
  fontWeight: 'extrabold',
  px: 3.5,
  py: 1,
  rounded: 'full',
});

const brandText = defineStyle({
  color: 'brand.400',
  textTransform: 'uppercase',
  fontWeight: 'extrabold',
  fontSize: 'xl',
  letterSpacing: 1.1,
});

export const badgeTheme = defineStyleConfig({
  variants: { brandFilled, brandText },
});
