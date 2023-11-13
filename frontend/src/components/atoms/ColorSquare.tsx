import React from 'react';
import styled from 'styled-components/native';
import { rWidth, rHeight } from '@/utils/style';
import { ColorSquareProps, colorSquareType } from '@/types/colorSquare';

const ColorSquarexWrapper = styled.View<{
  type: colorSquareType;
}>`
  width: ${rWidth(44)}px;
  height: ${rHeight(44)}px;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    if (props.type === 'safety') {
      return props.theme.colors.b4;
    }
    if (props.type === 'warning') {
      return props.theme.colors.yellow;
    }
    if (props.type === 'danger') {
      return props.theme.colors.red;
    }
    return props.theme.colors.b4;
  }};
`;
const SquareNumWrapper = styled.Text`
  ${({ theme }) => theme.typographys.h3b};
  color: ${({ theme }) => theme.colors.white};
`;

/** ColorSquare Component
 * @param {Number} num Box에서 출력할 숫자
 * @param {'safety' | 'warning' | 'danger'} type 색을 출력하기 위해 입력받을 타입
 * @returns {JSX.Element} 정사각형 Box 컴포넌트
 */

export default function ColorSquare({ num, type }: ColorSquareProps) {
  return (
    <ColorSquarexWrapper type={type}>
      <SquareNumWrapper>{num}</SquareNumWrapper>
    </ColorSquarexWrapper>
  );
}
