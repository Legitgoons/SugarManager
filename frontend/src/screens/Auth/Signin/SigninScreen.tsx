import OAuthButton from '@/components/atoms/OAuthButton';
import TitleHeader from '@/components/molecules/TitleHeader';
import { DefaultScreenContainer } from '@/styles';
import React, { useState } from 'react';
import KakaoIcon from '@/assets/icon/kakaoIcon.svg';
import styled from 'styled-components/native';
import { login } from '@react-native-seoul/kakao-login';
import { postKakaoSignin } from '@/apis/auth';
import { setKakaoToken, setProfile, setToken } from '@/redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import showAlert from '@/utils/alert';
import { rHeight, rWidth, validationId, validationPw } from '@/utils';
import { getMyProfile } from '@/apis/member';
import useRouter from '@/hooks/useRouter';
import { setNavigation } from '@/redux/slice/navigationSlice';
import TextButton from '@/components/atoms/TextButton';
import InputLine from '@/components/molecules/InputLine';
import MainFillButton from '@/components/atoms/MainFillButton';
import { PostSignin } from '@/apis';
import Line from '@/components/atoms/Line';
import { API_ENDPOINT } from '@env';

const SigninScreenContainer = styled(DefaultScreenContainer)`
  justify-content: flex-start;
  padding-top: 10%;
  gap: ${rHeight(40)}px;
`;

const SigninBox = styled.View`
  gap: ${rHeight(20)}px;
`;

const LineWrapper = styled.View`
  width: ${rHeight(320)}px;
`;

export default function SigninScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
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
        content: `${API_ENDPOINT} 맞는데여? ${e}`,
        onOk: () => {},
      });
      return e;
    }
  };

  const signIn = async () => {
    if (!validationId(id)) {
      showAlert({
        title: '아이디 입력 오류',
        content:
          '아이디는 영문, 소문자, 숫자 가능, 특수문자 불가능하며 6자 이상 320자 이하입니다.',
        onOk: () => {},
      });
      return;
    }
    if (!validationPw(pw)) {
      showAlert({
        title: '비밀번호 입력 오류',
        content:
          '비밀번호는 영문, 대문자, 소문자, 숫자, 특수 문자가 포함되며 8자 이상 20자 이하입니다.',
        onOk: () => {},
      });
      return;
    }
    try {
      const apiRes: any = await PostSignin({
        id,
        pw,
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
    } catch (e) {
      showAlert({
        title: '로그인 실패',
        content: `네트워크 상태를 다시 확인해주세요!`,
        onOk: () => {},
      });
    }
  };

  return (
    <SigninScreenContainer>
      <TitleHeader mainTitle="로그인" subTitle="더 많은 서비스를 누려보세요" />
      <OAuthButton
        title="카카오로 로그인하기"
        bgColor="kakao"
        OAuthIcon={KakaoIcon}
        onPress={signInWithKakao}
      />
      <LineWrapper>
        <Line color="tertiary" />
      </LineWrapper>
      <SigninBox>
        <InputLine
          value={id}
          onChangeText={setId}
          placeholder="아이디를 입력하세요"
          width={rWidth(320)}
        />
        <InputLine
          value={pw}
          onChangeText={setPw}
          placeholder="비밀번호를 입력하세요"
          width={rWidth(320)}
        />
        <MainFillButton title="로그인 하기" bgColor="b4" onPress={signIn} />
      </SigninBox>
      <TextButton
        title="회원가입 하러가기"
        isSelected
        onPress={() => {
          router.navigate('Signup');
        }}
      />
    </SigninScreenContainer>
  );
}
