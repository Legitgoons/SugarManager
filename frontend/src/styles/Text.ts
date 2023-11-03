import { ColorType, TypographyType } from '@/styles/theme';
import styled from 'styled-components/native';

interface DefaultTextProps {
  color: keyof ColorType;
  typography: keyof TypographyType;
}

const DefaultText = styled.Text<DefaultTextProps>`
  ${({ color, theme }) => theme.colors[color]};
  ${({ typography, theme }) => theme.typographys[typography]};
`;

export default DefaultText;
