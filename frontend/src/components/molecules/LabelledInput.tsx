/* eslint-disable react/jsx-props-no-spreading */
import { DefaultText } from '@/styles';
import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import DefaultInputProps from '@/types/input';
import Input from '../atoms/Input';
import InputLine from './InputLine';
import Dropdown, { DropdownProps as IDropdownProps } from './Dropdown';

const LabelledInputBox = styled.View`
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const LabelTextWrapper = styled(DefaultText)``;

interface LabelledInputProps {
  label: string;
  inputType: 'input' | 'inputLine' | 'Dropdown';
  DropdownProps?: IDropdownProps;
  inputProps?: DefaultInputProps<any>;
}
export default function LabelledInput({
  label,
  inputType,
  inputProps,
  DropdownProps,
}: LabelledInputProps) {
  return (
    <LabelledInputBox>
      <LabelTextWrapper typography="h4b" color="black">
        {label}
      </LabelTextWrapper>
      {(() => {
        switch (inputType) {
          case 'input':
            if (inputProps) {
              return <Input {...inputProps} />;
            }
            return <Text>Error</Text>;
          case 'inputLine':
            if (inputProps) {
              return <InputLine {...inputProps} />;
            }
            return <Text>Error</Text>;
          case 'Dropdown':
            if (DropdownProps) {
              return <Dropdown {...DropdownProps} />;
            }
            return <Text>Error</Text>;
          default:
            return <Text>Error</Text>;
        }
      })()}
    </LabelledInputBox>
  );
}
