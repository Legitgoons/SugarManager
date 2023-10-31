import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
// import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen from 'react-native-splash-screen';
import theme from './styles/theme';
// import { persistor, store } from './redux/store/storeConfig';
import HomeScreen from './screens/Home/HomeScreen';

/* @Todo : 현재, Slice가 없어서 ReduxProvider의 Store를 넣는 부분이 에러가 나서 임시 주석 처리했음.
 * 추후 Store 변동 시, 해당 주석 제거 필요!
 *
 */
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); // 스플래시 활성화 시간
  });
  return (
    <ThemeProvider theme={theme}>
      {/* <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}> */}
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
      {/* </PersistGate>
      </ReduxProvider> */}
    </ThemeProvider>
  );
}
