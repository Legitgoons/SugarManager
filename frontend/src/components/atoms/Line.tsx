import React from 'react';
import styled from 'styled-components/native';

const LineWrapper = styled.View`
  width: 100%;
  height: 1px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

/**
 * @returns {JSX.Element} secondary color색의 Line Component
 */

export default function Line() {
  return <LineWrapper />;
}
