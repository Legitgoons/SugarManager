import React, { useState } from 'react';
import styled from 'styled-components/native';
import { DefaultText } from '@/styles';
import { rHeight, rWidth, showAlert } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { postMemberDelete } from '@/apis';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slice/userSlice';
import { persistor } from '@/redux/store/storeConfig';
import useRouter from '@/hooks/useRouter';
import alertConfig from '@/config/alertConfig';
import DefaultModal from './DefaultModal';
import InputLine from '../molecules/InputLine';

const ContentBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${rHeight(32)}px;
`;

interface MemberDeleteModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MemberDeleteModal({
  open,
  setOpen,
}: MemberDeleteModalProps) {
  const [inputNickname, setInputNickname] = useState('');
  const { nickname } = useSelector(selectUser);
  const router = useRouter();
  const { normalSuccess, normalFail, validationFail } = alertConfig;

  const { mutate } = useMutation({
    mutationFn: () => postMemberDelete(inputNickname),
    onSuccess: async () => {
      showAlert({
        title: normalSuccess.title('회원 탈퇴'),
        content: normalSuccess.content('회원 탈퇴'),
        onOk: () => {},
      });
      await persistor.purge();
      router.reset({
        index: 0,
        routes: [{ name: 'Signin' }],
      });
    },
    onError: () => {
      showAlert({
        title: normalFail.title('회원 탈퇴'),
        content: normalFail.content,
        onOk: () => {},
      });
    },
  });
  const handleDeleteMember = () => {
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
      mainTitle="회원 탈퇴"
      leftBtnTitle="뒤로가기"
      onLeftPress={() => {
        setOpen(false);
      }}
      rightBtnTitle="변경하기"
      onRightPress={handleDeleteMember}
    >
      <ContentBox>
        <DefaultText typography="captionb" color="black">
          회원 탈퇴를 하고 싶으시다면, 아래에 닉네임을 입력해주세요.
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
