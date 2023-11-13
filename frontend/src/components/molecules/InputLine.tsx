import React from 'react';
import styled from 'styled-components/native';
import DefaultInputProps from '@/types/input';
import { rWidth, rHeight } from '@/utils';
import Input from '../atoms/Input';
import Line from '../atoms/Line';

// maxLength 속성 추가
interface InputLineProps<T extends string | number>
  extends DefaultInputProps<T> {
  maxLength?: number;
}

const InputLineBox = styled.View`
  display: flex;
  width: ${rWidth(320)}px;
  height: ${rHeight(40)}px;
`;

/**
 * @returns {JSX.Element} 밑줄이 있는 InputLineBox Component
 */

export default function InputLine<T extends string | number>({
  placeholder,
  value,
  onChangeText,
  unit,
  maxLength,
  keyboardType,
}: InputLineProps<T>) {
  return (
    <InputLineBox>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        unit={unit}
        maxLength={maxLength} // maxLength 전달
        keyboardType={keyboardType}
      />

      <Line />
    </InputLineBox>
  );
}
