import React from 'react';
import styled from 'styled-components/native';
import DefaultInputProps from '@/types/input';
import { rWidth, rHeight } from '@/utils/style';
import Input from '../atoms/Input';
import Line from '../atoms/Line';

interface InputLineProps extends DefaultInputProps {}

const InputLineBox = styled.View`
  display: flex;
  width: ${rWidth(320)}px;
  height: ${rHeight(40)}px;
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
      <Line />
    </InputLineBox>
  );
}
