import React, { useEffect, useState } from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Avatar,
  Box,
  Circle,
  Icon,
  Tooltip,
  useColorModeValue as mode,
  useColorMode,
} from '@chakra-ui/react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { GetCart } from 'src/services/Ordercloud/CartService';
import useSWR from 'swr';
import { BsMoon, BsSun } from 'react-icons/bs';
import { IsOcActivated } from 'src/services/Head/FeatureStatusService';
import { useSession } from 'next-auth/react';
import { ProfileImageFallback } from 'src/consts/Fallbacks';

interface Fields {
  Title: Field<string>;
}

type HeaderCartIconProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: HeaderCartIconProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { data } = useSWR('Cart', GetCart);
  const [numberOfLineItems, setNumberOfLineItems] = useState<number>(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();

  useEffect(() => {
    let lineItemCount = 0;
    data?.LineItems?.forEach((a) => (lineItemCount += a.Quantity));
    setNumberOfLineItems(lineItemCount);
  }, [data]);

  return (
    <>
      <Box
        className={`component headerCartIcon ${props.params.styles}`}
        id={id ? id : undefined}
        pt={{ base: 7, sm: 3, md: 3, lg: 7, xl: 7 }}
        position={'relative'}
      >
        {IsOcActivated() ?? (
          <>
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
          </>
        )}

        {colorMode === 'dark' ? (
          <Icon
            ml={6}
            width={21}
            height={21}
            as={BsMoon}
            color={mode('BrandedTextColor.900', 'BrandedTextColor.100')}
            onClick={toggleColorMode}
          />
        ) : (
          <Icon
            width={21}
            height={21}
            ml={6}
            as={BsSun}
            color={mode('BrandedTextColor.900', 'BrandedTextColor.100')}
            onClick={toggleColorMode}
          />
        )}
        {session ? (
          <Tooltip label={'Currently Logged in ' + (session?.user?.name ?? '')}>
            <Avatar
              // outline={'.5px solid'}
              // outlineColor={'darkgray'}
              mt={1}
              ml={6}
              width={23}
              height={23}
              name={session?.user?.name ?? ''}
              src={session?.user?.image ?? ProfileImageFallback}
              colorScheme={'secondary'}
            />
          </Tooltip>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};
