/* eslint-disable no-nested-ternary */
import DefaultPressableProps from '@/types/pressable';
import { DefaultPressable } from '@/styles';
import React from 'react';
import styled from 'styled-components/native';
import { ColorType, TypographyType } from '@/styles/theme';

const TextButtonWrapper = styled(DefaultPressable)`
  border-radius: 0px;
  background-color: none;
`;

const ButtonTitleWrapper = styled.Text<{
  selected: boolean;
  color?: keyof ColorType;
  typography?: keyof TypographyType;
  mode: 'switch' | 'toggle';
}>`
  color: ${({ selected = true, mode, theme, color }) =>
    mode === 'switch'
      ? selected
        ? theme.colors.black
        : theme.colors.secondary
      : color
      ? theme.colors[color]
      : theme.colors.black};
  ${({ selected = true, theme, mode, typography }) =>
    mode === 'switch'
      ? selected
        ? theme.typographys.h4b
        : theme.typographys.h4r
      : typography
      ? theme.typographys[typography]
      : theme.typographys.h4r};
`;

interface TextButtonProps extends DefaultPressableProps {
  title: string;
  isSelected: boolean;
  mode?: 'switch' | 'toggle';
  color?: keyof ColorType;
  typography?: keyof TypographyType;
}

function TextButton({
  title,
  isSelected = true,
  onPress,
  color,
  typography,
  mode = 'switch',
}: TextButtonProps) {
  return (
    <TextButtonWrapper onPress={onPress}>
      <ButtonTitleWrapper
        selected={isSelected}
        color={color}
        typography={typography}
        mode={mode}
      >
        {title}
      </ButtonTitleWrapper>
    </TextButtonWrapper>
  );
}

export default TextButton;
