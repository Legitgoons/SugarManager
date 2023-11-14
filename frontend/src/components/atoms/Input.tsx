import React from 'react';
import styled from 'styled-components/native';
import DefaultInputProps from '@/types/input';
import { rWidth, rHeight } from '@/utils/style';

interface InputProps<T extends string | number> extends DefaultInputProps<T> {}

const InputBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${rWidth(320)}px;
  height: ${rHeight(40)}px;
`;

const InputWrapper = styled.TextInput<{
  width: number | undefined;
  height: number | undefined;
}>`
  width: ${({ width }) => rWidth(width ? width : 320)}px;
  height: ${({ height }) => rHeight(height ? height : 40)}px;
`;

const InputUnitWrapper = styled.Text`
  ${({ theme }) => theme.typographys.h3b};
`;

/** Input
 * @returns {JSX.Element} 입력받는 Input Component
 */

export default function Input<T extends string | number>({
  placeholder,
  value,
  onChangeText,
  unit,
  maxLength,
  keyboardType,
  editable,
  width,
  height,
}: InputProps<T>) {
  const handleChange = (text: string) => {
    if (!onChangeText) return;
    if (typeof value === 'number') {
      const numericValue = text === '' ? 0 : Number(text);
      onChangeText(numericValue as T);
    } else {
      onChangeText(text as T);
    }
  };
  return (
    <InputBox pointerEvents={!editable ? 'none' : undefined}>
      <InputWrapper
        placeholder={placeholder}
        value={value.toString()}
        onChangeText={handleChange}
        maxLength={maxLength}
        keyboardType={keyboardType || 'default'}
        editable={editable}
        width={width}
        height={height}
      />
      {unit && <InputUnitWrapper>{unit}</InputUnitWrapper>}
    </InputBox>
  );
}
