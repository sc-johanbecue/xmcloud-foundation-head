import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const xxlDialog = defineStyle({
  maxHeight: '600px',
  maxWidth: '1200px',
  overflowY: 'auto',
});

const xxlClose = defineStyle({
  fontSize: '1.5rem',
});

const sizes = {
  xxl: definePartsStyle({
    dialog: xxlDialog,
    closeButton: xxlClose,
  }),
};

export const modalTheme = defineMultiStyleConfig({
  sizes,
});
