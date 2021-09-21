import { LegacyRef, useState } from 'react';
import {
  Stack,
  Input,
  Heading,
  InputProps,
  RadioGroup,
} from '@chakra-ui/react';

interface Props extends InputProps {
  label: string;
  name: string;
  value?: any;
  inputRef?: LegacyRef<HTMLInputElement>;
}

export function Field({
  inputRef,
  label,
  name,
  children,
  onChange,
  defaultValue,
  ...rest
}: Props) {
  const [value, setValue] = useState<any>(defaultValue);

  return (
    <Stack value={value} name={name} spacing="0.75rem">
      <Heading fontWeight="500" fontSize="1.25rem" as="label">
        {label}
      </Heading>
      {children ? (
        <RadioGroup
          onChange={(value) => {
            setValue(value);
            const event = { currentTarget: { value } };
            onChange(event as any);
          }}
          value={value}
        >
          <Stack>{children}</Stack>
        </RadioGroup>
      ) : (
        <Input
          isRequired
          ref={inputRef}
          name={name}
          value={value}
          border="none"
          fontSize="sm"
          size="lg"
          bg="gray.100"
          _focus={{
            boxShadow: '0 0 0 2px rgba(0,0,255,0.5)',
          }}
          onChange={(event) => {
            onChange(event);
            setValue(event.currentTarget.value);
          }}
          {...rest}
        />
      )}
    </Stack>
  );
}
