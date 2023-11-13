import React from 'react';
import { DefaultPressable } from '@/styles';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';
import { ColorType } from '@/styles/theme';
import { rWidth, rHeight } from '@/utils';

const MainFillButtonBox = styled(DefaultPressable)`
  width: ${rWidth(320)}px;
  height: ${rHeight(48)}px;
`;

const ButtonTitleWrapper = styled.Text`
  ${({ theme }) => theme.typographys.h3b};
  color: ${({ theme }) => theme.colors.white};
`;

interface MainFillButtonProps extends DefaultPressableProps {
  title: string;
  bgColor: keyof ColorType;
  disabled?: boolean;
}

export default function MainFillButton({
  title,
  bgColor,
  onPress,
  disabled = false,
}: MainFillButtonProps) {
  return (
    <MainFillButtonBox bgColor={bgColor} onPress={onPress} disabled={disabled}>
      <ButtonTitleWrapper>{title}</ButtonTitleWrapper>
    </MainFillButtonBox>
  );
}
