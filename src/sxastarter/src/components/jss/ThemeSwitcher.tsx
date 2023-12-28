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
          variant={'brandPrimary'}
          onChange={(e) => onThemeChanged(e.target.value)}
          placeholder="Select a Theme"
        >
          <option value="../assets/Chakra/Purple">Purple</option>
          <option value="../assets/Chakra/Teal">Teal</option>
          <option value="../assets/Chakra/Red">Red</option>
          <option value="../assets/Chakra/Blue">Blue</option>
          <option value="../assets/Chakra/Gray">Gray</option>
        </Select>
      </Box>
    </>
  );
};
