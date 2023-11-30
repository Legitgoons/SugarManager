import React, { useState } from 'react';
import styled from 'styled-components/native';
import { DefaultText } from '@/styles';
import { rHeight, rWidth, showAlert } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { postGroupLeave } from '@/apis';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setGroupCode } from '@/redux/slice/userSlice';
import alertConfig from '@/config/alertConfig';
import DefaultModal from './DefaultModal';
import InputLine from '../molecules/InputLine';

const ContentBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${rHeight(32)}px;
`;

interface GroupLeaveModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GroupLeaveModal({
  open,
  setOpen,
}: GroupLeaveModalProps) {
  const [inputNickname, setInputNickname] = useState('');
  const { nickname } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { normalSuccess, normalFail, validationFail } = alertConfig;

  const { mutate } = useMutation({
    mutationFn: () => postGroupLeave(),
    onSuccess: async () => {
      showAlert({
        title: normalSuccess.title('그룹 탈퇴'),
        content: normalSuccess.content('그룹 탈퇴'),
        onOk: () => {},
      });
      dispatch(setGroupCode(''));
      setOpen(false);
    },
    onError: () => {
      showAlert({
        title: normalFail.title('그룹 탈퇴'),
        content: normalFail.content,
        onOk: () => {},
      });
    },
  });
  const handleLeaveGroup = () => {
    if (nickname !== inputNickname) {
      showAlert({
        title: validationFail.title('닉네임 입력'),
        content: validationFail.content('common'),
        onOk: () => {},
      });
      return;
    }
    mutate();
  };

  return (
    <DefaultModal
      modalVisible={open}
      setModalVisible={setOpen}
      mainTitle="그룹 탈퇴"
      leftBtnTitle="뒤로가기"
      onLeftPress={() => {
        setOpen(false);
      }}
      rightBtnTitle="탈퇴하기"
      onRightPress={handleLeaveGroup}
    >
      <ContentBox>
        <DefaultText typography="captionb" color="black">
          그룹 탈퇴를 하고 싶으시다면, 아래에 닉네임을 입력해주세요.
        </DefaultText>
        <InputLine
          value={inputNickname}
          onChangeText={setInputNickname}
          placeholder="닉네임"
          width={rWidth(320)}
        />
      </ContentBox>
    </DefaultModal>
  );
}
