/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
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
  year: number;
  month: number;
  weekInfo: Array<{
    numberDay: number;
    weekDay: string;
  }>;
  onPress: (
    selectedYear: number,
    selectedMonth: number,
    selectedDay: number
  ) => void;
}

export default function NumberWeek({
  year,
  month,
  weekInfo,
  onPress,
}: NumberWeekProps) {
  return (
    <NumberWeekWrapper>
      {weekInfo.map(({ numberDay }, idx) => (
        <NumberDay
          key={`${year}_${month}_${numberDay}_${idx}`}
          title={numberDay}
          isMarked={false}
          onPress={() => {
            onPress(year, month, numberDay);
          }}
        />
      ))}
    </NumberWeekWrapper>
  );
}
