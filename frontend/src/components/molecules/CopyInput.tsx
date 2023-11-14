/* eslint-disable react/jsx-props-no-spreading */
import DefaultInputProps from '@/types/input';
import React from 'react';
import styled from 'styled-components/native';
import CopyIcon from '@/assets/icon/CopyIcon.svg';
import { rHeight, rWidth } from '@/utils';
import Clipboard from '@react-native-clipboard/clipboard';
import Input from '../atoms/Input';

interface CopyInputProps<T extends string | number>
  extends DefaultInputProps<T> {}

const CopyInputBox = styled.View<{
  width: number | undefined;
  height: number | undefined;
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${({ width }) => rWidth(width ? width : 320)}px;
  height: ${({ height }) => rHeight(height ? height : 40)}px;
`;

const IconWrapper = styled.View`
  position: absolute;
  right: ${rWidth(10)}px;
  top: 50%;
  transform: translateY(${rHeight(-10)}px);
`;
export default function CopyInput<T extends string | number>(
  props: CopyInputProps<T>
) {
  const { value, width, height } = props;

  const copyToClipboard = () => {
    if (value !== null && value !== undefined) {
      Clipboard.setString(value.toString());
    } else {
      console.log('복사할 값이 없습니다.');
    }
  };
  console.log(width, height);
  return (
    <CopyInputBox width={width} height={width}>
      <Input {...props} />
      <IconWrapper>
        <CopyIcon
          width={rWidth(20)}
          height={rHeight(20)}
          onPress={copyToClipboard}
        />
      </IconWrapper>
    </CopyInputBox>
  );
}
