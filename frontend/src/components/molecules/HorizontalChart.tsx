import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { View } from 'react-native';

export default function HorizontalChart() {
  const barData = [
    { value: 500, label: '탄수화물', frontColor: '#177AD5' },
    { value: 745, label: '지방', frontColor: '#177AD5' },
    { value: 600, label: '단백질', frontColor: '#177AD5' },
  ];
  return (
    <View>
      <BarChart
        horizontal
        barWidth={22}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
}
