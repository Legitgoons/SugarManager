import styled from 'styled-components/native';

const DefaultScreenContainer = styled.View`
  flex: 1;
  justify-content: start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default DefaultScreenContainer;
