import React from 'react';
import DefaultCard from '@/styles/Card';
import DefaultText from '@/styles/Text';
import styled from 'styled-components/native';
import BlackRightArrowButton from '@/assets/icon/BlackRightArrowIcon.svg';
import { rHeight, rWidth } from '@/utils/style';
import ProgressBar from '../atoms/ProgressBar';

const ChallengeCardContainer = styled(DefaultCard)`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: ${rHeight(24)}px ${rWidth(24)}px;
`;
const CardTitleWrapper = styled(DefaultText)``;
const LeftNumericWrapper = styled(DefaultText)``;
const RightNumericWrapper = styled(DefaultText)``;
const ChallengeContentBox = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const NumericTextWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

interface ChallengeCardProps {
  title: string;
  leftNumeric: string;
  rightNumeric: string;
  button: string;
  onPress: () => void;
}

export default function ChanllengeCard({
  title,
  leftNumeric,
  rightNumeric,
  button,
  onPress,
}: ChallengeCardProps) {
  return (
    <ChallengeCardContainer size="lg">
      <CardTitleWrapper typography="captionr" color="secondary">
        {title}
      </CardTitleWrapper>
      <ChallengeContentBox>
        <NumericTextWrapper>
          <LeftNumericWrapper typography="h1b" color="black">
            {leftNumeric}
          </LeftNumericWrapper>
          <RightNumericWrapper typography="p1b" color="secondary">
            / {rightNumeric}
          </RightNumericWrapper>
        </NumericTextWrapper>
        {button &&
          (button === 'view' ? (
            <BlackRightArrowButton
              width={rWidth(20)}
              height={rHeight(20)}
              onPress={onPress}
            />
          ) : (
            <BlackRightArrowButton
              width={rWidth(20)}
              height={rHeight(20)}
              onPress={onPress}
            />
          ))}
      </ChallengeContentBox>
      <ProgressBar current={leftNumeric} goal={rightNumeric} />
    </ChallengeCardContainer>
  );
}
