import React from 'react';
import styled from 'styled-components/native';
import DefaultInputProps from '@/types/input';
import { rWidth, rHeight } from '@/utils/style';

interface InputProps<T extends string | number> extends DefaultInputProps<T> {}

const InputBox = styled.View<{
  width: number | undefined;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${({ width }) => rWidth(width || 320)}px;
  height: ${rHeight(40)}px;
`;

const InputWrapper = styled.TextInput<{ height: number | undefined }>`
  flex: 1;
  height: ${({ height }) => rHeight(height || 40)}px;
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
  editable = true,
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
    <InputBox pointerEvents={!editable ? 'none' : undefined} width={width}>
      <InputWrapper
        placeholder={placeholder}
        value={value.toString()}
        onChangeText={handleChange}
        maxLength={maxLength}
        keyboardType={keyboardType || 'default'}
        editable={editable}
        height={height}
      />
      {unit && <InputUnitWrapper>{unit}</InputUnitWrapper>}
    </InputBox>
  );
}
