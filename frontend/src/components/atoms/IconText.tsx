import { DefaultText } from '@/styles';
import { rHeight, rWidth } from '@/utils';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import React from 'react';

const IconTextWrapper = styled.View`
  display: flex;
  justify-items: center;
  align-items: center;
  gap: ${rWidth(4)}px;
  flex-direction: row;
`;

interface IconTextProps {
  Icon: React.FC<SvgProps>;
  text: string;
}

export default function IconText({ Icon, text }: IconTextProps) {
  return (
    <IconTextWrapper>
      <Icon width={rWidth(20)} height={rHeight(20)} />
      <DefaultText typography="captionr" color="black">
        {text}
      </DefaultText>
    </IconTextWrapper>
  );
}
