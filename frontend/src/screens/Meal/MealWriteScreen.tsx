import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { rHeight } from '@/utils/style';
import MainFillButton from '@/components/atoms/MainFillButton';
import DefaultScreenContainer from '@/styles/Container';
import MealWriteAddPhoto from '@/components/molecules/MealWriteAddPhoto';
import DefaultModal from '@/components/organisms/Modal';

const MealWriteContainer = styled(DefaultScreenContainer)`
  justify-content: flex-start;
  padding-top: 10%;
  gap: ${rHeight(36)}px;
`;

const MainFillButtonWrapper = styled.View`
  justify-self: end;
`;

export default function MealWriteScreen() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [foodList, setFoodList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (foodList === []) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [foodList]);

  const handleSubmit = () => {
    console.log('딸깍');
  };

  return (
    <MealWriteContainer>
      <MainFillButtonWrapper>
        <MealWriteAddPhoto
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
        <DefaultModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          mainTitle="음식 등록하기"
          leftBtnTitle="뒤로가기"
          onLeftPress={() => {}}
          rightBntTitle="등록하기"
          onRightPress={() => {}}
        >
          h1
        </DefaultModal>
        <MainFillButton
          title="등록"
          bgColor={buttonDisabled ? 'b3' : 'b4'}
          disabled={buttonDisabled}
          onPress={handleSubmit}
        />
      </MainFillButtonWrapper>
    </MealWriteContainer>
  );
}
