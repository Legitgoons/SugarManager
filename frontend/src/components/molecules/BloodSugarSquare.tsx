import React from 'react';
import styled from 'styled-components/native';
import { rWidth, rHeight } from '@/utils/style';
import { ColorSquareProps } from '@/types/colorSquare';
import ColorSquare from '../atoms/ColorSquare';

const BloodSugarSquareBox = styled.View`
  width: ${rWidth(120)}px;
  height: ${rHeight(44)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SuqareBoxTextWrapper = styled.Text`
  ${({ theme }) => theme.typographys.p1r}
  color : ${({ theme }) => theme.colors.primary}
`;

interface BloodSugarSquareProps extends ColorSquareProps {
  isBefore: boolean;
}

export default function BloodSugarSquare({
  isBefore,
  num,
  type,
}: BloodSugarSquareProps) {
  return (
    <BloodSugarSquareBox>
      <SuqareBoxTextWrapper>
        {isBefore ? '식전 혈당' : '식후 혈당'}
      </SuqareBoxTextWrapper>
      <ColorSquare num={num} type={type} />
    </BloodSugarSquareBox>
  );
}
