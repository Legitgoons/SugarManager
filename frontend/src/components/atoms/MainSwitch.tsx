import theme from '@/styles/theme';
import React, { useRef, useEffect } from 'react';
import { Animated, Pressable } from 'react-native';
import styled from 'styled-components/native';

const BackgroundWrapper = styled(Animated.View)<{ isOn: boolean }>`
  width: 52px;
  height: 28px;
  border-radius: 14px;
  justify-content: center;
  padding: 2px;
`;

const Circle = styled(Animated.View)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
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
