import React from 'react';
import DefaultPressable from '@/styles/Pressable';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';

interface NumberDayProps extends DefaultPressableProps {
  isMarked: boolean;
  title: number;
  onPress: () => void;
}

const NumberDayWrapper = styled(DefaultPressable)`
  border-radius: 0px;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const NumberDayTextWrapper = styled.Text`
  ${({ theme }) => theme.typography.p2r}
`;

const NumberDayMarkWrapper = styled.View<{ isMarked: boolean }>`
  background-color: ${({ theme, isMarked }) =>
    isMarked ? theme.colors.b4 : theme.colors.white};
  width: 4px;
  height: 4px;
  border-radius: 2px;
`;
export default function NumberDay({
  isMarked,
  title,
  onPress,
}: NumberDayProps) {
  return (
    <NumberDayWrapper onPress={onPress}>
      <NumberDayTextWrapper>
        {title >= 1 && title <= 31 ? title : ''}
      </NumberDayTextWrapper>
      <NumberDayMarkWrapper isMarked={isMarked} />
    </NumberDayWrapper>
  );
}
