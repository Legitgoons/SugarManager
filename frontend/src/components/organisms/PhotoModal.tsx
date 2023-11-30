import React from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import Delete from '@/assets/icon/DeleteIcon.svg';
import Cancle from '@/assets/icon/CancleIcon.svg';
import DefaultPressableProps from '@/types/pressable';
import { rWidth, rHeight } from '@/utils';
import { Overlay } from '@/styles';

const FullImageBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FullImage = styled.Image`
  width: ${rWidth(320)}px;
  height: 80%;
`;

const ButtonBox = styled.View`
  width: ${rWidth(60)}px;
  height: ${rHeight(36)}px;
  align-self: flex-end;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${rHeight(10)}px;
  margin-bottom: ${rHeight(10)};
`;
const DeleteButton = styled.Pressable<DefaultPressableProps>``;
const CancleButton = styled.Pressable<DefaultPressableProps>``;
const DeleteIcon = styled(Delete)`
  width: ${rWidth(24)}px;
  height: ${rHeight(24)}px;
`;
const CancleIcon = styled(Cancle)`
  width: ${rWidth(24)}px;
  height: ${rHeight(24)}px;
`;

interface PhotoModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  expandedImage: string;
  deleteImg?: () => void;
}

export default function PhotoModal({
  modalVisible,
  setModalVisible,
  expandedImage,
  deleteImg,
}: PhotoModalProps) {
  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <Overlay>
        <FullImageBox>
          <ButtonBox>
            {deleteImg && (
              <DeleteButton onPress={deleteImg}>
                <DeleteIcon />
              </DeleteButton>
            )}
            <CancleButton
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <CancleIcon />
            </CancleButton>
          </ButtonBox>
          <FullImage source={{ uri: expandedImage }} />
        </FullImageBox>
      </Overlay>
    </Modal>
  );
}
