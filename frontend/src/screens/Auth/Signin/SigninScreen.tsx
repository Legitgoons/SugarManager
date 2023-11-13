import OAuthButton from '@/components/atoms/OAuthButton';
import TitleHeader from '@/components/molecules/TitleHeader';
import { DefaultScreenContainer } from '@/styles';
import React from 'react';
import KakaoIcon from '@/assets/icon/kakaoIcon.svg';
import styled from 'styled-components/native';
import { login } from '@react-native-seoul/kakao-login';
import postKakaoSignin from '@/apis/auth';
import { setKakaoToken, setProfile, setToken } from '@/redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import showAlert from '@/utils/alert';
import { rHeight } from '@/utils';
import { getMyProfile } from '@/apis/member';
import useRouter from '@/hooks/useRouter';
import { setNavigation } from '@/redux/slice/navigationSlice';

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
        accessToken: kakaoAccessToken,
        fcmToken: '1234',
      });
      if (apiRes.error === null) {
        const { accessToken, refreshToken } = apiRes.response;
        dispatch(
          setToken({
            accessToken,
            refreshToken,
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
        dispatch(
          setNavigation({
            isMine: true,
            uid: myProfile.response.uid,
            nickname: myProfile.response.nickname,
          })
        );
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
