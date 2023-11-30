import { DefaultText } from '@/styles';
import React from 'react';
import styled from 'styled-components/native';
import { rWidth } from '@/utils';
import { HomeDropdownItem } from '@/types/homeDropdown';
import { persistor } from '@/redux/store/storeConfig';
import useRouter from '@/hooks/useRouter';
import HomeDropDown from '../molecules/HomeDropdown';

const HeaderLogoWrapper = styled(DefaultText)``;

const HomeHeaderBox = styled.View`
  width: ${rWidth(320)}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export default function HomeHeader() {
  const homeDropdownItemList: HomeDropdownItem[] = [
    { name: '계정 관리', link: 'Profile' },
    { name: '알람 설정', link: 'Alarm' },
  ];
  const router = useRouter();
  const handleSignOut = async () => {
    await persistor.purge();
    router.reset({
      index: 0,
      routes: [{ name: 'Signin' }],
    });
  };
  return (
    <HomeHeaderBox>
      <HeaderLogoWrapper color="b4" typography="t3">
        관리하당
      </HeaderLogoWrapper>
      <HomeDropDown items={homeDropdownItemList} signOut={handleSignOut} />
    </HomeHeaderBox>
  );
}
