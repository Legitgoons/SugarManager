/* eslint-disable react/no-array-index-key */
import React, { useMemo, useState } from 'react';
import styled from 'styled-components/native';
import getMonthObj from '@/utils/time';
import { rWidth, rHeight } from '@/utils/style';
import WeekDayWeek from '../molecules/WeekDayWeek';
import NumberWeek from '../molecules/NumberWeek';
import CalendarCard from '../molecules/CalendarCard';

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
  monthStatus: Record<string, boolean>;
}

export default function Calendar({ monthStatus }: CalendarProps) {
  const curDate = new Date();
  const [year, setYear] = useState(curDate.getFullYear());
  const [month, setMonth] = useState(curDate.getMonth() + 1);
  const currentMonthObj = useMemo(
    () => getMonthObj({ year, month, monthStatus }),
    [year, month, monthStatus]
  );
  const handleMinusDate = () => {
    if (month - 1 === 0) {
      setMonth(12);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };
  const handleAddDate = () => {
    if (month + 1 === 13) {
      setMonth(1);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  /*
  일 클릭 시, 동작하는 함수
  */
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
      <CalendarCard
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
