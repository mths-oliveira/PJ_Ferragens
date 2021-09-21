import {
  Icon as ChakraIcon,
  NumberInput as NumberInputWrapper,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { MdAdd, MdRemove } from 'react-icons/md';

interface IconProps {
  as: IconType;
}

function Icon({ as }: IconProps) {
  return <ChakraIcon as={as} fontSize="sm" transform="translateY(0)" />;
}

interface Props {
  min?: number;
  max?: number;
  initialValue?: number;
  onChange: (value: number) => void;
}

export function NumberInput({ min, max, initialValue, onChange }: Props) {
  function handleChange(value: number) {
    if (!Number.isInteger(value) || value < min) {
      value = min;
    }
    onChange(value);
  }

  return (
    <NumberInputWrapper
      min={min}
      max={max}
      defaultValue={initialValue}
      size="lg"
      onChange={(_, value: number) => {
        handleChange(value);
      }}
    >
      <NumberInputField
        fontWeight="bold"
        fontSize="md"
        border="none"
        _focus={{
          boxShadow: '0 0 0 2px rgba(0, 0, 255, 0.5)',
        }}
      />
      <NumberInputStepper>
        <NumberIncrementStepper children={<Icon as={MdAdd} />} />
        <NumberDecrementStepper children={<Icon as={MdRemove} />} />
      </NumberInputStepper>
    </NumberInputWrapper>
  );
}
