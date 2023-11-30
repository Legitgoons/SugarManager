import React from 'react';

export interface DefaultModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mainTitle: string;
  children: React.ReactNode;
  leftBtnTitle: string;
  onLeftPress: () => void;
  rightBtnTitle: string;
  onRightPress: () => void;
}
