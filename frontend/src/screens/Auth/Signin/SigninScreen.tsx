import React, { useState } from 'react';
import OAuthButton from '@/components/atoms/OAuthButton';
import TitleHeader from '@/components/molecules/TitleHeader';
import { DefaultScreenContainer } from '@/styles';
import KakaoIcon from '@/assets/icon/kakaoIcon.svg';
import styled from 'styled-components/native';
import {
  rHeight,
  rWidth,
  showAlert,
  validationId,
  validationPw,
} from '@/utils';
import TextButton from '@/components/atoms/TextButton';
import InputLine from '@/components/molecules/InputLine';
import MainFillButton from '@/components/atoms/MainFillButton';
import Line from '@/components/atoms/Line';
import useRouter from '@/hooks/useRouter';
import useAuth from '@/hooks/useSignin';

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
  const router = useRouter();
  const { signInWithKakao, signIn } = useAuth();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleSignIn = async () => {
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
    await signIn(id, pw);
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
        <MainFillButton
          title="로그인 하기"
          bgColor="b4"
          onPress={handleSignIn}
        />
      </SigninBox>
      <TextButton
        title="회원가입 하러가기"
        isSelected
        mode="toggle"
        onPress={() => router.navigate('Signup')}
        typography="captionr"
      />
    </SigninScreenContainer>
  );
}
