import React from 'react';
import styled from 'styled-components/native';
import DefaultPressable from '@/styles/pressable';
import DefaultPressableProps from '@/types/pressable';

interface SubOutlineButtonProps extends DefaultPressableProps {
  borderColor: string;
  title: string;
}

const SubOutlineButtonWrapper = styled(DefaultPressable)`
  width: 120px;
  height: 32px;
  border-width: 1px;
`;

const ButtonTitleWrapper = styled.Text<{ color: string }>`
  ${({ theme }) => theme.typography.captionb};
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
