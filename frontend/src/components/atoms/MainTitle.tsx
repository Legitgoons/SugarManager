import React from 'react';
import styled from 'styled-components/native';
import { TypographyType } from '@/styles/theme';

interface MainTitleProps {
  title: string;
  fontSize?: keyof TypographyType;
}

const MainTitleWrapper = styled.Text<{ fontSize: keyof TypographyType }>`
  color: ${({ theme }) => theme.colors.black};
  ${({ fontSize, theme }) => theme.typographys[fontSize]};
`;

export default function MainTitle({ title, fontSize = 'h1b' }: MainTitleProps) {
  return <MainTitleWrapper fontSize={fontSize}>{title}</MainTitleWrapper>;
}
