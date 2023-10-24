import React from 'react';
import type { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const SectionContainer = styled.View`
  margin-top: 32px;
  padding-horizontal: 24px;
`;

const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${(props: { isDarkMode: boolean }) =>
    props.isDarkMode ? Colors.white : Colors.black};
`;

const SectionDescription = styled.Text`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 400;
  color: ${(props: { isDarkMode: boolean }) =>
    props.isDarkMode ? Colors.light : Colors.dark};
`;

const Highlight = styled.Text`
  font-weight: 700;
`;

const MainText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 10px;
  color: red;
`;

function Section({ children, title }: SectionProps) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SectionContainer>
      <SectionTitle isDarkMode={isDarkMode}>{title}</SectionTitle>
      <SectionDescription isDarkMode={isDarkMode}>
        {children}
      </SectionDescription>
    </SectionContainer>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Section title="Step One">
            Edit <Highlight>App.tsx</Highlight>.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
          <MainText>This is a main text.</MainText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
