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

const DownButtonWrapper = styled.View`
  position: absolute;
  bottom: ${rHeight(30)}px;
  align-items: center;
`;

const ProfileSettingScreenContainer = styled(DefaultScreenContainer)`
  padding-top: ${rHeight(20)}px;
  background-color: ${({ theme }) => theme.colors.background};
  gap: ${rHeight(32)}px;
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
    groupCode,
    profileImage,
    birthday,
    bloodSugarMin,
    bloodSugarMax,
  } = useSelector(selectUser);
  const [userNickname, setUserNickname] = useState(nickname);
  const [userGender, setUserGender] = useState<DropdownItem | null>(
    gender === null
      ? null
      : {
          id: `${gender}`,
          value: `${gender === 'male' ? '남자' : '여자'}`,
        }
  );
  const [userHeight, setUserHeight] = useState(height === null ? 0 : height);
  const [userWeight, setUserWeight] = useState(weight === null ? 0 : weight);
  const [userBloodSugarMin, setUserBloodSugarMin] = useState(bloodSugarMin);
  const [userBloodSugarMax, setUserBloodSugarMax] = useState(bloodSugarMax);
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: () =>
      postProfileEdit({
        name,
        birthday,
        height: userHeight,
        weight: userWeight,
        nickname: userNickname,
        gender: (userGender as DropdownItem).id as 'male' | 'female',
        bloodSugarMax: userBloodSugarMax,
        bloodSugarMin: userBloodSugarMin,
      }),
    onSuccess: () => {
      dispatch(
        setProfileSetting({
          height: userHeight,
          weight: userWeight,
          nickname: userNickname,
          gender: (userGender as DropdownItem).id as 'male' | 'female',
          bloodSugarMax: userBloodSugarMax,
          bloodSugarMin: userBloodSugarMin,
        })
      );
      showAlert({
        title: '수정 성공',
        content: '수정사항을 저장했습니다.',
        onOk: () => {},
      });
    },
    onError: () => {
      showAlert({
        title: '수정 실패',
        content: '네트워크 상태를 확인해주세요',
        onOk: () => {},
      });
    },
  });

  const handleEditProfile = () => {
    mutate();
  };
  return (
    <ScrollView>
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
                { id: 'male', value: '남자' },
                { id: 'female', value: '여자' },
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
            }}
          />
          <LabelledInput
            label="그룹코드"
            inputType="copyInput"
            inputProps={{
              placeholder: '입력해주세요',
              value: groupCode !== null ? groupCode : '그룹에 가입해주세요',
              width: 200,
              editable: true,
            }}
          />
        </ContentBox>
        <DownButtonWrapper>
          <TwinButtonGroup
            leftTitle="뒤로가기"
            rightTitle="저장하기"
            onLeftPress={() => router.pop()}
            onRightPress={handleEditProfile}
          />
        </DownButtonWrapper>
      </ProfileSettingScreenContainer>
    </ScrollView>
  );
}
