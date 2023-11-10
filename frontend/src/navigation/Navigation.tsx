import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, SigninScreen } from '@/screens';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slice/userSlice';
import Spinner from '@/components/organisms/Spinner';
import ChallengeScreen from '@/screens/Challenge/ChallengeScreen';
import ChallengeDetailScreen from '@/screens/Challenge/ChallengeDetailScreen';
import ChallengeMakeScreen from '@/screens/Challenge/ChallengeMakeScreen';

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

function SuspenseChallengeScreen() {
  return (
    <Suspense fallback={<Spinner />}>
      <ChallengeScreen />
    </Suspense>
  );
}

function SuspenseChallengeDetailScreen() {
  return (
    <Suspense fallback={<Spinner />}>
      <ChallengeDetailScreen />
    </Suspense>
  );
}

function SuspenseChallengeMakeScreen() {
  return (
    <Suspense fallback={<Spinner />}>
      <ChallengeMakeScreen />
    </Suspense>
  );
}

export default function Navigation({ Stack }: { Stack: any }) {
  const { isSignin } = useSelector(selectUser);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignin ? (
          <>
            <Stack.Screen
              name="Home"
              component={SuspenseHomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ChallengeInfo"
              component={SuspenseChallengeScreen}
              options={{ title: '챌린지 조회', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="ChallengeDetail"
              component={SuspenseChallengeDetailScreen}
              options={{ title: '챌린지 상세', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="ChallengeMake"
              component={SuspenseChallengeMakeScreen}
              options={{ title: '챌린지 생성', headerTitleAlign: 'center' }}
            />
          </>
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
