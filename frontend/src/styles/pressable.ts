import styled from 'styled-components/native';
import { rHeight } from '@/utils/style';
import DefaultButtonProps from '../types/pressable';

const DefaultPressable = styled.Pressable<DefaultButtonProps>`
  border-radius: ${rHeight(10)}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${(props) => props.borderColor && `border-color: ${props.borderColor};`}
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme.colors[bgColor] : theme.colors.white};
`;

export default DefaultPressable;
