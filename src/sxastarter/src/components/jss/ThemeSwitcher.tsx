import { Box, Heading, Select } from '@chakra-ui/react';
import React from 'react';
import { useCookies } from 'react-cookie';

type ThemeSwitcherProps = {
  params: { [key: string]: string };
};

export const Default = (props: ThemeSwitcherProps): JSX.Element => {
  const [, setCookie] = useCookies();

  function onThemeChanged(value: string) {
    setCookie('currenttheme', value, { secure: true, path: '/' });
  }

  return (
    <>
      <Box px={6} className={`component ${props.params.styles}`}>
        <Heading variant={'brandPrimary'}>Theme Switcher</Heading>
        <Select
          aria-label="Theme Switcher"
          name={'Theme Switcher'}
          variant={'brandPrimary'}
          onChange={(e) => onThemeChanged(e.target.value)}
        >
          <option label="No Theme" value="No Theme">
            Select a Theme
          </option>
          <option label="Purple" value="../assets/Chakra/Purple">
            Purple
          </option>
          <option label="Teal" value="../assets/Chakra/Teal">
            Teal
          </option>
          <option label="Red" value="../assets/Chakra/Red">
            Red
          </option>
          <option label="Blue" value="../assets/Chakra/Blue">
            Blue
          </option>
          <option label="Gray" value="../assets/Chakra/Gray">
            Gray
          </option>
          <option label="Sitecore" value="../assets/Chakra/Sitecore">
            Sitecore
          </option>
        </Select>
      </Box>
    </>
  );
};
