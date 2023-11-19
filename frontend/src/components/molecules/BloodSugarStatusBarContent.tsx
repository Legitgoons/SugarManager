import React, { useState } from 'react';
import { Image } from 'react-native';
import BloodSugarStatusBar from '@/assets/img/bloodSugarStatusBar.png';
import EmptyTriangleIcon from '@/assets/icon/EmptyTriangleIcon.svg';
import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils';
import { DefaultText } from '@/styles';

const BarBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${rWidth(320)}px;
  position: relative;
`;

const TriangleIconWrapper = styled.View<{ left: number }>`
  position: absolute;
  top: ${rHeight(40)}px;
  left: ${(props) => props.left}px;
`;

interface BloodSugarStatusBarContentProps {
  value: number;
}

export default function BloodSugarStatusBarContent({
  value,
}: BloodSugarStatusBarContentProps) {
  const [imageWidth, setImageWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const adjustedValue = value > 200 ? 200 : value;
  const leftPosition = imageWidth > 0 ? (adjustedValue / 200) * imageWidth : 0;

  return (
    <BarBox>
      <DefaultText
        color="secondary"
        typography="captionr"
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setContentHeight(height);
        }}
      >
        혈당이 너무 높거나, 낮을 경우 끝으로 표시됩니다.
      </DefaultText>
      <Image
        source={BloodSugarStatusBar}
        style={{ resizeMode: 'contain' }}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setImageWidth(width);
          setContentHeight((prevHeight) => prevHeight + height);
        }}
      />
      {imageWidth > 0 && (
        <TriangleIconWrapper
          left={leftPosition}
          style={{ top: contentHeight + rHeight(8) }}
        >
          <EmptyTriangleIcon width={rWidth(20)} height={rHeight(20)} />
        </TriangleIconWrapper>
      )}
    </BarBox>
  );
}
