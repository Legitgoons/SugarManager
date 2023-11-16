import React from 'react';
import styled from 'styled-components/native';
import { DefaultText } from '@/styles';
import { rHeight, showAlert } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { postGroupCraete } from '@/apis';
import { useDispatch } from 'react-redux';
import { setGroupCode } from '@/redux/slice/userSlice';
import DefaultModal from './Modal';

const ContentBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${rHeight(32)}px;
`;

interface GroupCreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GroupCreateModal({
  open,
  setOpen,
}: GroupCreateModalProps) {
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: () => postGroupCraete(),
    onSuccess: async (data) => {
      showAlert({
        title: '그룹생성 성공',
        content: '그룹 생성에 성공하였습니다.',
        onOk: () => {},
      });
      dispatch(setGroupCode(data.response.groupCode));
      setOpen(false);
    },
    onError: () => {
      showAlert({
        title: '그룹가입 실패',
        content: '다시 시도해주세요',
        onOk: () => {},
      });
    },
  });
  const handleCreateGroup = () => {
    mutate();
  };

  return (
    <DefaultModal
      modalVisible={open}
      setModalVisible={setOpen}
      mainTitle="그룹 생성"
      leftBtnTitle="뒤로가기"
      onLeftPress={() => {
        setOpen(false);
      }}
      rightBtnTitle="생성하기"
      onRightPress={handleCreateGroup}
    >
      <ContentBox>
        <DefaultText typography="captionb" color="black">
          그룹을 생성하여, 그룹원들과 함께 건강을 관리해보세요!
        </DefaultText>
      </ContentBox>
    </DefaultModal>
  );
}
