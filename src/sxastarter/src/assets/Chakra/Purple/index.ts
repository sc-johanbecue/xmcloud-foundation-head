import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { config } from './config';
import { fonts } from './fonts';
import { globalStyles } from './globalStyles';
import { dividerTheme } from './Divider';
import { headingTheme } from './Heading';
import { selectTheme } from './Select';
import { inputTheme } from './Input';
import { badgeTheme } from './Badge';
import { spinnerTheme } from './Spinner';
import { accordionTheme } from './Accordion';
import { containerTheme } from './Container';

const styles = globalStyles.styles;

const customTheme = extendTheme({
  fonts,
  colors,
  config,
  styles,
  components: {
    Divider: dividerTheme,
    Heading: headingTheme,
    Select: selectTheme,
    Input: inputTheme,
    Badge: badgeTheme,
    Spinner: spinnerTheme,
    Accordion: accordionTheme,
    Container: containerTheme,
  },
});

export default customTheme;
