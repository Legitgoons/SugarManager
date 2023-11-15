import React from 'react';
import styled from 'styled-components/native';
import { DefaultPressable, DefaultText } from '@/styles';
import AddPhoto from '@/assets/icon/AddPhoto.svg';
import { rWidth, rHeight } from '@/utils';
import ImagePicker from 'react-native-image-crop-picker';

const MealWriteAddPhotoBox = styled(DefaultPressable)``;

const AddPhotoButton = styled.Pressable`
  width: ${rWidth(320)}px;
  height: ${rHeight(100)}px;
  flex-direction: row;
  justify-content: space-between;
`;

const AddPhotoIcon = styled(AddPhoto)``;
const AddPhotoTextWrapper = styled(DefaultText)`
  width: ${rWidth(240)}px;
`;

const SelectedImage = styled.Image`
  width: ${rWidth(80)}px;
  height: ${rHeight(100)}px;
`;

interface MealWriteAddPhotoProps {
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function MealWriteAddPhoto({
  selectedImages,
  setSelectedImages,
}: MealWriteAddPhotoProps) {
  const pickImage = () => {
    console.log('클릭');
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      setSelectedImages(images.map((i) => i.path));
    });
  };

  return (
    <MealWriteAddPhotoBox onPress={pickImage}>
      {selectedImages.length > 0 ? (
        selectedImages.map((image) => (
          <SelectedImage key={image} source={{ uri: image }} />
        ))
      ) : (
        <AddPhotoButton>
          <AddPhotoIcon />
          <AddPhotoTextWrapper color="primary" typography="p2r">
            사진을 등록해서{'\n'}음식 정보를 찾아보세요!
          </AddPhotoTextWrapper>
        </AddPhotoButton>
      )}
    </MealWriteAddPhotoBox>
  );
}
