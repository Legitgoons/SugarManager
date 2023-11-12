import React from 'react';
import DefaultPressable from '@/styles/Pressable';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';
import { rWidth, rHeight } from '@/utils/style';

interface ToggleButtonProps extends DefaultPressableProps {
  isActive: boolean;
}

const ToggleButtonWrapper = styled(DefaultPressable)<ToggleButtonProps>`
  width: ${rWidth(148)}px;
  height: ${rHeight(40)}px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : theme.colors.tertiary};
`;

const ButtonTitleWrapper = styled.Text<{ isActive: boolean }>`
  ${({ theme }) => theme.typographys.p2b}
  color : ${({ isActive, theme }) =>
    isActive ? theme.colors.black : theme.colors.primary};
`;

/**
 * @param {boolean} isActive 활성화 되었는지 나타내는 boolean 변수
 * @returns {JSX.Element} Toggle 내부 Button Component
 */

export default function ToggleButton({
  onPress,
  isActive,
  title,
}: ToggleButtonProps) {
  return (
    <ToggleButtonWrapper onPress={onPress} isActive={isActive}>
      <ButtonTitleWrapper isActive={isActive}>{title}</ButtonTitleWrapper>
    </ToggleButtonWrapper>
  );
}
