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
import alertConfig from '@/config/alertConfig';

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
  const { normalFail, normalSuccess, validationFail } = alertConfig;
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
    onSuccess: (data) => {
      if (data.success) {
        showAlert({
          title: normalSuccess.title('회원가입'),
          content: normalSuccess.content('회원가입'),
          onOk: () => {},
        });
        router.replace('Signin');
      } else {
        showAlert({
          title: normalFail.title('회원가입'),
          content: normalFail.content,
          onOk: () => {},
        });
      }
    },
    onError: () => {
      showAlert({
        title: normalFail.title('회원가입'),
        content: normalFail.content,
        onOk: () => {},
      });
    },
  });
  const handleSignup = () => {
    if (!validationId(id)) {
      showAlert({
        title: validationFail.title('아이디 입력'),
        content: validationFail.content('id'),
        onOk: () => {},
      });
      return;
    }

    if (!validationPw(pw)) {
      showAlert({
        title: validationFail.title('비밀번호 입력'),
        content: validationFail.content('pw'),
        onOk: () => {},
      });
      return;
    }
    if (name.length === 0) {
      showAlert({
        title: validationFail.title('이름 입력'),
        content: validationFail.content('common'),
        onOk: () => {},
      });
      return;
    }
    if (nickname.length < 6) {
      showAlert({
        title: validationFail.title('닉네임 입력'),
        content: validationFail.content('nickname'),
        onOk: () => {},
      });
      return;
    }
    if (!validateEmail(email)) {
      showAlert({
        title: validationFail.title('이메일 입력'),
        content: validationFail.content('common'),
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
