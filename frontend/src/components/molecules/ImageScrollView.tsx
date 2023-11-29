/* eslint-disable no-unused-vars */
import React from 'react';
import { rHeight, rWidth } from '@/utils/style';
import { ScrollView, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { MenuImage } from '@/types/api/response/meal';

const ImageScrollViewBox = styled.View<{ isWrite: boolean }>`
  width: ${({ isWrite }) => (isWrite ? rWidth(240) : rWidth(320))}px;
  overflow: hidden;
`;

const SelectedImage = styled.Image`
  width: ${rWidth(80)}px;
  height: ${rHeight(100)}px;
  border-radius: ${rHeight(10)}px;
`;

interface ImageScrollViewProps {
  images: MenuImage[];
  onImagePress: (image: MenuImage) => void;
  isWrite: boolean;
}

export default function ImageScrollView({
  images,
  onImagePress,
  isWrite,
}: ImageScrollViewProps) {
  return (
    <ImageScrollViewBox isWrite={isWrite}>
      <ScrollView horizontal>
        {images.map((image) => (
          <Pressable onPress={() => onImagePress(image)}>
            <SelectedImage source={{ uri: image.menuImageUrl }} />
          </Pressable>
        ))}
      </ScrollView>
    </ImageScrollViewBox>
  );
}
