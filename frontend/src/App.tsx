import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import theme from './styles/theme';
import { persistor, store } from './redux/store/storeConfig';
import Navigation from './navigation/Navigation';
import { showAlert } from './utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: false,
    },
  },
});
const Stack = createNativeStackNavigator();
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); // 스플래시 활성화 시간
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      showAlert({
        title: '알람 등록 성공',
        content: JSON.stringify(remoteMessage),
        onOk: () => {},
      });
    });

    return unsubscribe;
  });
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Navigation Stack={Stack} />
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </ThemeProvider>
  );
}
