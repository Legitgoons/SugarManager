import React from 'react';
import styled from 'styled-components/native';
import useRouter from '@/hooks/useRouter';
import MainFillButton from '@/components/atoms/MainFillButton';
import { DefaultScreenContainer, DefaultText } from '@/styles';
import { Image } from 'react-native';
import { rHeight, rWidth } from '@/utils';
import MainTitle from '@/components/atoms/MainTitle';
import errorImg from '@/assets/img/error.png';

const ErrorScreenContainer = styled(DefaultScreenContainer)`
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  gap: ${rHeight(60)}px;
`;

const TitleWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled(DefaultText)``;

export default function ErrorScreen() {
  const router = useRouter();
  return (
    <ErrorScreenContainer>
      <TitleWrapper>
        <MainTitle title="죄송합니다. 에러가 발생했어요." fontSize="h3b" />
        <ErrorMessage typography="p2r" color="black">
          홈 페이지로 이동해주세요.
        </ErrorMessage>
      </TitleWrapper>
      <Image
        source={errorImg}
        style={{ width: rWidth(200), height: rHeight(200) }}
      />
      <MainFillButton
        title="홈 페이지로 가기"
        onPress={() => {
          router.navigate('Home');
        }}
        bgColor="b4"
      />
    </ErrorScreenContainer>
  );
}
