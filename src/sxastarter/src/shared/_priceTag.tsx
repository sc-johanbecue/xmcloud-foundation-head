import { HStack, StackProps, Text, TextProps } from '@chakra-ui/react';
import * as React from 'react';

interface PriceTagProps {
  currency: string | undefined;
  price: number | undefined;
  salePrice?: number;
  rootProps?: StackProps;
  priceProps?: TextProps;
  salePriceProps?: TextProps;
}

export type FormatPriceOptions = { locale?: string; currency?: string };

export function formatPrice(value: number, opts: { locale?: string; currency?: string } = {}) {
  const { locale = 'en-US', currency = 'USD' } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export const PriceTag = (props: PriceTagProps) => {
  const { price, currency, salePrice, rootProps, priceProps, salePriceProps } = props;
  return (
    <HStack spacing="3" {...rootProps}>
      {salePrice != (price ?? salePrice) && !Number.isNaN(salePrice) && price != 0 && (
        <Price isOnSale={!!salePrice} textProps={salePriceProps}>
          {price && formatPrice(price, { currency })}
        </Price>
      )}

      {salePrice && !Number.isNaN(salePrice) && (
        <SalePrice {...priceProps}>{formatPrice(salePrice, { currency })}</SalePrice>
      )}
    </HStack>
  );
};

interface PriceProps {
  children?: React.ReactNode;
  isOnSale?: boolean;
  textProps?: TextProps;
}

const Price = (props: PriceProps) => {
  const { isOnSale, children, textProps } = props;
  return (
    <Text fontWeight="medium" textDecoration={isOnSale ? 'line-through' : 'none'} {...textProps}>
      {children}
    </Text>
  );
};

const SalePrice = (props: TextProps) => <Text fontWeight="semibold" {...props} />;
