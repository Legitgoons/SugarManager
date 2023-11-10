import React from 'react';
import styled from 'styled-components/native';
import ProfileButton from '../atoms/ProfileButton';

interface ProfileListProps {
  list: Array<{ uid: string; nickname: string; profile_url: string }>;
  person: string;
  setPerson: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileListBox = styled.View``;

export default function ProfileList({
  list,
  person,
  setPerson,
}: ProfileListProps) {
  const handleSelectPerson = (uid: string) => setPerson(uid);
  return (
    <ProfileListBox>
      {list.map(({ uid, profile_url: profileUrl }) => (
        <ProfileButton
          key={uid}
          imgUrl={profileUrl}
          onPress={() => {
            handleSelectPerson(uid);
          }}
          isFocus={person === uid}
        />
      ))}
    </ProfileListBox>
  );
}
