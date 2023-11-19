import React, { useState } from 'react';
import { Image } from 'react-native';
import BloodSugarStatusBar from '@/assets/img/bloodSugarStatusBar.png';
import EmptyTriangleIcon from '@/assets/icon/EmptyTriangleIcon.svg';
import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils';

const BarBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: ${rWidth(320)}px;
  gap: 20px;
  position: relative;
`;

const TriangleIconWrapper = styled.View<{ left: number }>`
  position: absolute;

  top: ${rHeight(16)}px;
  left: ${(props) => props.left}px;
`;

interface BloodSugarStatusBarContentProps {
  value: number;
}
export default function BloodSugarStatusBarContent({
  value,
}: BloodSugarStatusBarContentProps) {
  const [imageWidth, setImageWidth] = useState(0);
  const adjustedValue = value > 200 ? 200 : value;
  const leftPosition = imageWidth > 0 ? (adjustedValue / 200) * imageWidth : 0;

  return (
    <BarBox>
      <Image
        source={BloodSugarStatusBar}
        style={{ resizeMode: 'contain' }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setImageWidth(width);
        }}
      />
      {imageWidth > 0 && (
        <TriangleIconWrapper left={leftPosition}>
          <EmptyTriangleIcon width={rWidth(20)} height={rHeight(20)} />
        </TriangleIconWrapper>
      )}
    </BarBox>
  );
}
