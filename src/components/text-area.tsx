import { Textarea as Text, TextareaProps } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

interface Props extends TextareaProps {}

export function Textarea({ onChange, ...rest }: Props) {
  const [value, setValue] = useState('');

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const input = event.currentTarget;
    const hasOverflow = input.clientHeight < input.scrollHeight;
    if (hasOverflow) {
      input.rows += 1;
    }
    setValue(input.value);
    if (onChange) {
      onChange(event);
    }
  }

  return (
    <Text
      value={value}
      onChange={handleInputChange}
      style={{ height: 'auto' }}
      rows={3}
      resize="none"
      bg="gray.100"
      {...rest}
    />
  );
}
