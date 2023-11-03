import React from 'react';
import styled from 'styled-components/native';

const UnderLineWrapper = styled.View`
  width: 100%;
  height: 1px;
  border: 1px solid ${(props) => props.theme.colors.secondary};
`;

export default function InputUnderLine() {
  return <UnderLineWrapper />;
}
