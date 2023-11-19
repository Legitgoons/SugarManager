import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { rHeight, rWidth } from '@/utils';

interface TwinLineGraphProps {
  list: (number | null | string)[][];
}

export default function TwinLineGraph({ list }: TwinLineGraphProps) {
  const d1 = list.map((item) => ({
    value: item[1],
    label: item[0],
    showXAxisIndex: true,
  }));
  const d2 = list.map((item) => ({
    value: item[2],
    label: item[0],
    showXAxisIndex: true,
  }));

  return (
    <View style={{ marginTop: 100 }}>
      <LineChart
        data={d1}
        maxValue={140}
        noOfSections={7}
        spacing={16}
        hideDataPoints
        hideRules
        color="orange"
        yAxisColor="orange"
        showYAxisIndices
        yAxisIndicesColor="orange"
        yAxisIndicesWidth={10}
        secondaryData={d2}
        secondaryLineConfig={{ color: 'blue' }}
        secondaryYAxis={{
          maxValue: 0.2,
          noOfSections: 4,
          showFractionalValues: true,
          roundToDigits: 3,
          yAxisColor: 'blue',
          yAxisIndicesColor: 'blue',
        }}
        xAxisLabelTextStyle={{ width: 80, marginLeft: -36 }}
        xAxisIndicesHeight={10}
        xAxisIndicesWidth={2}
      />
    </View>
  );
}
