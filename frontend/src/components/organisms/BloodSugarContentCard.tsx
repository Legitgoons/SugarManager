import React from 'react';
import styled from 'styled-components/native';
import DefaultCard from '@/styles/Card';
import { rWidth } from '@/utils/style';
import BlackRightArrowIcon from '@/assets/icon/BlackRightArrowIcon.svg';
import { ColorSquareType } from '@/types/colorSquare';
import { DefalutCardProps } from '@/types/card';
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
const SquareWrapper = styled.View`
  width: ${rWidth(120)}px;
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

interface BloodSugarContentCardProps extends DefalutCardProps {
  date?: string;
  count?: number;
  beforeNum: number | null;
  beforeType: ColorSquareType | null;
  afterNum: number | null;
  afterType: ColorSquareType | null;
  onPress?: () => void;
}

export default function BloodSugarContentCard({
  size = 'lg',
  date,
  count,
  beforeNum,
  beforeType,
  afterNum,
  afterType,
  onPress,
}: BloodSugarContentCardProps) {
  return (
    <CardSection size={size} onPress={onPress}>
      <CardContent>
        {size === 'lg' && (
          <CardHeaderBox>
            <DateTextWrapper>{date}</DateTextWrapper>
            <CountTextWrapper>{count}회 측정</CountTextWrapper>
          </CardHeaderBox>
        )}
        <SquareBox>
          <SquareWrapper>
            {beforeNum !== null && beforeType !== null && (
              <BloodSugarSquare isBefore num={beforeNum} type={beforeType} />
            )}
          </SquareWrapper>
          <SquareWrapper>
            {afterNum !== null && afterType !== null && (
              <BloodSugarSquare
                isBefore={false}
                num={afterNum}
                type={afterType}
              />
            )}
          </SquareWrapper>
          {onPress && <BlackArrowIcon />}
        </SquareBox>
      </CardContent>
    </CardSection>
  );
}
