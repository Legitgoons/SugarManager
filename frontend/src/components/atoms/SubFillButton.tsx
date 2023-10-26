import React from 'react';
import styled from 'styled-components/native';
import DefaultPressable from '@/styles/pressable';
import DefaultPressableProps from '@/types/pressable';

interface SubFillButtonProps extends DefaultPressableProps {
  bgColor: string;
  title: string;
}

const SubFillButtonWrapper = styled(DefaultPressable)`
  width: 120px;
  height: 32px;
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
