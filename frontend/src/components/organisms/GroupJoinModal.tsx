import React, { useState } from 'react';
import styled from 'styled-components/native';
import { DefaultText } from '@/styles';
import { rHeight, rWidth, showAlert } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { postGroupJoin } from '@/apis';
import { useDispatch } from 'react-redux';
import { setGroupCode } from '@/redux/slice/userSlice';
import alertConfig from '@/config/alertConfig';
import DefaultModal from './DefaultModal';
import InputLine from '../molecules/InputLine';

const ContentBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${rHeight(32)}px;
`;

interface GroupJoinModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GroupJoinModal({ open, setOpen }: GroupJoinModalProps) {
  const [inputGroupCode, setInputGroupCode] = useState('');
  const dispatch = useDispatch();
  const { normalSuccess, normalFail, validationFail } = alertConfig;

  const { mutate } = useMutation({
    mutationFn: () => postGroupJoin(inputGroupCode),
    onSuccess: async () => {
      showAlert({
        title: normalSuccess.title('그룹 가입'),
        content: normalSuccess.content('그룹 가입'),
        onOk: () => {},
      });
      dispatch(setGroupCode(inputGroupCode));
      setOpen(false);
    },
    onError: () => {
      showAlert({
        title: normalFail.title('그룹 가입'),
        content: normalFail.content,
        onOk: () => {},
      });
    },
  });
  const handleJoinGroup = () => {
    if (inputGroupCode.length === 0) {
      showAlert({
        title: validationFail.title('그룹 코드 입력'),
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
      mainTitle="그룹 가입"
      leftBtnTitle="뒤로가기"
      onLeftPress={() => {
        setOpen(false);
      }}
      rightBtnTitle="가입하기"
      onRightPress={handleJoinGroup}
    >
      <ContentBox>
        <DefaultText typography="captionb" color="black">
          가입하고 싶은 그룹의 코드를 입력해주세요
        </DefaultText>
        <InputLine
          value={inputGroupCode}
          onChangeText={setInputGroupCode}
          placeholder="그룹 코드"
          width={rWidth(320)}
        />
      </ContentBox>
    </DefaultModal>
  );
}
