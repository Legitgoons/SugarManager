import { rHeight, rWidth } from '@/utils/style';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slice/userSlice';
import ProfileList from '../molecules/ProfileList';
import ProfileButton from '../atoms/ProfileButton';

const HomeGroupBarBox = styled.View`
  width: 100%;
  height: ${rHeight(80)}px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${rWidth(4)}px;
`;

const MidLine = styled.View`
  width: ${rWidth(2)}px;
  background-color: ${({ theme }) => theme.colors.background};
  height: ${rHeight(40)}px;
  border-radius: ${rHeight(20)}px;
`;

export default function HomeGroupBar() {
  const { profileImg } = useSelector(selectUser);
  const [selectPerson, setSelectPerson] = useState<string>('');
  return (
    <HomeGroupBarBox>
      <ProfileButton imgUrl={profileImg} onPress={() => {}} isFocus />
      <MidLine />
      <ProfileList
        list={[]}
        person={selectPerson}
        setPerson={setSelectPerson}
      />
    </HomeGroupBarBox>
  );
}
