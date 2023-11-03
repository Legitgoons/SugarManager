/* eslint-disable react/no-array-index-key */
import React, { useMemo, useState } from 'react';
import styled from 'styled-components/native';
import getMonthObj from '@/utils/time';
import { rWidth, rHeight } from '@/utils/style';
import { useSuspenseQuery } from '@tanstack/react-query';
import WeekDayWeek from '../molecules/WeekDayWeek';
import NumberWeek from '../molecules/NumberWeek';
import CalendarHeader from '../molecules/CalendarHeader';

const CalendarContainer = styled.View`
  display: flex;
  justify-content: cetner;
  align-items: center;
  flex-direction: column;
  width: ${rWidth(320)}px;
  gap: ${rHeight(16)}px;
`;

const CalendarContentBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

interface CalendarProps {
  time: {
    year: number;
    month: number;
    day: number;
  };
  setTime: React.Dispatch<
    React.SetStateAction<{ year: number; month: number; day: number }>
  >;
  onPress: () => void;
}

export default function Calendar({ time, setTime, onPress }: CalendarProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['monthStatus', time],
    queryFn: () => {},
  });
  const { response } = data;
  const { year, month } = time;
  const currentMonthObj = useMemo(
    () =>
      getMonthObj({
        year,
        month,
        monthStatus: response,
      }),
    [response, year, month]
  );
  const handleMinusDate = () => {
    if (month - 1 === 0) {
      setTime((prev) => ({ ...prev, month: 12, year: prev.year - 1 }));
    } else {
      setTime((prev) => ({ ...prev, month: prev.month - 1 }));
    }
  };
  const handleAddDate = () => {
    if (month + 1 === 13) {
      setTime((prev) => ({ ...prev, month: 1, year: prev.year + 1 }));
    } else {
      setTime((prev) => ({ ...prev, month: prev.month + 1 }));
    }
  };

  const handleClickDay = (
    selectedYear: number,
    selectedMonth: number,
    selectedDay: number
  ) => {
    if (selectedYear === 0 || selectedMonth === 0 || selectedDay === 0) return;
    console.log(selectedYear, selectedMonth, selectedDay);
  };

  return (
    <CalendarContainer>
      <CalendarHeader
        onClickLeft={handleMinusDate}
        onClickRight={handleAddDate}
        title={`${year}.${month}`}
      />
      <CalendarContentBox>
        <WeekDayWeek />
        {currentMonthObj.map((cur, idx) => (
          <NumberWeek
            key={`${year}_${month}_week_${idx}`}
            weekInfo={cur}
            year={year}
            month={month}
            onPress={handleClickDay}
          />
        ))}
      </CalendarContentBox>
    </CalendarContainer>
  );
}
