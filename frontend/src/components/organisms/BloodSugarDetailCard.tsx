import React from 'react';
import styled from 'styled-components/native';
import DefaultCard from '@/styles/Card';
import { rWidth } from '@/utils/style';
import { ColorSquareType } from '@/types/colorSquare';
import { DefalutCardProps } from '@/types/card';
import { padNumber } from '@/utils/formatDate';
import BloodSugarSquare from '../molecules/BloodSugarSquare';

const CardSection = styled(DefaultCard)`
  flex-direction: row;
  justify-content: space-evenly;
`;

const CardContent = styled.View`
  width: ${rWidth(240)}px;
`;

const SquareBox = styled.View`
  width: ${rWidth(300)}px;
  flex-direction: row;
  justify-content: space-between;
`;
const CardHeaderBox = styled.View`
  width: ${rWidth(200)}px;
  flex-direction: row;
  justify-content: space-between;
`;

const TimeTextWrapper = styled.Text`
  ${({ theme }) => theme.typographys.captionr}
  color : ${({ theme }) => theme.colors.primary};
`;

const CountTextWrapper = styled.Text`
  ${({ theme }) => theme.typographys.p2r}
  color : ${({ theme }) => theme.colors.black};
`;

const IssueTextWrapper = styled.Text`
  ${({ theme }) => theme.typographys.captionr}
  color : ${({ theme }) => theme.colors.primary};
`;

interface BloodSugarDetailCardProps extends DefalutCardProps {
  count: number;
  time: string;
  isbefore: boolean;
  bloodSugarNum: number;
  bloodSugarType: ColorSquareType;
  issue?: string;
}

export default function BloodSugarDetailCard({
  count,
  time,
  isbefore,
  bloodSugarNum,
  bloodSugarType,
  issue,
  size,
}: BloodSugarDetailCardProps) {
  const date = new Date(time);
  const hours = padNumber(date.getHours());
  const minutes = padNumber(date.getMinutes());

  return (
    <CardSection size={size}>
      <CardContent>
        <CardHeaderBox>
          <CountTextWrapper>{count}회</CountTextWrapper>
          <TimeTextWrapper>
            {hours}:{minutes}
          </TimeTextWrapper>
        </CardHeaderBox>
        <SquareBox>
          <BloodSugarSquare
            isBefore={isbefore}
            num={bloodSugarNum}
            type={bloodSugarType}
          />
        </SquareBox>
        {issue && <IssueTextWrapper>{issue}</IssueTextWrapper>}
      </CardContent>
    </CardSection>
  );
}
