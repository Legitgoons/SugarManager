import theme from '@/styles/theme';
import { rHeight, rWidth } from '@/utils/style';
import React, { useRef, useEffect } from 'react';
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
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOn, animatedValue]);

  const circleLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.tertiary, theme.colors.b4],
  });

  return (
    <Pressable
      onPress={() => {
        setIsOn((prev) => !prev);
      }}
    >
      <BackgroundWrapper style={{ backgroundColor }} isOn={isOn}>
        <Circle style={{ left: circleLeft }} />
      </BackgroundWrapper>
    </Pressable>
  );
}
export default MainSwitch;
