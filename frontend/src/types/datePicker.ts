export type DatePickerMode = 'datetime' | 'date' | 'time';

/**
 * @param {Date} date 날짜 상태
 * @param {(newDate: Date) => void} setDate 날짜 setter
 * @param {DatePickerMode} mode 날짜와 시간 선택 여부
 */

export interface DatePickerProps {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  setDate: (newDate: Date) => void;
  mode: DatePickerMode;
}
