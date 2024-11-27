import {
  Center,
  Flex,
  FormControl,
  FormControlProps,
  FormLabel,
  IconButton,
  IconButtonProps,
  Text,
  UseControllableStateProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface QuantityPickerProps extends UseControllableStateProps<number> {
  max: number;
  min: number;
  rootProps?: FormControlProps;
  setChosenValue: (newVal: number) => void;
  newVal: number;
}

export const QuantityPicker = (props: QuantityPickerProps) => {
  const { min, max, rootProps, setChosenValue, newVal } = props;
  const [value, setValue] = useState<number>(newVal);
  const handleDecrement = () => {
    const newVal = value === min ? value : value - 1;
    setValue(newVal);
    setChosenValue(newVal);
  };
  const handleIncrement = () => {
    const newVal = value === max ? value : value + 1;
    setValue(newVal);
    setChosenValue(newVal);
  };

  return (
    <FormControl {...rootProps}>
      <FormLabel fontSize="sm" fontWeight="medium">
        Quantity
      </FormLabel>
      <Flex borderRadius="base" px="2" py="0.2rem" borderWidth="1px" justifyContent="space-between">
        <QuantityPickerButton
          onClick={handleDecrement}
          icon={<FiMinus />}
          isDisabled={value <= min}
          aria-label="Decrement"
        />
        <Center minW="8">
          <Text as="span" fontWeight="semibold" userSelect="none">
            {value}
          </Text>
        </Center>
        <QuantityPickerButton
          onClick={handleIncrement}
          icon={<FiPlus />}
          isDisabled={value >= max}
          aria-label="Increment"
        />
      </Flex>
    </FormControl>
  );
};

const QuantityPickerButton = (props: IconButtonProps) => (
  <IconButton
    disabled={props.isDisabled}
    size="md"
    fontSize="md"
    colorScheme="brand"
    _focus={{ boxShadow: 'none' }}
    _focusVisible={{ boxShadow: 'outline' }}
    {...props}
  />
);
