import React from 'react';
import styled from 'styled-components/native';
import { DefaultPressable } from '@/styles';
import DefaultPressableProps from '@/types/pressable';
import { ColorType } from '@/styles/theme';
import { rWidth, rHeight } from '@/utils';

interface SubFillButtonProps extends DefaultPressableProps {
  bgColor: keyof ColorType;
  title: string;
  size?: 'lg' | 'sm';
}

interface SubFillButtonWrapperProps extends DefaultPressableProps {
  size?: 'lg' | 'sm';
}

const SubFillButtonWrapper = styled(
  DefaultPressable
)<SubFillButtonWrapperProps>`
  width: ${({ size }) => (size === 'lg' ? rWidth(120) : rWidth(60))}px;
  height: ${rHeight(32)}px;
`;
const ButtonTitleWrapper = styled.Text`
  ${({ theme }) => theme.typographys.captionb};
  color: ${({ theme }) => theme.colors.white};
`;
export default function SubFillButton({
  bgColor,
  title,
  size = 'lg',
  onPress,
}: SubFillButtonProps) {
  return (
    <SubFillButtonWrapper bgColor={bgColor} onPress={onPress} size={size}>
      <ButtonTitleWrapper>{title}</ButtonTitleWrapper>
    </SubFillButtonWrapper>
  );
}
