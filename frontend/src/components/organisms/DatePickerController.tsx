import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils/style';
import CalendarDatePicker from '../molecules/CalendarDatePicker';

const DatePickerControllerBox = styled.View`
  width: ${rWidth(320)}px;
  height: ${rHeight(60)};
  flex-direction: row;
  justify-content: space-between;
`;

interface DatePickerControllerProps {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function DatePickerController({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DatePickerControllerProps) {
  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  return (
    <DatePickerControllerBox>
      <CalendarDatePicker
        date={startDate}
        setDate={setStartDate}
        title="시작 날짜 선택"
        mode="date"
      />
      <CalendarDatePicker
        date={endDate}
        setDate={setEndDate}
        title="종료 날짜 선택"
        mode="date"
      />
    </DatePickerControllerBox>
  );
}
