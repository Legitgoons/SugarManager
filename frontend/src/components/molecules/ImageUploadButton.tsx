import React from 'react';
import styled from 'styled-components/native';
import PlusEllipseIcon from '@/assets/icon/PlusEllipseIcon.svg';
import { rHeight, rWidth } from '@/utils';
import ProfileButton from '../atoms/ProfileButton';

const ImageUploadButtonBox = styled.View`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.View`
  right: ${rWidth(12)}px;
  bottom: ${rHeight(2)}px;
`;

interface ImageUploadButtonProps {
  imgUrl: string;
  onPress: () => void;
}

export default function ImageUploadButton({
  imgUrl,
  onPress,
}: ImageUploadButtonProps) {
  return (
    <ImageUploadButtonBox>
      <ProfileButton imgUrl={imgUrl} onPress={onPress} isFocus={false} />
      <IconWrapper>
        <PlusEllipseIcon
          width={rWidth(20)}
          height={rHeight(20)}
          onPress={onPress}
        />
      </IconWrapper>
    </ImageUploadButtonBox>
  );
}
