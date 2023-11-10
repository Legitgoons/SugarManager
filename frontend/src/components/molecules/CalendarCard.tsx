import React from 'react';
import styled from 'styled-components/native';
import BlackLeftArrowIcon from '@/assets/icon/BlackLeftArrowIcon.svg';
import BlackRightArrowIcon from '@/assets/icon/BlackRightArrowIcon.svg';
import DefaultCalendarCard from '@/styles/Calendar';
import { rHeight, rWidth } from '@/utils/style';

const CalendarCardBox = styled(DefaultCalendarCard)`
  justify-content: space-between;
  padding: ${rHeight(20)}px ${rWidth(10)}px;
`;
const CalendarHeaderText = styled.Text`
  ${({ theme }) => theme.typographys.h4r}
  color : black;
`;
const CalendarCardButton = styled.Pressable`
  width: ${rWidth(20)}px;
  height: ${rHeight(20)}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CalendarCardProps {
  onClickLeft: () => void;
  onClickRight: () => void;
  title: string;
}
export default function CalendarCard({
  onClickLeft,
  onClickRight,
  title,
}: CalendarCardProps) {
  return (
    <CalendarCardBox size="lg">
      <CalendarCardButton onPress={onClickLeft}>
        <BlackLeftArrowIcon width={20} height={20} />
      </CalendarCardButton>
      <CalendarHeaderText>{title}</CalendarHeaderText>
      <CalendarCardButton onPress={onClickRight}>
        <BlackRightArrowIcon width={20} height={20} />
      </CalendarCardButton>
    </CalendarCardBox>
  );
}
