/* eslint-disable global-require */
import React from 'react';
import { DefaultPressable } from '@/styles';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils';

interface ProfileButtonProps extends DefaultPressableProps {
  imgUrl: string;
  isFocus: boolean;
  width?: number;
  height?: number;
}

const ProfileButtonWrapper = styled(DefaultPressable)<{
  isFocus: boolean;
  width: number | undefined;
  height: number | undefined;
}>`
  border-radius: ${({ height }) => rHeight(height ? height / 2 : 40)}px;
  overflow: hidden;
  width: ${({ width }) => rWidth(width || 80)}px;
  height: ${({ height }) => rHeight(height || 80)}px;
  border-width: ${({ isFocus }) => (isFocus ? '4px' : '0px')};
  border-color: ${({ theme }) => theme.colors.b3};
`;

const ProfileImageWrapper = styled.Image`
  width: 100%;
  height: 100%;
`;

export default function ProfileButton({
  imgUrl,
  onPress,
  isFocus,
  width,
  height,
}: ProfileButtonProps) {
  return (
    <ProfileButtonWrapper
      onPress={onPress}
      isFocus={isFocus}
      width={width}
      height={height}
    >
      <ProfileImageWrapper
        source={
          !imgUrl || imgUrl === null
            ? require('@/assets/img/defaultProfile.jpg')
            : { uri: imgUrl }
        }
      />
    </ProfileButtonWrapper>
  );
}
