import React from 'react';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView, Pressable } from 'react-native';
import { DefaultPressable, DefaultText } from '@/styles';
import AddPhoto from '@/assets/icon/AddPhoto.svg';
import { rWidth, rHeight } from '@/utils';

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
const ImageScrollViewWrapper = styled.View`
  width: ${rWidth(240)}px;
  overflow: hidden;
`;

const SelectedImage = styled.Image`
  width: ${rWidth(80)}px;
  height: ${rHeight(100)}px;
  border-radius: ${rHeight(10)}px;
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

  const openImage = (image: React.SetStateAction<string>) => {
    setExpandedImage(image);
    photoModalOpen();
  };

  return (
    <MealWriteAddPhotoBox>
      {selectedImages.length > 0 ? (
        <SelectedPhotoBox>
          <ImageScrollViewWrapper>
            <ScrollView horizontal>
              {selectedImages.map((image) => (
                <Pressable key={image} onPress={() => openImage(image)}>
                  <SelectedImage source={{ uri: image }} />
                </Pressable>
              ))}
            </ScrollView>
          </ImageScrollViewWrapper>
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
