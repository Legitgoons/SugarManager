import styled from 'styled-components/native';
import { rHeight } from '@/utils';
import DefaultButtonProps from '../types/pressable';

const DefaultPressable = styled.Pressable<DefaultButtonProps>`
  border-radius: ${rHeight(10)}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({ theme, borderColor }) =>
    borderColor && `border-color: ${theme.colors[borderColor]};`}
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme.colors[bgColor] : theme.colors.white};
`;

export default DefaultPressable;
