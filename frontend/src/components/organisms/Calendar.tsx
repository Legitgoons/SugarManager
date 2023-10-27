import React, { useMemo, useState } from 'react';
import styled from 'styled-components/native';
import getMonthObj from '@/utils/time';
import BlackLeftArrowIcon from '@/assets/icon/BlackLeftArrowIcon.svg';
import BlackRightArrowIcon from '@/assets/icon/BlackRightArrowIcon.svg';
import WeekDayWeek from '../molecules/WeekDayWeek';
import NumberWeek from '../molecules/NumberWeek';

const CalendarContainer = styled.View`
  display: flex;
  justify-content: cetner;
  align-items: center;
  flex-direction: column;
  width: 320px;
  gap: 16px;
`;
const CalendarHeader = styled.View`
  width: 160px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CalendarHeaderText = styled.Text`
  ${({ theme }) => theme.typography.h3b}
`;
const CalendarContentBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CalendarHeaderButton = styled.Pressable`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Calendar() {
  const curDate = useMemo(() => new Date(), []);
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

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarHeaderButton onPress={handleAddDate}>
          <BlackLeftArrowIcon width={20} height={20} />
        </CalendarHeaderButton>
        <CalendarHeaderText>{`${year}-${month}`}</CalendarHeaderText>
        <CalendarHeaderButton onPress={handleMinusDate}>
          <BlackRightArrowIcon />
        </CalendarHeaderButton>
      </CalendarHeader>
      <CalendarContentBox>
        <WeekDayWeek />
        {currentMonthObj.map((cur) => (
          <NumberWeek weekInfo={cur} />
        ))}
      </CalendarContentBox>
    </CalendarContainer>
  );
}
