import React from 'react';
import styled from 'styled-components/native';
import { TypographyType } from '@/styles/theme';

interface SubTitleProps {
  title: string;
  fontSize?: keyof TypographyType;
}

const SubTitleWrapper = styled.Text<{ fontSize: keyof TypographyType }>`
  color: ${({ theme }) => theme.colors.secondary};
  ${({ fontSize, theme }) => theme.typographys[fontSize]};
`;

export default function SubTitle({ title, fontSize = 'h4r' }: SubTitleProps) {
  return <SubTitleWrapper fontSize={fontSize}>{title}</SubTitleWrapper>;
}
