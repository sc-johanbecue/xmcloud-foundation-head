import { breadcrumbAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  breadcrumbAnatomy.keys
);

export const baseStyle = definePartsStyle(() => {
  return {
    container: {},
    item: {},
    link: {},
    separator: {},
  };
});
export const Breadcrumb = defineMultiStyleConfig({ baseStyle });
