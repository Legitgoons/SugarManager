import React from 'react';
import DatePicker from 'react-native-date-picker';
import { DatePickerProps } from '@/types/datePicker';

interface DatePickerModalProps extends DatePickerProps {}

/**
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
