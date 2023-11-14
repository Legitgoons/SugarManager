import ImageUploadButton from '@/components/molecules/ImageUploadButton';
import LabelledInput from '@/components/molecules/LabelledInput';
import TextList from '@/components/molecules/TextList';
import { selectUser } from '@/redux/slice/userSlice';
import { DefaultScreenContainer } from '@/styles';
import { rHeight, rWidth } from '@/utils';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const ProfileSettingScreenContainer = styled(DefaultScreenContainer)`
  background-color: ${({ theme }) => theme.colors.background};
`;
const HeaderBox = styled.View`
  width: ${rWidth(320)}px;
  gap: ${rHeight(8)}px;
  justify-content: center;
  align-items: center;
`;
const ContentBox = styled.View`
  width: ${rWidth(320)}px;
  gap: ${rHeight(20)}px;
  justify-content: center;
  align-items: center;
`;

export default function ProfileSettingScreen() {
  const {
    name,
    email,
    nickname,
    gender,
    height,
    weight,
    groupCode,
    profileImage,
  } = useSelector(selectUser);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  return (
    <ProfileSettingScreenContainer>
      <HeaderBox>
        <ImageUploadButton
          imgUrl={profileImage}
          onPress={() => {
            console.log('됬다!');
          }}
        />
        <TextList
          typography="p2r"
          color="black"
          list={[`이름 : ${name}`, `e-mail : ${email}`]}
        />
      </HeaderBox>
      <ContentBox>
        <LabelledInput
          label="닉네임"
          inputType="input"
          inputProps={{
            placeholder: '닉네임을 입력해주세요',
          }}
        />
      </ContentBox>
    </ProfileSettingScreenContainer>
  );
}
