import React from 'react';
import styled from 'styled-components/native';
import { rWidth, rHeight } from '@/utils/style';
import ToggleButton from '../atoms/ToggleButton';

interface ToggleProps {
  isLeft: boolean;
  onPress: React.Dispatch<React.SetStateAction<boolean>>;
  leftTitle: string;
  rightTitle: string;
}

const ToggleBox = styled.View`
  width: ${rWidth(320)}px;
  height: ${rHeight(48)}px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.tertiary};
`;

/**
 * @param {boolean} isLeft 좌측 Toggle Button이 선택 여부 변수
 * @param {React.Dispatch<React.SetStateAction<boolean>>} onPress callback 함수
 * @param {string} leftTitle 좌측 Toggle Button Title
 * @param {stirng} rightTitle 우측 Toggle Button Title
 * @returns {JSX.Element} Toggle Component
 */

export default function Toggle({
  isLeft,
  onPress,
  leftTitle,
  rightTitle,
}: ToggleProps) {
  return (
    <ToggleBox>
      <ToggleButton
        isActive={isLeft}
        onPress={() => onPress(true)}
        title={leftTitle}
      />
      <ToggleButton
        isActive={!isLeft}
        onPress={() => onPress(false)}
        title={rightTitle}
      />
    </ToggleBox>
  );
}
