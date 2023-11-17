import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  HomeScreen,
  SigninScreen,
  SignupScreen,
  ChallengeScreen,
  ChallengeDetailScreen,
  ChallengeMakeScreen,
  BloodSugarScreen,
  BloodSugarWriteScreen,
  ProfileSettingScreen,
  AlarmSettingScreen,
  MealScreen,
  MealWriteScreen,
  ErrorScreen,
} from '@/screens';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slice/userSlice';
import Spinner from '@/components/organisms/Spinner';
import ErrorBoundary from 'react-native-error-boundary';

function BoundaryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
function SuspenseSigninScreen() {
  return (
    <BoundaryWrapper>
      <SigninScreen />
    </BoundaryWrapper>
  );
}

function SuspenseSignupScreen() {
  return (
    <BoundaryWrapper>
      <SignupScreen />
    </BoundaryWrapper>
  );
}

function SuspenseHomeScreen() {
  return (
    <BoundaryWrapper>
      <HomeScreen />
    </BoundaryWrapper>
  );
}

function SuspenseChallengeScreen() {
  return (
    <BoundaryWrapper>
      <ChallengeScreen />
    </BoundaryWrapper>
  );
}

function SuspenseChallengeDetailScreen() {
  return (
    <BoundaryWrapper>
      <ChallengeDetailScreen />
    </BoundaryWrapper>
  );
}

function SuspenseChallengeMakeScreen() {
  return (
    <BoundaryWrapper>
      <ChallengeMakeScreen />
    </BoundaryWrapper>
  );
}

function SuspenseAlarmSettingScreen() {
  return (
    <BoundaryWrapper>
      <AlarmSettingScreen />
    </BoundaryWrapper>
  );
}

function SuspenseBloodSugarScreen() {
  return (
    <BoundaryWrapper>
      <BloodSugarScreen />
    </BoundaryWrapper>
  );
}

function SuspenseBloodSugarWriteScreen() {
  return (
    <BoundaryWrapper>
      <BloodSugarWriteScreen />
    </BoundaryWrapper>
  );
}

function SuspenseProfileSettingScreen() {
  return (
    <BoundaryWrapper>
      <ProfileSettingScreen />
    </BoundaryWrapper>
  );
}

function SuspenseMealScreen() {
  return (
    <Suspense fallback={<Spinner />}>
      <MealScreen />
    </Suspense>
  );
}

function SuspenseMealWriteScreen() {
  return (
    <Suspense fallback={<Spinner />}>
      <MealWriteScreen />
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
            <Stack.Screen
              name="Alarm"
              component={SuspenseAlarmSettingScreen}
              options={{ title: '알람 설정', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="BloodSugar"
              component={SuspenseBloodSugarScreen}
              options={{ title: '혈당 정보', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="BloodSugarWrite"
              component={SuspenseBloodSugarWriteScreen}
              options={{
                title: '혈당 정보 작성 ',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Profile"
              component={SuspenseProfileSettingScreen}
              options={{ title: '계정 설정', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="Meal"
              component={SuspenseMealScreen}
              options={{ title: '식사 기록', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="MealWrite"
              component={SuspenseMealWriteScreen}
              options={{ title: '식사 기록 작성', headerTitleAlign: 'center' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Signin"
              component={SuspenseSigninScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SuspenseSignupScreen}
              options={{ title: '회원가입', headerTitleAlign: 'center' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
