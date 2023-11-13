import React, { useState } from 'react';
import { rWidth } from '@/utils/style';
import styled from 'styled-components/native';
import BlackRightArrowIcon from '@/assets/icon/BlackRightArrowIcon.svg';
import { DatePickerProps } from '@/types/datePicker';
import DatePickerModal from '../atoms/DatePickerModal';
import DatePickerFormat from '../atoms/DatePickerFormat';

const TextDatePickerButton = styled.Pressable`
  width: ${rWidth(128)}px;
  flex-direction: row;
  justify-content: space-between;
`;

const BlackArrowIcon = styled(BlackRightArrowIcon)``;

interface TextDatePickerProps extends DatePickerProps {}

/**
 * @returns {JSX.Element} 날짜와 시간을 표시해주는 Component
 */

export default function TextDatePicker({
  date,
  setDate,
  mode,
}: TextDatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <TextDatePickerButton onPress={() => setOpen(true)}>
      <DatePickerFormat color="b4" date={date} mode={mode} typography="p2r" />
      <DatePickerModal
        open={open}
        setOpen={setOpen}
        date={date}
        setDate={setDate}
        mode={mode}
      />
      <BlackArrowIcon />
    </TextDatePickerButton>
  );
}
