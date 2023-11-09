import React, { useState } from 'react';
import styled from 'styled-components/native';
import DefaultCalendarCard from '@/styles/Calendar';
import { rHeight, rWidth } from '@/utils/style';
import DefaultPressable from '@/styles/Pressable';
import { DatePickerProps } from '@/types/datePicker';
import DatePickerModal from '../atoms/DatePickerModal';
import DatePickerFormat from '../atoms/DatePickerFormat';

const CalendarCardBox = styled(DefaultCalendarCard)`
  padding: ${rHeight(10)}px ${rWidth(10)}px;
`;

const CalendarDatePickerButton = styled(DefaultPressable)`
  width: ${rWidth(100)}px;
  height: ${rHeight(45)}px;
  flex-direction: column;
`;

const DatePickerButtonTextWrapper = styled.Text`
  ${({ theme }) => theme.typography.captionr}
  color : ${({ theme }) => theme.colors.primary};
`;

interface CalendarDatePickerProps extends DatePickerProps {
  title: string;
}

/**
 * @param {string} title 날짜 하단에 표시될 title
 * @returns {JSX.Element} 날짜를 출력하고 클릭 시 DatePicker를 실행하는 Component
 */

export default function CalendarDatePicker({
  date,
  setDate,
  title,
  mode,
}: CalendarDatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <CalendarCardBox size="sm">
      <CalendarDatePickerButton
        onPress={() => setOpen(true)}
        bgColor="tertiary"
      >
        <DatePickerFormat
          color="black"
          date={date}
          mode={mode}
          typography="p2r"
        />
        <DatePickerButtonTextWrapper>{title}</DatePickerButtonTextWrapper>
      </CalendarDatePickerButton>
      <DatePickerModal
        open={open}
        setOpen={setOpen}
        date={date}
        setDate={setDate}
        mode={mode}
      />
    </CalendarCardBox>
  );
}
