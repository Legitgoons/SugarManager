/* eslint-disable camelcase */
import OAuthButton from '@/components/atoms/OAuthButton';
import TitleHeader from '@/components/molecules/TitleHeader';
import DefaultScreenContainer from '@/styles/Container';
import React from 'react';
import KakaoIcon from '@/assets/icon/kakaoIcon.svg';
import styled from 'styled-components/native';
import { login } from '@react-native-seoul/kakao-login';
import { postKakaoSignin } from '@/apis/auth';
import { setKakaoToken, setProfile, setToken } from '@/redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import showAlert from '@/utils/alert';
import { rHeight } from '@/utils/style';
import getMyProfile from '@/apis/member';
import useRouter from '@/hooks/useRouter';

const SigninScreenContainer = styled(DefaultScreenContainer)`
  justify-content: flex-start;
  padding-top: 10%;
  gap: ${rHeight(36)}px;
`;

export default function SigninScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
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
        access_token: kakaoAccessToken,
        fcm_token: '1234',
      });
      if (apiRes.error === null) {
        const { access_token, refresh_token } = apiRes.response;
        dispatch(
          setToken({
            accessToken: access_token,
            refreshToken: refresh_token,
          })
        );
      } else {
        showAlert({
          title: '로그인 실패',
          content: apiRes.error.message,
          onOk: () => {},
        });
      }

      const myProfile = await getMyProfile();
      if (myProfile.error === null) {
        dispatch(setProfile({ ...myProfile.response }));
        router.navigate('Home');
      } else {
        showAlert({
          title: '로그인 실패',
          content: myProfile.error.message,
          onOk: () => {},
        });
      }

      return null;
    } catch (e) {
      console.log(e);
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
