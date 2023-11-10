import React from 'react';
import styled from 'styled-components/native';
import BlackLeftArrowIcon from '@/assets/icon/BlackLeftArrowIcon.svg';
import BlackRightArrowIcon from '@/assets/icon/BlackRightArrowIcon.svg';
import { DefaultCalendarCard } from '@/styles';
import { rHeight, rWidth } from '@/utils';

const CalendarHeaderBox = styled(DefaultCalendarCard)`
  justify-content: space-between;
  padding: ${rHeight(20)}px ${rWidth(10)}px;
`;
const CalendarHeaderText = styled.Text`
  ${({ theme }) => theme.typographys.h4r}
  color : black;
`;
const CalendarHeaderButton = styled.Pressable`
  width: ${rWidth(20)}px;
  height: ${rHeight(20)}px;
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
