/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import { NavigationSliceStateType } from '@/redux/slice/navigationSlice';
import ProfileButton from '../atoms/ProfileButton';

interface ProfileListProps {
  list: Array<{ uid: string; nickname: string; profileUrl: string }>;
  person: string;
  onPress: (props: NavigationSliceStateType) => void;
}

const ProfileListBox = styled.View``;

export default function ProfileList({
  list,
  person,
  onPress,
}: ProfileListProps) {
  return (
    <ProfileListBox>
      {list.map(({ uid, profileUrl, nickname }) => (
        <ProfileButton
          key={uid}
          imgUrl={profileUrl}
          onPress={() => {
            onPress({ isMine: false, nickname, uid: Number(uid) });
          }}
          isFocus={person === nickname}
        />
      ))}
    </ProfileListBox>
  );
}
