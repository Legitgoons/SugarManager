import React, { useMemo, useState } from 'react';
import styled from 'styled-components/native';
import getMonthObj from '@/utils/time';
import WeekDayWeek from '../molecules/WeekDayWeek';
import NumberWeek from '../molecules/NumberWeek';
import CalendarHeader from '../molecules/CalendarHeader';

const CalendarContainer = styled.View`
  display: flex;
  justify-content: cetner;
  align-items: center;
  flex-direction: column;
  width: 320px;
  gap: 16px;
`;

const CalendarContentBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default function Calendar() {
  const curDate = new Date();
  const [year, setYear] = useState(curDate.getFullYear());
  const [month, setMonth] = useState(curDate.getMonth() + 1);
  const currentMonthObj = useMemo(
    () => getMonthObj(year, month),
    [year, month]
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
    console.log(selectedYear, selectedMonth, selectedDay);
  };

  return (
    <CalendarContainer>
      <CalendarHeader
        onClickLeft={handleAddDate}
        onClickRight={handleMinusDate}
        title={`${year}.${month}`}
      />
      <CalendarContentBox>
        <WeekDayWeek />
        {currentMonthObj.map((cur) => (
          <NumberWeek
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
