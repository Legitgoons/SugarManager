import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils';

const DefaultCalendarCard = styled.View<{ size: 'lg' | 'sm' }>`
  width: ${({ size }) => {
    if (size === 'lg') {
      return `${rWidth(320)}px`;
    }
    return `${rWidth(160)}px`;
  }};
  border-radius: ${rHeight(10)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.tertiary};
`;

export default DefaultCalendarCard;
