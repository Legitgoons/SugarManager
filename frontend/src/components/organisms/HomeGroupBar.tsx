import { rHeight, rWidth } from '@/utils';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/redux/slice/userSlice';
import {
  NavigationSliceStateType,
  setNavigation,
} from '@/redux/slice/navigationSlice';
import { useSuspenseQuery } from '@tanstack/react-query';
import getGroup from '@/apis/group';
import ProfileList from '../molecules/ProfileList';
import ProfileButton from '../atoms/ProfileButton';

const HomeGroupBarBox = styled.View`
  width: ${rWidth(320)}px;
  height: ${rHeight(80)}px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${rWidth(16)}px;
`;

const MidLine = styled.View`
  width: ${rWidth(2)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: ${rHeight(40)}px;
  border-radius: ${rHeight(20)}px;
`;

export default function HomeGroupBar() {
  const { data } = useSuspenseQuery({
    queryKey: ['getGroupList'],
    queryFn: () => getGroup(),
    staleTime: 1000 * 60 * 100,
    refetchOnWindowFocus: false,
  });
  const { response } = data;
  const {
    profileImg,
    nickname: myNickname,
    uid: myUid,
  } = useSelector(selectUser);
  const [selectPerson, setSelectPerson] = useState<string>('');
  const dispatch = useDispatch();
  const handleClickProfile = ({
    isMine,
    nickname,
    uid,
  }: NavigationSliceStateType) => {
    dispatch(
      setNavigation({
        nickname,
        isMine,
        uid,
      })
    );
  };
  return (
    <HomeGroupBarBox>
      <ProfileButton
        imgUrl={profileImg}
        onPress={() =>
          handleClickProfile({ isMine: true, nickname: myNickname, uid: myUid })
        }
        isFocus={selectPerson === myNickname}
      />
      <MidLine />
      <ProfileList
        onPress={handleClickProfile}
        list={response}
        person={selectPerson}
        setPerson={setSelectPerson}
      />
    </HomeGroupBarBox>
  );
}
