import TitleHeader from '@/components/molecules/TitleHeader';
import DefaultScreenContainer from '@/styles/Container';
import React from 'react';

export default function SigninScreen() {
  return (
    <DefaultScreenContainer>
      <TitleHeader mainTitle="로그인" subTitle="더 많은 서비스를 누려보세요" />
    </DefaultScreenContainer>
  );
}
