import { DefaultCard, DefaultText } from '@/styles';
import React from 'react';
import styled from 'styled-components/native';
import { getTimeSecondText, rHeight, rWidth } from '@/utils';
import HeartIcon from '@/assets/img/heart.svg';
import CrownIcon from '@/assets/img/crown.svg';
import EyedropperIcon from '@/assets/img/eyedropper.svg';

const DailyInfoContentCardWrapper = styled(DefaultCard)`
  justify-content: center;
  align-items: center;
  padding-left: ${rWidth(8)}px;
  padding-right: ${rWidth(8)}px;
  gap: ${rWidth(32)}px;
  flex-direction: row;
`;

function get3DIcon(category: string) {
  switch (category) {
    case 'CHALLENGE':
      return <CrownIcon width={rWidth(20)} height={rHeight(20)} />;
    case 'BLOODSUGAR':
      return <HeartIcon width={rWidth(20)} height={rHeight(20)} />;
    default:
      return <EyedropperIcon width={rWidth(20)} height={rHeight(20)} />;
  }
}

interface DailyInfoContentCardProps {
  hour: number;
  minute: number;
  category: string;
  content: string;
}

function getUnit(category: string) {
  switch (category) {
    case 'BLOODSUGAR':
      return 'mg/dL';
    case 'CHALLENGE':
      return '';
    default:
      return 'Kal';
  }
}

export default function DailyInfoContentCard({
  hour,
  minute,
  category,
  content,
}: DailyInfoContentCardProps) {
  const unit = getUnit(category);

  return (
    <DailyInfoContentCardWrapper size="md">
      <DefaultText typography="h4r" color="black">
        {getTimeSecondText(hour, minute)}
      </DefaultText>
      {get3DIcon(category)}
      <DefaultText typography="h4r" color="black">
        {content}
        {unit}
      </DefaultText>
    </DailyInfoContentCardWrapper>
  );
}
