import React from 'react';

/**
 * @param {boolean} open Modal 열림 상태
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpen Modal 열림 setter
 * @param {Date} date 날짜 상태
 * @param {React.Dispatch<React.SetStateAction<Date>>} setDate 날짜 setter
 * @param {typeof mode} mode 날짜와 시간 선택 여부
 */

export interface DatePickerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  mode: 'datetime' | 'date' | 'time';
}
