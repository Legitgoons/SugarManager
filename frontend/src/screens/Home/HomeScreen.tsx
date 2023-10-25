import React from 'react';
import styled from 'styled-components/native';

const HomeScreenView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const HomeScreenText = styled.Text`
  color: ${(props) => props.theme.colors.b4};
  ${(props) => props.theme.typography.p3b};
`;
export default function HomeScreen() {
  return (
    <HomeScreenView>
      <HomeScreenText>Home Screen</HomeScreenText>
    </HomeScreenView>
  );
}
