import theme from '@/styles/theme';
import { rHeight, rWidth } from '@/utils';
import React from 'react';
import { Animated, Pressable } from 'react-native';
import styled from 'styled-components/native';

const BackgroundWrapper = styled(Animated.View)<{ isOn: boolean }>`
  width: ${rWidth(52)}px;
  height: ${rHeight(28)}px;
  border-radius: ${rHeight(14)}px;
  justify-content: center;
  padding: ${rHeight(2)}px ${rWidth(2)}px;
`;

const Circle = styled(Animated.View)`
  width: ${rWidth(24)}px;
  height: ${rHeight(24)}px;
  border-radius: ${rHeight(12)}px;
  background-color: white;
  position: absolute;
`;

interface MainSwitchProps {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}

function MainSwitch({ isOn, setIsOn }: MainSwitchProps) {
  const circleLeft = isOn ? 26 : 2; // 켜졌을 때와 꺼졌을 때의 위치
  const backgroundColor = isOn ? theme.colors.b4 : theme.colors.tertiary; // 켜졌을 때와 꺼졌을 때의 배경색

  return (
    <Pressable onPress={() => setIsOn((prev) => !prev)}>
      <BackgroundWrapper style={{ backgroundColor }} isOn={isOn}>
        <Circle style={{ left: circleLeft }} />
      </BackgroundWrapper>
    </Pressable>
  );
}
export default MainSwitch;
