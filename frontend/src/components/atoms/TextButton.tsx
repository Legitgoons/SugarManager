import DefaultPressableProps from '@/types/pressable';
import DefaultPressable from '@/styles/Pressable';
import React from 'react';
import styled from 'styled-components/native';

const TextButtonWrapper = styled(DefaultPressable)`
  border-radius: 0px;
  background-color: none;
`;

const ButtonTitleWrapper = styled.Text<{ selected: boolean }>`
  color: ${({ selected = true, theme }) =>
    selected ? theme.colors.black : theme.colors.secondary};
  ${({ selected = true, theme }) =>
    selected ? theme.typographys.h4b : theme.typographys.h4r};
`;

interface TextButtonProps extends DefaultPressableProps {
  title: string;
  isSelected: boolean;
}

function TextButton({ title, isSelected = true, onPress }: TextButtonProps) {
  return (
    <TextButtonWrapper onPress={onPress}>
      <ButtonTitleWrapper selected={isSelected}>{title}</ButtonTitleWrapper>
    </TextButtonWrapper>
  );
}

export default TextButton;
