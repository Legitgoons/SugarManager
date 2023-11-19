import React from 'react';
import { DefaultText } from '@/styles';
import styled from 'styled-components/native';
import { rWidth, rHeight } from '@/utils';

const TextWithSmallTitleBox = styled.View`
  height: ${rHeight(24)}px;
  flex-direction: row;
  gap: ${rWidth(3)}px;
`;
const TitleWrapper = styled(DefaultText)``;
const TextWrapper = styled(DefaultText)``;

/**
 * @param {string} title text보다 작은 title
 * @param {string} text title보다 큰 text
 * @returns {JSX.Element} 가로 정렬된 작은 Title과 Text를 가진 컴포넌트
 */

interface TextWithSmallTitleProps {
  title: string;
  text: string;
}

export default function TextWithSmallTitle({
  title,
  text,
}: TextWithSmallTitleProps) {
  return (
    <TextWithSmallTitleBox>
      <TitleWrapper color="primary" typography="p2r">
        {title}
      </TitleWrapper>
      <TextWrapper color="black" typography="p3r">
        {text}
      </TextWrapper>
    </TextWithSmallTitleBox>
  );
}
