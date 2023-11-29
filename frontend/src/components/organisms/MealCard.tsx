import React from 'react';
import styled from 'styled-components/native';
import DefaultCard from '@/styles/Card';
import { rWidth } from '@/utils/style';
import cutText from '@/utils/cutText';
import BlackRightArrowIcon from '@/assets/icon/BlackRightArrowIcon.svg';
import TextWithSmallTitle from '../atoms/TextWithSmallTitle';

const CardSection = styled(DefaultCard)`
  flex-direction: row;
  justify-content: space-evenly;
`;

const CardContent = styled.View``;
const BlackArrowIcon = styled(BlackRightArrowIcon)`
  width: ${rWidth(20)}px;
`;
const CardHeaderBox = styled.View`
  width: ${rWidth(280)}px;
  flex-direction: row;
  justify-content: space-between;
`;

const CalorieTextWrapper = styled.Text`
  ${({ theme }) => theme.typographys.p1r}
  color : ${({ theme }) => theme.colors.primary};
`;

const CardBodyBox = styled.View`
  width: ${rWidth(280)}px;
  flex-direction: row;
  justify-content: space-between;
`;

interface MealCardProps {
  topTitle: string;
  topText: string;
  calorie: number;
  sugar: number;
  protein: number;
  carbohydrate: number;
  fat: number;
  onPress?: () => void;
}

export default function MealCard({
  topTitle,
  topText,
  calorie,
  sugar,
  protein,
  carbohydrate,
  fat,
  onPress,
}: MealCardProps) {
  return (
    <CardSection size="lg" onPress={onPress}>
      <CardContent>
        <CardHeaderBox>
          <TextWithSmallTitle title={topTitle} text={cutText(topText, 13)} />
          <CalorieTextWrapper>{`${calorie}Kcal`}</CalorieTextWrapper>
        </CardHeaderBox>
        <CardBodyBox>
          <TextWithSmallTitle
            title="당류"
            text={`${Math.round(sugar).toString()}g`}
          />
          <TextWithSmallTitle
            title="단백질"
            text={`${Math.round(protein).toString()}g`}
          />
          <TextWithSmallTitle
            title="탄수화물"
            text={`${Math.round(carbohydrate).toString()}g`}
          />
          <TextWithSmallTitle
            title="지방"
            text={`${Math.round(fat).toString()}g`}
          />
        </CardBodyBox>
      </CardContent>
      {onPress && <BlackArrowIcon />}
    </CardSection>
  );
}
