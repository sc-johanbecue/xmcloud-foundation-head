import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  cardAnatomy.keys
);

const baseTheme = 'dark';
const dark = '700';
const light = '300';
const borderSize = '3px';

const variants = {
  outline: definePartsStyle(({ colorScheme, colorMode }) => ({
    container: {
      //   borderWidth: '5px',
      //   boxShadow: 'dark-lg',
      borderColor: colorMode == baseTheme ? `${colorScheme}.${dark}` : `${colorScheme}.${light}`,
    },
    body: {
      borderBottom: 'none',
      borderWidth: borderSize,
      //   boxShadow: 'inner',
      borderColor: colorMode == baseTheme ? `${colorScheme}.${dark}` : `${colorScheme}.${light}`,
    },
    footer: {
      borderTop: 'none',
      borderWidth: borderSize,
      //   boxShadow: 'inner',
      borderColor: colorMode == baseTheme ? `${colorScheme}.${dark}` : `${colorScheme}.${light}`,
    },
  })),
  solid: definePartsStyle(({ colorScheme, colorMode }) => ({
    container: {
      bg: colorMode == baseTheme ? `${colorScheme}.${dark}` : `${colorScheme}.${light}`,
      color: 'black',
    },
    body: {
      bg: colorMode == baseTheme ? `${colorScheme}.${dark}` : `${colorScheme}.${light}`,
      borderWidth: borderSize,
      //   boxShadow: 'inner',
      borderColor: colorMode == baseTheme ? `${colorScheme}.${dark}` : `${colorScheme}.${light}`,
    },
    footer: {
      bg: colorMode == baseTheme ? `${colorScheme}.${dark}` : `${colorScheme}.${light}`,
      borderTop: 'none',
      borderWidth: borderSize,
      //   boxShadow: 'inner',
      borderColor: colorMode == baseTheme ? `${colorScheme}.${dark}` : `${colorScheme}.${light}`,
    },
  })),
  none: definePartsStyle(({}) => ({})),
};

export const cardTheme = defineMultiStyleConfig({ variants });
