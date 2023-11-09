import { ColorType, TypographyType } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components/native';

interface DatePickerFormatWrapperProps {
  color: keyof ColorType;
  typography: keyof TypographyType;
}

const DatePickerFormatWrapper = styled.Text<DatePickerFormatWrapperProps>`
  ${({ theme, typography }) => theme.typography[typography]}
  color : ${({ theme, color }) => theme.colors[color]};
`;

interface DatePickerFormatProps {
  color: keyof ColorType;
  typography: keyof TypographyType;
  mode: 'datetime' | 'date' | 'time';
  date: Date;
}

/**
 * @param {keyof ColorType} color 글자 색
 * @param {keyof TypographyType} typography 폰트
 * @param {'datetime' | 'date' | 'time'} mode formatting 해줄 형식
 * @param {Date} date 날짜와 시간
 * @returns {JSX.Element} 날짜를 형식에 맞게 formatting해주는 Component
 */

export default function DatePickerFormat({
  color,
  typography,
  mode,
  date,
}: DatePickerFormatProps) {
  let formattedDate: string = '';
  if (mode === 'datetime') {
    formattedDate = `${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`;
  } else if (mode === 'date') {
    formattedDate = `${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()}`;
  }

  return (
    <DatePickerFormatWrapper color={color} typography={typography}>
      {formattedDate}
    </DatePickerFormatWrapper>
  );
}
