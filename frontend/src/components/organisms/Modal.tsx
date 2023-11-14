import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { rWidth, rHeight } from '@/utils';
import { Overlay } from '@/styles';
import { TypographyType } from '@/styles/theme';
import TwinButtonGroup from '../molecules/TwinButtonGroup';

interface DefaultModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mainTitle: string;
  children: React.ReactNode;
  leftBtnTitle: string;
  onLeftPress: () => void;
  rightBtnTitle: string;
  onRightPress: () => void;
}

const ModalContainer = styled.View`
  width: ${rWidth(360)}px;
  height: ${rHeight(496)}px;
  z-index: 10;
  border-width: 1px;
  border-radius: 10px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.View`
  width: ${rWidth(320)}px;
  height: ${rHeight(328)}px;
  justify-content: space-between;
  align-items: flex-start;
`;

const MainTitleWrapper = styled.Text<{ fontSize: keyof TypographyType }>`
  color: ${({ theme }) => theme.colors.black};
  ${({ fontSize, theme }) => theme.typographys[fontSize]};
  width: 100%;
  justify-content: center;
  align-items: center;
`;

/** DefaultModal
 * @param {Boolean} modalVisible 모달 띄울지 여부
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setModalVisible
 * @param {String} mainTitle 모달 상단 Title
 * @param {React.ReactNode} children 모달 내부 내용
 * @param {String} leftBtnTitle 모달 좌측 버튼 Title
 * @param {() => void} onLeftPress 모달 좌측 버튼 callback함수
 * @param {String} rightBtnTitle 모달 우측 버튼 Title
 * @param {() => void} onRightPress 모달 우측 버튼 callback함수
 * @returns {JSX.Element} Modal Component 반환
 */

export default function DefaultModal({
  modalVisible,
  setModalVisible,
  mainTitle,
  children,
  leftBtnTitle,
  onLeftPress,
  rightBtnTitle,
  onRightPress,
}: DefaultModalProps) {
  return (
    <Modal
      animationType="none"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Overlay>
        <ModalContainer>
          <ModalBox>
            <MainTitleWrapper fontSize="h1b">{mainTitle}</MainTitleWrapper>
            {children}
            <TwinButtonGroup
              leftTitle={leftBtnTitle}
              onLeftPress={onLeftPress}
              rightTitle={rightBtnTitle}
              onRightPress={onRightPress}
            />
          </ModalBox>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}
