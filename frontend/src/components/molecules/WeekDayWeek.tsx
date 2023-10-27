import React from 'react';
import styled from 'styled-components/native';
import weekDayArr from '@/config/weekConfig';
import WeekDay from '../atoms/WeekDay';

const WeekDayWeekWrapper = styled.View`
  width: 320px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function WeekDayWeek() {
  return (
    <WeekDayWeekWrapper>
      {weekDayArr.map((cur) => (
        <WeekDay title={cur} />
      ))}
    </WeekDayWeekWrapper>
  );
}
