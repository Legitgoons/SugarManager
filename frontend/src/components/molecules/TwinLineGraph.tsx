import React from 'react';
import { LineChart } from 'react-native-gifted-charts';
import { rHeight, rWidth } from '@/utils';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slice/userSlice';
import styled from 'styled-components/native';

const ChartWrapper = styled.View`
  display: flex;
  width: ${rWidth(320)}px;
  justify-content: center;
  align-items: center;
`;
interface TwinLineGraphProps {
  list: (number | null | string)[][];
}

export default function TwinLineGraph({ list }: TwinLineGraphProps) {
  const { bloodSugarMax } = useSelector(selectUser);
  const d1 = list.map((item) => ({
    value: item[1],
  }));
  const d2 = list.map((item) => ({
    value: item[2],
  }));

  return (
    <ChartWrapper>
      <LineChart
        data={d1}
        spacing={d1.length > 1 ? rWidth(260) / (d1.length - 1) : rWidth(260)}
        maxValue={bloodSugarMax < 200 ? 200 : bloodSugarMax}
        noOfSections={7}
        hideDataPoints
        hideRules
        color="orange"
        yAxisColor="orange"
        showYAxisIndices
        yAxisIndicesColor="orange"
        yAxisIndicesWidth={10}
        secondaryData={d2}
        secondaryLineConfig={{ color: 'blue' }}
        xAxisLabelTextStyle={{ width: 80, marginLeft: -36 }}
        xAxisIndicesHeight={10}
        xAxisIndicesWidth={2}
        width={rWidth(260)}
        height={rHeight(200)}
      />
    </ChartWrapper>
  );
}
