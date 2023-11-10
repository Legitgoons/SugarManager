/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components/native';
import weekDayArr from '@/config/weekConfig';
import { rWidth } from '@/utils';
import WeekDay from '../atoms/WeekDay';

const WeekDayWeekWrapper = styled.View`
  width: ${rWidth(320)}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function WeekDayWeek() {
  return (
    <WeekDayWeekWrapper>
      {weekDayArr.map((cur, idx) => (
        <WeekDay key={`${cur}_${idx}`} title={cur} />
      ))}
    </WeekDayWeekWrapper>
  );
}
