import React from 'react';
import styled from 'styled-components/native';
import { DefaultCalendarCard } from '@/styles';
import { rHeight, rWidth } from '@/utils';

const DayCardBox = styled(DefaultCalendarCard)`
  justify-content: space-between;
  padding: ${rHeight(20)}px ${rWidth(10)}px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
`;
const CardHeaderText = styled.Text`
  ${({ theme }) => theme.typographys.h4r}
  color: black;
`;

interface CalendarCardProps {
  title: string;
}
export default function DayCard({ title }: CalendarCardProps) {
  return (
    <DayCardBox size="lg">
      <CardHeaderText>{title}</CardHeaderText>
    </DayCardBox>
  );
}
