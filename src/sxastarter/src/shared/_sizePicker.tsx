import {
  FormControl,
  FormControlProps,
  FormLabel,
  HStack,
  useRadioGroup,
  UseRadioGroupProps,
} from '@chakra-ui/react';
import { SpecOption } from 'ordercloud-javascript-sdk';
import { SizePickerButton } from './_sizePickerButton';

interface SizePickerProps extends UseRadioGroupProps {
  options: SpecOption[] | undefined;
  rootProps?: FormControlProps;
  hideLabel?: boolean;
  label?: string;
  setChosenValue: (newVal: SpecOption) => void;
}

export const SizePicker = (props: SizePickerProps) => {
  const { options, rootProps, hideLabel, label, setChosenValue, ...rest } = props;
  const { getRadioProps, getRootProps, value } = useRadioGroup(rest);
  const selectedOption = options?.find((option) => option.Value == value);

  return (
    <FormControl {...rootProps}>
      {!hideLabel && (
        <FormLabel fontSize="sm" fontWeight="medium">
          {label ?? `Size: ${selectedOption?.ID}`}
        </FormLabel>
      )}
      <HStack {...getRootProps()}>
        {options?.map((option) => (
          <SizePickerButton
            key={option.Value}
            label={option.ID}
            {...getRadioProps({ value: option.Value })}
            setChosenValue={() => setChosenValue(option)}
          />
        ))}
      </HStack>
    </FormControl>
  );
};
