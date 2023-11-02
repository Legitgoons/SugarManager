import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, SigninScreen } from '@/screens';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slice/userSlice';
import Spinner from '@/components/organisms/Spinner';

function SuspenseSigninScreen() {
  return (
    <Suspense fallback={<Spinner />}>
      <SigninScreen />
    </Suspense>
  );
}
function SuspenseHomeScreen() {
  return (
    <Suspense fallback={<Spinner />}>
      <HomeScreen />
    </Suspense>
  );
}

export default function Navigation({ Stack }: { Stack: any }) {
  const { isSignin } = useSelector(selectUser);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignin ? (
          <Stack.Screen name="Home" component={SuspenseHomeScreen} />
        ) : (
          <Stack.Screen
            name="Signin"
            component={SuspenseSigninScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
