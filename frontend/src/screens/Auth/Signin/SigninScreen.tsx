import OAuthButton from '@/components/atoms/OAuthButton';
import TitleHeader from '@/components/molecules/TitleHeader';
import DefaultScreenContainer from '@/styles/Container';
import React from 'react';
import KakaoIcon from '@/assets/icon/kakaoIcon.svg';
import styled from 'styled-components/native';
import { login } from '@react-native-seoul/kakao-login';
import postKakaoSignin from '@/apis/auth';
import { setIsSignin, setKakaoToken, setToken } from '@/redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import showAlert from '@/utils/alert';
import { RootStackParam } from '@/types/navigation';
import { rHeight } from '@/utils/style';

const SigninScreenContainer = styled(DefaultScreenContainer)`
  justify-content: flex-start;
  padding-top: 10%;
  gap: ${rHeight(36)}px;
`;

export default function SigninScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const signInWithKakao = async () => {
    try {
      const { accessToken: kakaoAccessToken, refreshToken: kakaoRefreshToken } =
        await login();

      dispatch(
        setKakaoToken({
          kakaoAccessToken,
          kakaoRefreshToken,
        })
      );

      const apiRes: any = await postKakaoSignin({
        accessToken: kakaoAccessToken,
        fcmToken: '1234',
      });

      if (apiRes.data.error === null) {
        const { accessToken, refreshToken } = apiRes.data.response;
        dispatch(
          setToken({
            accessToken,
            refreshToken,
          })
        );
        dispatch(setIsSignin(true));
        navigation.navigate('Home');
      } else {
        showAlert({
          title: '로그인 실패',
          content: apiRes.data.error.message,
          onOk: () => {},
        });
      }

      return apiRes;
    } catch (e) {
      showAlert({
        title: '로그인 실패',
        content: '네트워크 상태를 다시 확인해주세요!',
        onOk: () => {},
      });
      return e;
    }
  };

  return (
    <SigninScreenContainer>
      <TitleHeader mainTitle="로그인" subTitle="더 많은 서비스를 누려보세요" />
      <OAuthButton
        title="카카오로 로그인하기"
        bgColor="white"
        OAuthIcon={KakaoIcon}
        onPress={signInWithKakao}
      />
    </SigninScreenContainer>
  );
}
