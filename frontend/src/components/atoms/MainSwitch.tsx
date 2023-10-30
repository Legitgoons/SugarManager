import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const MainSwitchWrapper = styled.TouchableOpacity<{ isOn: boolean }>`
  width: 52px;
  height: 28px;
  border-radius: 14px;
  justify-content: center;
  padding: 2px;
  background-color: ${({ isOn, theme }) =>
    isOn ? theme.colors.b4 : theme.colors.tertiary};
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

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <MainSwitchWrapper activeOpacity={1} onPress={toggleSwitch} isOn={isOn}>
      <Circle style={{ left: circleLeft }} />
    </MainSwitchWrapper>
  );
}
export default MainSwitch;
