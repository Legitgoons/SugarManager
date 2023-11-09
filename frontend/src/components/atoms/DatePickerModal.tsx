import React from 'react';
import DatePicker from 'react-native-date-picker';
import { DatePickerProps } from '@/types/datePicker';

interface DatePickerModalProps extends DatePickerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @param {boolean} open Modal 열림 상태
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpen Modal 열림 setter
 * @returns {JSX.Element} DatePicker Modal
 */

export default function DatePickerModal({
  open,
  setOpen,
  date,
  setDate,
  mode,
}: DatePickerModalProps) {
  return (
    <DatePicker
      modal
      open={open}
      date={date}
      mode={mode}
      onConfirm={(newDate) => {
        setOpen(false);
        setDate(newDate);
      }}
      onCancel={() => {
        setOpen(false);
      }}
    />
  );
}
