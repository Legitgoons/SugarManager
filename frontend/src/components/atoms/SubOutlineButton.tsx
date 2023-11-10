import React from 'react';
import styled from 'styled-components/native';
import { DefaultPressable } from '@/styles';
import DefaultPressableProps from '@/types/pressable';
import { ColorType } from '@/styles/theme';
import { rWidth, rHeight } from '@/utils';

interface SubOutlineButtonProps extends DefaultPressableProps {
  borderColor: keyof ColorType;
  title: string;
}

const SubOutlineButtonWrapper = styled(DefaultPressable)<{
  borderColor: keyof ColorType;
}>`
  width: ${rWidth(120)}px;
  height: ${rHeight(32)}px;
  border-width: 1px;
  border-color: ${({ theme, borderColor }) => theme.colors[borderColor]};
`;

const ButtonTitleWrapper = styled.Text<{ color: keyof ColorType }>`
  ${({ theme }) => theme.typographys.captionb};
  color: ${({ theme, color }) => theme.colors[color]};
`;

export default function SubOutlineButton({
  borderColor,
  title,
  onPress,
}: SubOutlineButtonProps) {
  return (
    <SubOutlineButtonWrapper borderColor={borderColor} onPress={onPress}>
      <ButtonTitleWrapper color={borderColor}>{title}</ButtonTitleWrapper>
    </SubOutlineButtonWrapper>
  );
}
