import React from 'react';
import DefaultPressable from '@/styles/Pressable';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';
import { ColorType } from '@/styles/theme';
import { rWidth, rHeight } from '@/utils/style';

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
}

export default function MainFillButton({
  title,
  bgColor,
  onPress,
}: MainFillButtonProps) {
  return (
    <MainFillButtonBox bgColor={bgColor} onPress={onPress}>
      <ButtonTitleWrapper>{title}</ButtonTitleWrapper>
    </MainFillButtonBox>
  );
}
