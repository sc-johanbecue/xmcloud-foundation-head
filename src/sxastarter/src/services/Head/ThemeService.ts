import tealTheme from '../../assets/Chakra/Teal';
import purpleTheme from '../../assets/Chakra/Purple';
import redTheme from '../../assets/Chakra/Red';
import blueTheme from '../../assets/Chakra/Blue';
import grayTheme from '../../assets/Chakra/Gray';

export function getCurrentTheme(currentThemeString: string) {
  let currenttheme;
  if (currentThemeString === undefined) {
    currenttheme = blueTheme;
  }
  if (currentThemeString === '../assets/Chakra/Purple') {
    currenttheme = purpleTheme;
  }
  if (currentThemeString === '../assets/Chakra/Teal') {
    currenttheme = tealTheme;
  }
  if (currentThemeString === '../assets/Chakra/Red') {
    currenttheme = redTheme;
  }
  if (currentThemeString === '../assets/Chakra/Blue') {
    currenttheme = blueTheme;
  }
  if (currentThemeString === '../assets/Chakra/Gray') {
    currenttheme = grayTheme;
  }

  return currenttheme;
}
