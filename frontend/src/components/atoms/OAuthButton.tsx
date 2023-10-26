import DefaultPressable from '@/styles/pressable';
import DefaultPressableProps from '@/types/pressable';
import React from 'react';
import styled from 'styled-components/native';
import { SvgProps } from 'react-native-svg';
import { Text } from 'react-native';

interface OAuthButtonProps extends DefaultPressableProps {
  OAuthIcon: React.FC<SvgProps>;
}

const OAuthTouchableOpacityWrapper = styled(DefaultPressable)`
  width: 320px;
  height: 100px;
  justify-content: space-between;
  padding: 20px 20px;
  border-color: black;
  border-width: 1px;
`;

const OAuthTitleWrapper = styled.Text`
  ${({ theme }) => theme.typography.h4b};
  color: ${({ theme }) => theme.colors.black};
`;

export default function OAuthButton({
  OAuthIcon,
  onPress,
  title,
  bgColor,
}: OAuthButtonProps) {
  return (
    <OAuthTouchableOpacityWrapper onPress={onPress} bgColor={bgColor}>
      <OAuthIcon width={18} height={18} />
      <OAuthTitleWrapper>{title}</OAuthTitleWrapper>
      <Text />
    </OAuthTouchableOpacityWrapper>
  );
}
