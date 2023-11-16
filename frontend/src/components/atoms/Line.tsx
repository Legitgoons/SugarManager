import { ColorType } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components/native';

const LineWrapper = styled.View<{ color: keyof ColorType }>`
  width: 100%;
  height: 1px;
  background-color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.secondary};
`;

/**
 * @returns {JSX.Element} secondary color색의 Line Component
 */
interface LineProps {
  color?: keyof ColorType;
}
export default function Line({ color = 'secondary' }: LineProps) {
  return <LineWrapper color={color} />;
}
