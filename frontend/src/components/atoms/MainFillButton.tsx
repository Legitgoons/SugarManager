import React from 'react';
import DefaultPressable from '@/styles/pressable';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';

const MainFillButtonWrapper = styled(DefaultPressable)`
  width: 320px;
  height: 48px;
`;

const ButtonTitleWrapper = styled.Text`
  ${({ theme }) => theme.typography.h3b};
  color: ${({ theme }) => theme.colors.white};
`;

interface MainFillButtonProps extends DefaultPressableProps {
  title: string;
  bgColor: string;
}

export default function MainFillButton({
  title,
  bgColor,
  onPress,
}: MainFillButtonProps) {
  return (
    <MainFillButtonWrapper bgColor={bgColor} onPress={onPress}>
      <ButtonTitleWrapper>{title}</ButtonTitleWrapper>
    </MainFillButtonWrapper>
  );
}
