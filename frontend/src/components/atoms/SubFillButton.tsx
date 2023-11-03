import React from 'react';
import styled from 'styled-components/native';
import DefaultPressable from '@/styles/Pressable';
import DefaultPressableProps from '@/types/pressable';
import { ColorType } from '@/styles/theme';
import { rWidth, rHeight } from '@/utils/style';

interface SubFillButtonProps extends DefaultPressableProps {
  bgColor: keyof ColorType;
  title: string;
}

const SubFillButtonWrapper = styled(DefaultPressable)`
  width: ${rWidth(120)}px;
  height: ${rHeight(32)}px;
`;
const ButtonTitleWrapper = styled.Text`
  ${({ theme }) => theme.typography.captionb};
  color: ${({ theme }) => theme.colors.white};
`;
export default function SubFillButton({
  bgColor,
  title,
  onPress,
}: SubFillButtonProps) {
  return (
    <SubFillButtonWrapper bgColor={bgColor} onPress={onPress}>
      <ButtonTitleWrapper>{title}</ButtonTitleWrapper>
    </SubFillButtonWrapper>
  );
}
