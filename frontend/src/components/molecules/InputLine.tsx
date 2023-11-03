import React from 'react';
import styled from 'styled-components/native';
import InputProps from '@/types/input';
import Input from '../atoms/Input';
import InputUnderLine from '../atoms/InputUnderLine';

interface InputLineProps extends InputProps {}

const InputLineBox = styled.View`
  display: flex;
  width: 200px;
`;

export default function InputLine({
  placeholder,
  value,
  onChangeText,
  unit,
}: InputLineProps) {
  return (
    <InputLineBox>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        unit={unit}
      />
      <InputUnderLine />
    </InputLineBox>
  );
}
