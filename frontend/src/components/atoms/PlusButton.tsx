import React from 'react';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';

interface PlusButtonProps extends DefaultPressableProps {}

const PlusButtonBox = styled.Pressable`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonTitleWrapper = styled.Text`
  ${({ theme }) => theme.typography.h3b};
`;

export default function PlusButton({ onPress }: PlusButtonProps) {
  return (
    <PlusButtonBox onPress={onPress}>
      <ButtonTitleWrapper>+</ButtonTitleWrapper>
    </PlusButtonBox>
  );
}
