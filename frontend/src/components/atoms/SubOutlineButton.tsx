import React from 'react';
import styled from 'styled-components/native';
import DefaultPressable from '@/styles/Pressable';
import DefaultPressableProps from '@/types/pressable';
import { ColorType } from '@/styles/theme';
import { rWidth, rHeight } from '@/utils/style';

interface SubOutlineButtonProps extends DefaultPressableProps {
  borderColor: keyof ColorType;
  title: string;
}

const SubOutlineButtonWrapper = styled(DefaultPressable)`
  width: ${rWidth(120)}px;
  height: ${rHeight(32)}px;
  border-width: 1px;
`;

const ButtonTitleWrapper = styled.Text<{ color: string }>`
  ${({ theme }) => theme.typographys.captionb};
  color: ${(props) => props.color};
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
