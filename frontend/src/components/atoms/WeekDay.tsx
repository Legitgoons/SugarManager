import React from 'react';
import { DefaultPressable } from '@/styles';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';

const WeekDayWrapper = styled(DefaultPressable)`
  border-radius: 0px;
  flex-direction: column;
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const WeekDayText = styled.Text`
  ${({ theme }) => theme.typographys.captionr}
`;

export default function WeekDay({ title }: DefaultPressableProps) {
  return (
    <WeekDayWrapper>
      <WeekDayText>{title}</WeekDayText>
    </WeekDayWrapper>
  );
}
