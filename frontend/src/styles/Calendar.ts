import styled from 'styled-components/native';

const DefaultCalendarCard = styled.View`
  width: 320px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.tertiary};
`;

export default DefaultCalendarCard;
