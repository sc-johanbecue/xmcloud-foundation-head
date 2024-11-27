import { extendTheme } from '@chakra-ui/react';

import { config } from '../shared/config';
import { fonts } from './fonts';
import { globalStyles } from './globalStyles';
import { dividerTheme } from '../shared/Divider';
import { headingTheme } from '../shared/Heading';
import { selectTheme } from '../shared/Select';
import { inputTheme } from '../shared/Input';
import { badgeTheme } from '../shared/Badge';
import { spinnerTheme } from '../shared/Spinner';
import { accordionTheme } from '../shared/Accordion';
import { containerTheme } from '../shared/Container';
import { modalTheme } from '../shared/Modal';
import { cardTheme } from '../shared/Card';
import { colors } from './colors';
import { Breadcrumb } from '../shared/Breadcrumb';

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
    Card: cardTheme,
    Modal: modalTheme,
    Breadcrumb: Breadcrumb,
  },
});

export default customTheme;
