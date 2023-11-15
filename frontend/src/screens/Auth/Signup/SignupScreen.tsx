import { PostSignup } from '@/apis';
import MainFillButton from '@/components/atoms/MainFillButton';
import InputLine from '@/components/molecules/InputLine';
import useRouter from '@/hooks/useRouter';
import { DefaultScreenContainer } from '@/styles';
import {
  showAlert,
  validateEmail,
  validationPw,
  validationId,
  rHeight,
} from '@/utils';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

const SignupScreenContainer = styled(DefaultScreenContainer)`
  padding-top: ${rHeight(60)}px;
  height: 100%;
  gap: ${rHeight(20)}px;
  position: relative;
`;

const DownButtonWrapper = styled.View`
  position: absolute;
  bottom: ${rHeight(30)}px;
  align-items: center;
`;

export default function SignupScreen() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const { mutate } = useMutation({
    mutationFn: () =>
      PostSignup({
        id,
        pw,
        name,
        nickname,
        email,
        fcmToken: '12345',
      }),
    onSuccess: () => {
      showAlert({
        title: '회원가입 성공',
        content: '회원가입에 성공했습니다! 로그인 해주세요.',
        onOk: () => {},
      });
      router.replace('Signin');
    },
    onError: () => {
      showAlert({
        title: '회원가입 실패',
        content: '에러가 발생했습니다. 다시 시도해주세요!',
        onOk: () => {},
      });
    },
  });
  const handleSignup = () => {
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
    if (name.length === 0) {
      showAlert({
        title: '회원가입 실패',
        content: '이름을 제대로 넣어주세요',
        onOk: () => {},
      });
      return;
    }
    if (nickname.length === 0) {
      showAlert({
        title: '회원가입 실패',
        content: '닉네임을 제대로 넣어주세요',
        onOk: () => {},
      });
      return;
    }
    if (!validateEmail(email)) {
      showAlert({
        title: '회원가입 실패',
        content: '이메일을 제대로 넣어주세요',
        onOk: () => {},
      });
      return;
    }
    mutate();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SignupScreenContainer>
        <InputLine
          value={id}
          onChangeText={setId}
          placeholder="아이디를 입력하세요"
          editable
        />
        <InputLine
          value={pw}
          onChangeText={setPw}
          placeholder="비밀번호를 입력하세요"
        />
        <InputLine
          value={name}
          onChangeText={setName}
          placeholder="이름을 입력하세요"
        />
        <InputLine
          value={nickname}
          onChangeText={setNickname}
          placeholder="닉네임을 입력하세요"
        />
        <InputLine
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력하세요"
        />
        <DownButtonWrapper>
          <MainFillButton
            onPress={handleSignup}
            title="회원가입하기"
            bgColor="b4"
          />
        </DownButtonWrapper>
      </SignupScreenContainer>
    </KeyboardAvoidingView>
  );
}
