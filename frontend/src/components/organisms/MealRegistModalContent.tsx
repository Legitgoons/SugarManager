import React from 'react';
import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils';
import cutText from '@/utils/cutText';
import LabelledInput from '../molecules/LabelledInput';
import InputLine from '../molecules/InputLine';

interface MealRegistModalContentProps {
  registByUser: boolean;
  foodName: string;
  setFoodName: React.Dispatch<React.SetStateAction<string>>;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  sugar: number;
  setSugar: React.Dispatch<React.SetStateAction<number>>;
  carbohydrate: number;
  setCarbohydrate: React.Dispatch<React.SetStateAction<number>>;
  fat: number;
  setFat: React.Dispatch<React.SetStateAction<number>>;
  protein: number;
  setProtein: React.Dispatch<React.SetStateAction<number>>;
  calorie: number;
  setCalorie: React.Dispatch<React.SetStateAction<number>>;
}

const MealRegistModalContentBox = styled.View``;
const InputBox = styled.View`
  width: ${rWidth(280)}px;
  gap: ${rHeight(3)}px;
`;
const InputLineBox = styled.View`
  flex-direction: row;
  width: ${rWidth(280)}px;
  gap: ${rHeight(3)}px;
`;

export default function MealRegistModalContent({
  registByUser,
  foodName,
  setFoodName,
  amount,
  setAmount,
  sugar,
  setSugar,
  carbohydrate,
  setCarbohydrate,
  fat,
  setFat,
  protein,
  setProtein,
  calorie,
  setCalorie,
}: MealRegistModalContentProps) {
  return (
    <MealRegistModalContentBox>
      <InputBox>
        {registByUser ? (
          <InputLineBox>
            <InputLine
              placeholder="음식 이름"
              value={foodName}
              onChangeText={setFoodName}
              width={125}
            />
            <InputLine
              placeholder="음식 양"
              value={amount}
              onChangeText={setAmount}
              width={150}
              unit="g"
            />
          </InputLineBox>
        ) : (
          <LabelledInput
            label={cutText(foodName, 6)}
            inputType="inputLine"
            inputProps={{
              placeholder: '1회 섭취 권장량',
              value: amount,
              onChangeText: setAmount,
              width: 150,
              unit: 'g',
            }}
          />
        )}

        <LabelledInput
          label="당류"
          inputType="inputLine"
          inputProps={{
            placeholder: '입력해주세요',
            value: sugar,
            onChangeText: setSugar,
            width: 150,
            unit: 'g',
          }}
        />
        <LabelledInput
          label="탄수화물"
          inputType="inputLine"
          inputProps={{
            placeholder: '입력해주세요',
            value: carbohydrate,
            onChangeText: setCarbohydrate,
            width: 150,
            unit: 'g',
          }}
        />
        <LabelledInput
          label="지방"
          inputType="inputLine"
          inputProps={{
            placeholder: '입력해주세요',
            value: fat,
            onChangeText: setFat,
            width: 150,
            unit: 'g',
          }}
        />
        <LabelledInput
          label="단백질"
          inputType="inputLine"
          inputProps={{
            placeholder: '입력해주세요',
            value: protein,
            onChangeText: setProtein,
            width: 150,
            unit: 'g',
          }}
        />
        <LabelledInput
          label="칼로리"
          inputType="inputLine"
          inputProps={{
            placeholder: '입력해주세요',
            value: calorie,
            onChangeText: setCalorie,
            width: 150,
            unit: 'kcal',
          }}
        />
      </InputBox>
    </MealRegistModalContentBox>
  );
}
