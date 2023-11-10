/* eslint-disable global-require */
import React from 'react';
import { DefaultPressable } from '@/styles';
import DefaultPressableProps from '@/types/pressable';
import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils';

interface ProfileButtonProps extends DefaultPressableProps {
  imgUrl: string;
  isFocus: boolean;
}

const ProfileButtonWrapper = styled(DefaultPressable)<{ isFocus: boolean }>`
  border-radius: ${rHeight(40)}px;
  overflow: hidden;
  width: ${rWidth(80)}px;
  height: ${rHeight(80)}px;
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
}: ProfileButtonProps) {
  return (
    <ProfileButtonWrapper onPress={onPress} isFocus={isFocus}>
      <ProfileImageWrapper
        source={
          !imgUrl ? require('@/assets/img/defaultProfile.jpg') : { uri: imgUrl }
        }
      />
    </ProfileButtonWrapper>
  );
}
