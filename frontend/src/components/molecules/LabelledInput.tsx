/* eslint-disable react/jsx-props-no-spreading */
import { DefaultText } from '@/styles';
import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import DefaultInputProps from '@/types/input';
import Input from '../atoms/Input';
import InputLine from './InputLine';
import Dropdown, { DropdownProps as IDropdownProps } from './Dropdown';
import CopyInput from './CopyInput';

const LabelledInputBox = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: row;
`;
const LabelTextWrapper = styled(DefaultText)``;

interface LabelledInputProps {
  label: string;
  inputType: 'input' | 'inputLine' | 'copyInput' | 'dropdown';
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
          case 'dropdown':
            if (DropdownProps) {
              return <Dropdown {...DropdownProps} />;
            }
            return <Text>Error</Text>;
          case 'copyInput':
            if (inputProps) {
              return <CopyInput {...inputProps} />;
            }
            return <Text>Error</Text>;
          default:
            return <Text>Error</Text>;
        }
      })()}
    </LabelledInputBox>
  );
}
