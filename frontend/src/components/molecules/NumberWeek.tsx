import React from 'react';
import styled from 'styled-components/native';
import NumberDay from '../atoms/NumberDay';

const NumberWeekWrapper = styled.View`
  width: 320px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface NumberWeekProps {
  weekInfo: Array<{
    numberDay: number;
    weekDay: string;
  }>;
}

export default function NumberWeek({ weekInfo }: NumberWeekProps) {
  return (
    <NumberWeekWrapper>
      {weekInfo.map(({ numberDay }) => (
        <NumberDay title={numberDay} isMarked={false} />
      ))}
    </NumberWeekWrapper>
  );
}
