import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils';

const DefaultCard = styled.Pressable<{ size: 'lg' | 'md' | 'sm' }>`
  width: ${rWidth(320)}px;
  height: ${(props) => {
    if (props.size === 'lg') {
      return `${rWidth(120)}px`;
    }
    if (props.size === 'md') {
      return `${rHeight(90)}px`;
    }
    return `${rHeight(60)}px`;
  }};
  border-radius: ${rHeight(8)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.white};
`;

export default DefaultCard;
