import React from 'react';
import styled from 'styled-components/native';
import DefaultInputProps from '@/types/input';
import { rWidth, rHeight } from '@/utils/style';

interface InputProps extends DefaultInputProps {}

const InputBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${rWidth(320)}px;
  height: ${rHeight(40)}px;
`;

const InputWrapper = styled.TextInput`
  width: ${rWidth(280)}px;
  height: ${rHeight(40)}px;
`;

const InputUnitWrapper = styled.Text`
  ${({ theme }) => theme.typographys.h3b};
`;

/** Input
 * @returns {JSX.Element} 입력받는 Input Component
 */

export default function Input({
  placeholder,
  value,
  onChangeText,
  unit,
}: InputProps) {
  return (
    <InputBox>
      <InputWrapper
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {unit && <InputUnitWrapper>{unit}</InputUnitWrapper>}
    </InputBox>
  );
}
