import styled from 'styled-components/native';
import DefaultButtonProps from '../types/pressable';

const DefaultPressable = styled.Pressable<DefaultButtonProps>`
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${(props) => props.borderColor && `border-color: ${props.borderColor};`}
  background-color: ${(props) => props.bgColor || props.theme.colors.white};
`;

export default DefaultPressable;
