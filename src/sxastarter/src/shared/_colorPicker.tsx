import {
  FormControl,
  FormControlProps,
  FormLabel,
  HStack,
  useRadioGroup,
  UseRadioGroupProps,
} from '@chakra-ui/react';
import { SpecOption } from 'ordercloud-javascript-sdk';
import { ColorPickerOption } from './_colorPickerOption';

interface ColorPickerProps extends UseRadioGroupProps {
  options: SpecOption[] | undefined;
  rootProps?: FormControlProps;
  hideLabel?: boolean;
  label?: string;
  setChosenValue: (newVal: SpecOption) => void;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { options, rootProps, hideLabel, label, setChosenValue, ...rest } = props;
  const { getRadioProps, getRootProps, value } = useRadioGroup(rest);
  const selectedOption = options?.find((option) => option.Value == value);
  return (
    <FormControl {...rootProps}>
      {!hideLabel && (
        <FormLabel fontSize="sm" fontWeight="medium">
          {label ?? `Color: ${selectedOption?.ID ?? '-'}`}
        </FormLabel>
      )}
      <HStack {...getRootProps()}>
        {options?.map((option) => (
          <ColorPickerOption
            key={option.ID}
            color={option.Value ?? ''}
            {...getRadioProps({ value: option.Value })}
            setChosenValue={() => setChosenValue(option)}
          />
        ))}
      </HStack>
    </FormControl>
  );
};
