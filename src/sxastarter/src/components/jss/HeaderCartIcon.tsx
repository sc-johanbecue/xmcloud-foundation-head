import React, { useEffect, useState } from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { Box, Circle, Icon, useColorModeValue as mode, useColorMode } from '@chakra-ui/react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { GetCart } from 'src/services/Ordercloud/CartService';
import useSWR from 'swr';
import { BsMoon, BsSun } from 'react-icons/bs';

interface Fields {
  Title: Field<string>;
}

type HeaderCartIconProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HeaderCartIconDefaultComponent = (props: HeaderCartIconProps): JSX.Element => (
  <div className={`component cartHeaderIcon ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Cart Header Icon</span>
    </div>
  </div>
);

export const Default = (props: HeaderCartIconProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { data } = useSWR('Cart', GetCart);
  const [numberOfLineItems, setNumberOfLineItems] = useState<number>(0);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    let lineItemCount = 0;
    data?.LineItems?.forEach((a) => (lineItemCount += a.Quantity));
    setNumberOfLineItems(lineItemCount);
  }, [data]);

  return (
    <>
      <Box
        pt={'1rem'}
        className={`component headerCartIcon ${props.params.styles}`}
        id={id ? id : undefined}
        position={'relative'}
      >
        <Icon
          boxSize={10}
          color={mode('BrandedTextColor.900', 'BrandedTextColor.100')}
          as={RiShoppingCartLine}
        />
        <Circle
          fontSize="xs"
          fontWeight="semibold"
          centerContent
          position="absolute"
          top=".5rem"
          left="2.5rem"
          bg={mode('brand.600', 'brand.300')}
          color={mode('BrandedTextColor.100', 'BrandedTextColor.900')}
          size={'7'}
          {...props}
        >
          {numberOfLineItems}
        </Circle>
        {colorMode === 'dark' ? (
          <Icon
            ml={8}
            boxSize={10}
            as={BsMoon}
            color={mode('BrandedTextColor.900', 'BrandedTextColor.100')}
            onClick={toggleColorMode}
          />
        ) : (
          <Icon
            boxSize={10}
            ml={8}
            as={BsSun}
            color={mode('BrandedTextColor.900', 'BrandedTextColor.100')}
            onClick={toggleColorMode}
          />
        )}
      </Box>
    </>
  );

  return <HeaderCartIconDefaultComponent {...props} />;
};
