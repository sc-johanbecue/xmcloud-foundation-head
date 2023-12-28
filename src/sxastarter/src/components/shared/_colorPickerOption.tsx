import {
  chakra,
  Circle,
  Icon,
  useColorModeValue,
  useRadio,
  UseRadioProps,
  useTheme,
  VisuallyHidden,
} from '@chakra-ui/react';
import { isDark } from '@chakra-ui/theme-tools';
import { FiCheck } from 'react-icons/fi';

interface ColorPickerOptionProps extends UseRadioProps {
  color: string;
  setChosenValue: () => void;
}

export const ColorPickerOption = (props: ColorPickerOptionProps) => {
  const { color, value, setChosenValue } = props;
  const { getInputProps, htmlProps, getCheckboxProps, getLabelProps, state } = useRadio(props);
  const theme = useTheme();

  return (
    <chakra.label cursor="pointer" {...htmlProps}>
      <chakra.input {...getInputProps()} />
      <Circle
        size="10"
        borderWidth="1px"
        onClick={() => setChosenValue()}
        _checked={{
          borderWidth: '2px',
          borderColor: useColorModeValue('brand.500', 'brand.200'),
        }}
        {...getCheckboxProps()}
      >
        <Circle size="8" bg={color}>
          {state.isChecked && (
            <Icon as={FiCheck} color={isDark(color)(theme) ? 'white' : 'gray.900'} />
          )}
        </Circle>
      </Circle>
      <VisuallyHidden {...getLabelProps()}>{value} color selected</VisuallyHidden>
    </chakra.label>
  );
};
