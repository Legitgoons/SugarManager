import DefaultText from '@/styles/Text';
import React from 'react';
import styled from 'styled-components/native';
import Dropdown from '@/assets/icon/BlackHambugerIcon.svg';
import { rHeight, rWidth } from '@/utils/style';

const HeaderLogoWrapper = styled(DefaultText)``;

const HomeHeaderBox = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function HomeHeader() {
  return (
    <HomeHeaderBox>
      <HeaderLogoWrapper color="b4" typography="t3">
        관리하당
      </HeaderLogoWrapper>
      <Dropdown width={rWidth(20)} height={rHeight(20)} />
    </HomeHeaderBox>
  );
}
