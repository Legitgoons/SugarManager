import { DefaultText } from '@/styles';
import React from 'react';
import styled from 'styled-components/native';
import { ColorType, TypographyType } from '@/styles/theme';

interface TextListProps {
  list: Array<string>;
  typography: keyof TypographyType;
  color: keyof ColorType;
}

const TextListBox = styled.View`
  justify-content: center;
  align-items: center;
`;
export default function TextList({ list, typography, color }: TextListProps) {
  return (
    <TextListBox>
      {list.map((cur) => (
        <DefaultText typography={typography} color={color}>
          {cur}
        </DefaultText>
      ))}
    </TextListBox>
  );
}
