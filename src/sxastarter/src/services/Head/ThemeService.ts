import tealTheme from '../../assets/Chakra/Teal';
import purpleTheme from '../../assets/Chakra/Purple';
import redTheme from '../../assets/Chakra/Red';
import blueTheme from '../../assets/Chakra/Blue';
import grayTheme from '../../assets/Chakra/Gray';
import sitecoreTheme from '../../assets/Chakra/Sitecore';

export const ThemeMapping: { [key: string]: Record<string, any> } = {
  Blue: blueTheme,
  Red: redTheme,
  Purple: purpleTheme,
  Gray: grayTheme,
  Teal: tealTheme,
  Sitecore: sitecoreTheme,
};

export function getCurrentTheme(currentThemeString: string) {
  let currenttheme;
  if (currentThemeString === undefined) {
    currenttheme = ThemeMapping[process?.env?.NEXT_PUBLIC_CUSTOM_THEME ?? 'Blue'];
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
  if (currentThemeString === '../assets/Chakra/Sitecore') {
    currenttheme = sitecoreTheme;
  }

  return currenttheme;
}
