import React from 'react';
import styled from 'styled-components/native';
import InputProps from '@/types/input';

const InputBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 40px;
`;

const InputWrapper = styled.TextInput`
  width: 160px;
  height: 40px;
  color: black;
`;

const InputUnitWrapper = styled.Text``;

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
      <InputUnitWrapper>{unit}</InputUnitWrapper>
    </InputBox>
  );
}
