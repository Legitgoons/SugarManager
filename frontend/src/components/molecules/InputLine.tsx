import React from 'react';
import styled from 'styled-components/native';
import DefaultInputProps from '@/types/input';
import { rWidth, rHeight } from '@/utils';
import Input from '../atoms/Input';
import Line from '../atoms/Line';

interface InputLineProps<T extends string | number>
  extends DefaultInputProps<T> {}

const InputLineBox = styled.View<{
  width: number | undefined;
  height: number | undefined;
}>`
  display: flex;
  width: ${({ width }) =>
    width && typeof width === 'number' ? `${rWidth(width)}px` : `100%`};
  height: ${({ height }) => rHeight(height || 40)}px;
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
  width,
  height,
  editable = true,
}: InputLineProps<T>) {
  return (
    <InputLineBox width={width} height={height}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        unit={unit}
        maxLength={maxLength}
        keyboardType={keyboardType}
        editable={editable}
        width={width}
        height={height}
      />
      <Line />
    </InputLineBox>
  );
}
