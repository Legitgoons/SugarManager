/* eslint-disable no-unused-vars */
import { DefaultCard, DefaultText } from '@/styles';
import { rWidth } from '@/utils';
import React from 'react';
import styled from 'styled-components/native';
import CheckViewBox from '../atoms/CheckViewBox';

interface ChallngeCheckCardProps {
  challengePK: string;
  state: any;
  onPress: (challengePK: string) => void;
  title: string;
}

const ChallengeCheckCardContainer = styled(DefaultCard)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${rWidth(24)}px;
`;

const CardBox = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const CardTitleWrapper = styled(DefaultText)``;
export default function ChallengeCheckCard({
  challengePK,
  state,
  onPress,
  title,
}: ChallngeCheckCardProps) {
  return (
    <ChallengeCheckCardContainer
      size="lg"
      onPress={() => {
        onPress(challengePK);
      }}
    >
      <CardBox>
        <CheckViewBox isChecked={state[challengePK]} />
        <CardTitleWrapper typography="h2r" color="black">
          {title}
        </CardTitleWrapper>
      </CardBox>
    </ChallengeCheckCardContainer>
  );
}
