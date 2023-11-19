import { theme } from '@/styles';
import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { rHeight } from '@/utils/style';

interface MealHorizontalGraphProps {
  carbohydrate: number;
  protein: number;
  fat: number;
}
export default function MealHorizontalGraph({
  carbohydrate,
  protein,
  fat,
}: MealHorizontalGraphProps) {
  const barData = [
    { value: carbohydrate, label: '탄', frontColor: `${theme.colors.yellow}` },
    { value: protein, label: '단', frontColor: `${theme.colors.green}` },
    { value: fat, label: '지', frontColor: `${theme.colors.b4}` },
  ];

  return (
    <View style={{ height: rHeight(200) }}>
      <BarChart
        horizontal
        barWidth={22}
        width={320}
        maxValue={Math.max(carbohydrate, protein, fat)}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        hideRules
      />
    </View>
  );
}
