import React from 'react';
import styled from 'styled-components/native';
import theme from '@/styles/theme';
import SubOutlineButton from '../atoms/SubOutlineButton';
import SubFillButton from '../atoms/SubFillButton';

interface TwinButtonGroupWrapper {
  onLeftPress: () => void;
  onRightPress: () => void;
  leftTitle: string;
  rightTitle: string;
}

const TwinButtonGroupBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 320px;
`;

export default function TwinButtonGroup({
  onLeftPress,
  onRightPress,
  leftTitle,
  rightTitle,
}: TwinButtonGroupWrapper) {
  return (
    <TwinButtonGroupBox>
      <SubOutlineButton
        onPress={onLeftPress}
        title={leftTitle}
        borderColor={theme.colors.b4}
      />
      <SubFillButton
        onPress={onRightPress}
        title={rightTitle}
        bgColor={theme.colors.b4}
      />
    </TwinButtonGroupBox>
  );
}
