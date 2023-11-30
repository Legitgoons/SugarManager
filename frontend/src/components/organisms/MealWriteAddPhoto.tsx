import React from 'react';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import { DefaultPressable, DefaultText } from '@/styles';
import AddPhoto from '@/assets/icon/AddPhoto.svg';
import { rWidth, rHeight } from '@/utils';
import { MenuImage } from '@/types/api/response/meal';
import ImageScrollView from '../molecules/ImageScrollView';

const MealWriteAddPhotoBox = styled(DefaultPressable)`
  width: ${rWidth(320)}px;
  flex-direction: row;
  justify-content: flex-start;
`;

const SelectedPhotoBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const AddPhotoButton = styled.Pressable`
  width: ${rWidth(80)}px;
  height: ${rHeight(100)}px;
  align-items: center;
  justify-content: center;
`;
const AddPhotoIcon = styled(AddPhoto)``;

const AddPhotoBox = styled.View`
  width: ${rWidth(320)}px;
  height: ${rHeight(100)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AddPhotoTextWrapper = styled(DefaultText)`
  width: ${rWidth(240)}px;
  height: ${rHeight(60)}px;
  align-items: center;
  justify-content: center;
`;

interface MealWriteAddPhotoProps {
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  setExpandedImage: React.Dispatch<React.SetStateAction<string>>;
  photoModalOpen: () => void;
}

export default function MealWriteAddPhoto({
  selectedImages,
  setSelectedImages,
  setExpandedImage,
  photoModalOpen,
}: MealWriteAddPhotoProps) {
  const pickImage = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      setSelectedImages(images.map((i) => i.path));
    });
  };

  const images: MenuImage[] = selectedImages.map((image, index) => ({
    menuImagePk: index.toString(),
    menuImageUrl: image,
  }));

  const openImage = (image: MenuImage) => {
    setExpandedImage(image.menuImageUrl);
    photoModalOpen();
  };

  return (
    <MealWriteAddPhotoBox>
      {selectedImages.length > 0 ? (
        <SelectedPhotoBox>
          <ImageScrollView images={images} onImagePress={openImage} isWrite />
          <AddPhotoButton onPress={pickImage}>
            <AddPhotoIcon />
          </AddPhotoButton>
        </SelectedPhotoBox>
      ) : (
        <AddPhotoBox>
          <AddPhotoButton onPress={pickImage}>
            <AddPhotoIcon />
          </AddPhotoButton>
          <AddPhotoTextWrapper color="primary" typography="p2r">
            사진을 등록해보세요!
          </AddPhotoTextWrapper>
        </AddPhotoBox>
      )}
    </MealWriteAddPhotoBox>
  );
}
