import React from 'react';
import DefaultPressable from '@/styles/pressable';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';

interface NumberDayProps extends DefaultPressableProps {
  isMarked: boolean;
  title: number;
}

const NumberDayWrapper = styled(DefaultPressable)`
  border-radius: 0px;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const NumberDayText = styled.Text`
  ${({ theme }) => theme.typography.p2r}
`;

const NumberDayMark = styled.View<{ isMarked: boolean }>`
  background-color: ${({ theme, isMarked }) =>
    isMarked ? theme.colors.b4 : theme.colors.white};
  width: 4px;
  height: 4px;
  border-radius: 2px;
`;
export default function NumberDay({ isMarked, title }: NumberDayProps) {
  return (
    <NumberDayWrapper>
      <NumberDayText>{title >= 1 && title <= 31 ? title : ''}</NumberDayText>
      <NumberDayMark isMarked={isMarked} />
    </NumberDayWrapper>
  );
}
