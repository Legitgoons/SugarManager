import { Overlay } from '@/styles';
import theme from '@/styles/theme';
import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';

export default function Spinner() {
  return (
    <Modal transparent animationType="none">
      <Overlay>
        <ActivityIndicator size="large" color={theme.colors.b4} />
      </Overlay>
    </Modal>
  );
}
