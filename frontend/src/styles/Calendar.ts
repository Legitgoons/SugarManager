import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils';

const DefaultCalendarCard = styled.View`
  width: ${rWidth(320)}px;
  border-radius: ${rHeight(8)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.tertiary};
`;

export default DefaultCalendarCard;
