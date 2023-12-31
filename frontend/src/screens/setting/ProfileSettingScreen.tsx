import { postProfileEdit } from '@/apis';
import ProfileButton from '@/components/atoms/ProfileButton';
import LabelledInput from '@/components/molecules/LabelledInput';
import TextList from '@/components/molecules/TextList';
import TwinButtonGroup from '@/components/molecules/TwinButtonGroup';
import useRouter from '@/hooks/useRouter';
import { selectUser, setProfileSetting } from '@/redux/slice/userSlice';
import { DefaultScreenContainer } from '@/styles';
import DropdownItem from '@/types/dropdown';
import { rHeight, rWidth, showAlert } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import TextButton from '@/components/atoms/TextButton';
import GroupLeaveModal from '@/components/organisms/GroupLeaveModal';
import MemberDeleteModal from '@/components/organisms/MemberDeleteModal';
import alertConfig from '@/config/alertConfig';

const ProfileSettingScreenContainer = styled(DefaultScreenContainer)`
  padding-top: ${rHeight(20)}px;
  padding-bottom: ${rHeight(100)}px;
  background-color: ${({ theme }) => theme.colors.background};
  gap: ${rHeight(32)}px;
  position: relative;
`;
const DownButtonWrapper = styled.View`
  width: ${rWidth(320)}px;
  position: absolute;
  bottom: ${rHeight(10)}px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  gap: 16px;
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
  const router = useRouter();
  const {
    name,
    email,
    nickname,
    gender,
    height,
    weight,
    profileImage,
    birthday,
    bloodSugarMin,
    bloodSugarMax,
    groupCode,
  } = useSelector(selectUser);
  const [userNickname, setUserNickname] = useState(nickname);
  const [userGender, setUserGender] = useState<DropdownItem | null>(
    gender === null
      ? null
      : {
          id: `${gender}`,
          value: `${gender === 'MALE' ? '남자' : '여자'}`,
        }
  );
  const [userHeight, setUserHeight] = useState(height === null ? 0 : height);
  const [userWeight, setUserWeight] = useState(weight === null ? 0 : weight);
  const [userBloodSugarMin, setUserBloodSugarMin] = useState(bloodSugarMin);
  const [userBloodSugarMax, setUserBloodSugarMax] = useState(bloodSugarMax);
  const [openMemberDeleteModal, setOpenMemberDeleteModal] = useState(false);
  const [openGroupLeaveModal, setOpenGroupLeaveModal] = useState(false);
  const { normalSuccess, normalFail } = alertConfig;
  const dispatch = useDispatch();

  function resultFailAlert() {
    showAlert({
      title: normalFail.title('프로필 수정'),
      content: normalFail.content,
      onOk: () => {},
    });
  }

  function resultSuccessAlert() {
    showAlert({
      title: normalSuccess.title('프로필 수정'),
      content: normalSuccess.content('프로필 수정'),
      onOk: () => {},
    });
  }

  const { mutate } = useMutation({
    mutationFn: () =>
      postProfileEdit({
        name,
        birthday,
        height: userHeight,
        weight: userWeight,
        nickname: userNickname,
        gender: (userGender as DropdownItem).id as 'MALE' | 'FEMALE',
        bloodSugarMax: userBloodSugarMax,
        bloodSugarMin: userBloodSugarMin,
      }),
    onSuccess: (data) => {
      if (data.success) {
        dispatch(
          setProfileSetting({
            height: userHeight,
            weight: userWeight,
            nickname: userNickname,
            gender: (userGender as DropdownItem).id as 'MALE' | 'FEMALE',
            bloodSugarMax: userBloodSugarMax,
            bloodSugarMin: userBloodSugarMin,
          })
        );
        resultSuccessAlert();
        return;
      }
      resultFailAlert();
    },
    onError: () => {
      resultFailAlert();
    },
  });

  const handleEditProfile = () => mutate();
  return (
    <ScrollView>
      {openMemberDeleteModal && (
        <MemberDeleteModal
          open={openMemberDeleteModal}
          setOpen={setOpenMemberDeleteModal}
        />
      )}
      {groupCode && groupCode.length > 0 && openGroupLeaveModal && (
        <GroupLeaveModal
          open={openGroupLeaveModal}
          setOpen={setOpenGroupLeaveModal}
        />
      )}
      <ProfileSettingScreenContainer>
        <HeaderBox>
          <ProfileButton
            imgUrl={profileImage}
            onPress={() => {}}
            isFocus={false}
            width={120}
            height={120}
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
            inputType="inputLine"
            inputProps={{
              placeholder: '입력해주세요',
              value: userNickname,
              onChangeText: setUserNickname,
              width: 200,
            }}
          />
          <LabelledInput
            label="성별"
            inputType="dropdown"
            DropdownProps={{
              placeholder: '입력해주세요',
              list: [
                { id: 'MALE', value: '남자' },
                { id: 'FEMALE', value: '여자' },
              ],
              selectItem: userGender,
              setSelectItem: setUserGender,
            }}
          />
          <LabelledInput
            label="키"
            inputType="inputLine"
            inputProps={{
              placeholder: '입력해주세요',
              value: userHeight,
              onChangeText: setUserHeight,
              keyboardType: 'numeric',
              width: 200,
              unit: 'cm',
            }}
          />
          <LabelledInput
            label="몸무게"
            inputType="inputLine"
            inputProps={{
              placeholder: '입력해주세요',
              value: userWeight,
              onChangeText: setUserWeight,
              keyboardType: 'numeric',
              width: 200,
              unit: 'kg',
            }}
          />
          <LabelledInput
            label="최소 혈당"
            inputType="inputLine"
            inputProps={{
              placeholder: '입력해주세요',
              value: userBloodSugarMin,
              onChangeText: setUserBloodSugarMin,
              keyboardType: 'numeric',
              width: 200,
              unit: 'mg/dL',
            }}
          />
          <LabelledInput
            label="최대 혈당"
            inputType="inputLine"
            inputProps={{
              placeholder: '입력해주세요',
              value: userBloodSugarMax,
              onChangeText: setUserBloodSugarMax,
              keyboardType: 'numeric',
              width: 200,
              unit: 'mg/dL',
            }}
          />
          <LabelledInput
            label="그룹코드"
            inputType="copyInput"
            inputProps={{
              placeholder: '입력해주세요',
              value: groupCode !== null ? groupCode : '그룹에 가입해주세요',
              width: 200,
              editable: false,
            }}
          />
        </ContentBox>
        <TwinButtonGroup
          leftTitle="뒤로가기"
          rightTitle="저장하기"
          onLeftPress={() => router.pop()}
          onRightPress={handleEditProfile}
        />
        <DownButtonWrapper>
          <TextButton
            isSelected={false}
            onPress={() => {
              setOpenGroupLeaveModal(true);
            }}
            title="그룹 탈퇴"
            mode="toggle"
            typography="captionr"
            color="secondary"
          />
          <TextButton
            isSelected={false}
            onPress={() => {
              setOpenMemberDeleteModal(true);
            }}
            title="회원 탈퇴"
            mode="toggle"
            typography="captionr"
            color="secondary"
          />
        </DownButtonWrapper>
      </ProfileSettingScreenContainer>
    </ScrollView>
  );
}
