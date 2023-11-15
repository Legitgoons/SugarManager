import React, { useState } from 'react';
import styled from 'styled-components/native';
import { DefaultText } from '@/styles';
import { rHeight, showAlert } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { postGroupLeave } from '@/apis';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setGroupCode } from '@/redux/slice/userSlice';
import DefaultModal from './Modal';
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

  const { mutate } = useMutation({
    mutationFn: () => postGroupLeave(),
    onSuccess: async () => {
      showAlert({
        title: '그룹탈퇴 성공',
        content: '그룹 탈퇴에 성공하였습니다.',
        onOk: () => {},
      });
      dispatch(setGroupCode(''));
      setOpen(false);
    },
    onError: () => {
      showAlert({
        title: '그룹탈퇴 실패',
        content: '재시도 혹은 다시 시도해주세요',
        onOk: () => {},
      });
    },
  });
  const handleLeaveGroup = () => {
    if (nickname !== inputNickname) {
      showAlert({
        title: '실패',
        content: '닉네임을 제대로 입력해주세요',
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
      rightBtnTitle="변경하기"
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
