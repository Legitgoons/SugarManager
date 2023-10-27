import React, { useCallback, useState } from 'react';
import DefaultPressable from '@/styles/pressable';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';

interface ProfileButtonProps extends DefaultPressableProps {
  imgUrl: string;
  isFocus: boolean;
}

const ProfileButtonWrapper = styled(DefaultPressable)<{ isFocus: boolean }>`
  border-radius: 40px;
  overflow: hidden;
  width: 80px;
  height: 80px;
  border-width: ${({ isFocus }) => (isFocus ? '4px' : '0px')};
  border-color: ${({ theme }) => theme.colors.b3};
`;

const ProfileImageWrapper = styled.Image`
  width: 100%;
  height: 100%;
`;

const defaultImage = require('@/assets/img/defaultProfile.jpg');

export default function ProfileButton({
  imgUrl,
  onPress,
  isFocus,
}: ProfileButtonProps) {
  const [imageSource, setImageSource] = useState({ uri: imgUrl });
  const handleError = useCallback(() => {
    setImageSource(defaultImage);
  }, []);

  return (
    <ProfileButtonWrapper onPress={onPress} isFocus={isFocus}>
      <ProfileImageWrapper source={imageSource} onError={handleError} />
    </ProfileButtonWrapper>
  );
}
