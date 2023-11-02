import React from 'react';
import styled from 'styled-components/native';
import MainTitle from '../atoms/MainTitle';
import SubTitle from '../atoms/SubTitle';

interface TitleHeaderProps {
  mainTitle: string;
  subTitle: string;
}

const TitleHeaderBox = styled.View`
  display: flex;
  width: 320px;
  justify-content: center;
  align-items: start;
`;
export default function TitleHeader({
  mainTitle = '',
  subTitle = '',
}: TitleHeaderProps) {
  return (
    <TitleHeaderBox>
      {mainTitle && <MainTitle title={mainTitle} />}
      {subTitle && <SubTitle title={subTitle} />}
    </TitleHeaderBox>
  );
}
