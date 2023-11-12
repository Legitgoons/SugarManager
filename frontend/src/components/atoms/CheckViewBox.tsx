import React from 'react';
import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils';

// 체크박스 스타일
const CheckViewBoxContainer = styled.Pressable`
  width: ${rWidth(20)}px;
  height: ${rHeight(20)}px;
  border-radius: ${rHeight(10)}px; // 원형 체크박스를 만들기 위해 20px의 절반
  border: ${rHeight(2)}px solid ${({ theme }) => theme.colors.b4}; // 파란색 테두리
  align-items: center;
  justify-content: center;
`;

const CheckedViewIndicator = styled.View`
  width: ${rWidth(16)}px;
  height: ${rHeight(16)}px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.b4};
`;

interface CheckViewBoxProps {
  isChecked: boolean;
  onPress: () => void;
}
function CheckViewBox({ isChecked, onPress }: CheckViewBoxProps) {
  return (
    <CheckViewBoxContainer onPress={onPress}>
      {isChecked && <CheckedViewIndicator />}
    </CheckViewBoxContainer>
  );
}

export default CheckViewBox;
