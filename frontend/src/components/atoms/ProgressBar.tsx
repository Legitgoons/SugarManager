import { rHeight, extractNumber } from '@/utils';
import React from 'react';
import styled from 'styled-components/native';

const ProgressBarContainer = styled.View`
  width: 100%;
  height: ${rHeight(4)}px;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressWrapper = styled.View<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: ${({ theme }) => theme.colors.b4};
  border-radius: 10px;
`;
interface ProgressBarProps {
  current: string;
  goal: string;
}
function ProgressBar({ current, goal }: ProgressBarProps) {
  const currentNum = extractNumber(current);
  const goalNum = extractNumber(goal);

  return (
    <ProgressBarContainer>
      <ProgressWrapper progress={(currentNum / goalNum) * 100} />
    </ProgressBarContainer>
  );
}

export default ProgressBar;
