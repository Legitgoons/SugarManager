import React from 'react';
import styled from 'styled-components/native';
import BlackLeftArrowIcon from '@/assets/icon/BlackLeftArrowIcon.svg';
import BlackRightArrowIcon from '@/assets/icon/BlackRightArrowIcon.svg';
import DefaultCalendarCard from '@/styles/Calendar';

const CalendarHeaderBox = styled(DefaultCalendarCard)`
  justify-content: space-between;
  padding: 20px 10px;
`;
const CalendarHeaderText = styled.Text`
  ${({ theme }) => theme.typography.h4r}
  color : black;
`;
const CalendarHeaderButton = styled.Pressable`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CalendarHeaderProps {
  onClickLeft: () => void;
  onClickRight: () => void;
  title: string;
}
export default function CalendarHeader({
  onClickLeft,
  onClickRight,
  title,
}: CalendarHeaderProps) {
  return (
    <CalendarHeaderBox>
      <CalendarHeaderButton onPress={onClickLeft}>
        <BlackLeftArrowIcon width={20} height={20} />
      </CalendarHeaderButton>
      <CalendarHeaderText>{title}</CalendarHeaderText>
      <CalendarHeaderButton onPress={onClickRight}>
        <BlackRightArrowIcon width={20} height={20} />
      </CalendarHeaderButton>
    </CalendarHeaderBox>
  );
}
