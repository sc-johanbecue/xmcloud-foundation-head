import { useColorModeValue } from '@chakra-ui/react';
import { RenderingParamMapping } from 'src/consts/RenderingParamMapping';

export function ExtractRenderingParams(params: { [key: string]: string }) {
  const color = RenderingParamMapping[params.Color] ?? 'brand';
  const variant = RenderingParamMapping[params.Variant];
  const buttonColor = RenderingParamMapping[params.ButtonColor];
  const buttonVariant = RenderingParamMapping[params.ButtonVariant];
  const textColor = useColorModeValue('BrandedTextColor.900', 'BrandedTextColor.100');
  return { color, variant, buttonColor, buttonVariant, textColor };
}
