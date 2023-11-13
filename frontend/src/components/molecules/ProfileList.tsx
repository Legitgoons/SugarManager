/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import { NavigationSliceStateType } from '@/redux/slice/navigationSlice';
import ProfileButton from '../atoms/ProfileButton';

interface ProfileListProps {
  list: Array<{ uid: string; nickname: string; profile_url: string }>;
  person: string;
  setPerson: React.Dispatch<React.SetStateAction<string>>;
  onPress: (props: NavigationSliceStateType) => void;
}

const ProfileListBox = styled.View``;

export default function ProfileList({
  list,
  person,
  setPerson,
  onPress,
}: ProfileListProps) {
  return (
    <ProfileListBox>
      {list.map(({ uid, profile_url: profileUrl, nickname }) => (
        <ProfileButton
          key={uid}
          imgUrl={profileUrl}
          onPress={() => {
            setPerson(nickname);
            onPress({ isMine: false, nickname, uid: Number(uid) });
          }}
          isFocus={person === nickname}
        />
      ))}
    </ProfileListBox>
  );
}
