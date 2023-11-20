import React from 'react';
import styled from 'styled-components/native';
import DefaultCard from '@/styles/Card';
import { rWidth } from '@/utils/style';
import BlackRightArrowIcon from '@/assets/icon/BlackRightArrowIcon.svg';
import { colorSquareType } from '@/types/colorSquare';
import BloodSugarSquare from '../molecules/BloodSugarSquare';

const CardSection = styled(DefaultCard)`
  flex-direction: row;
  justify-content: space-evenly;
`;

const CardContent = styled.View``;
const BlackArrowIcon = styled(BlackRightArrowIcon)`
  width: ${rWidth(40)}px;
`;
const SquareBox = styled.View`
  width: ${rWidth(300)}px;
  flex-direction: row;
  justify-content: space-between;
`;
const CardHeaderBox = styled.View`
  width: ${rWidth(260)}px;
  flex-direction: row;
  justify-content: space-between;
`;

const DateTextWrapper = styled.Text`
  ${({ theme }) => theme.typographys.p2r}
  color : ${({ theme }) => theme.colors.black};
`;

const CountTextWrapper = styled.Text`
  ${({ theme }) => theme.typographys.captionr}
  color : ${({ theme }) => theme.colors.primary};
`;

interface BloodSugarContentCardProps {
  date: string;
  count: number;
  beforeNum: number;
  beforeType: colorSquareType;
  afterNum: number;
  afterType: colorSquareType;
  onPress: () => void;
}

export default function BloodSugarContentCard({
  date,
  count,
  beforeNum,
  beforeType,
  afterNum,
  afterType,
  onPress,
}: BloodSugarContentCardProps) {
  return (
    <CardSection size="lg" onPress={onPress}>
      <CardContent>
        <CardHeaderBox>
          <DateTextWrapper>{date}</DateTextWrapper>
          <CountTextWrapper>{count}회 측정</CountTextWrapper>
        </CardHeaderBox>
        <SquareBox>
          <BloodSugarSquare isBefore num={beforeNum} type={beforeType} />
          <BloodSugarSquare isBefore={false} num={afterNum} type={afterType} />
          <BlackArrowIcon />
        </SquareBox>
      </CardContent>
    </CardSection>
  );
}
