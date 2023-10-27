import React from 'react';
import DefaultPressable from '@/styles/pressable';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';

const WeekDayWrapper = styled(DefaultPressable)`
  border-radius: 0px;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const WeekDayText = styled.Text`
  ${({ theme }) => theme.typography.captionr}
`;

export default function WeekDay({ title }: DefaultPressableProps) {
  return (
    <WeekDayWrapper>
      <WeekDayText>{title}</WeekDayText>
    </WeekDayWrapper>
  );
}
