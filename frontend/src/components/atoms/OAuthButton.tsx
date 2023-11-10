import { DefaultPressable } from '@/styles';
import DefaultPressableProps from '@/types/pressable';
import React from 'react';
import styled from 'styled-components/native';
import { SvgProps } from 'react-native-svg';
import { Text } from 'react-native';
import { rWidth, rHeight } from '@/utils';

interface OAuthButtonProps extends DefaultPressableProps {
  OAuthIcon: React.FC<SvgProps>;
}

const OAuthButtonBox = styled(DefaultPressable)`
  width: ${rWidth(320)}px;
  height: ${rHeight(100)}px;
  justify-content: space-between;
  padding: ${rHeight(20)}px ${rWidth(20)}px;
  border-color: black;
  border-width: 1px;
`;

const OAuthTitleWrapper = styled.Text`
  ${({ theme }) => theme.typographys.h4b};
  color: ${({ theme }) => theme.colors.black};
`;

export default function OAuthButton({
  OAuthIcon,
  onPress,
  title,
  bgColor,
}: OAuthButtonProps) {
  return (
    <OAuthButtonBox onPress={onPress} bgColor={bgColor}>
      <OAuthIcon width={rWidth(18)} height={rHeight(18)} />
      <OAuthTitleWrapper>{title}</OAuthTitleWrapper>
      <Text />
    </OAuthButtonBox>
  );
}
