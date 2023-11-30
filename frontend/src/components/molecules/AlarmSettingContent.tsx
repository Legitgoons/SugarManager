import { DefaultText } from '@/styles';
import { rHeight, rWidth } from '@/utils';
import React from 'react';
import styled from 'styled-components/native';
import MainSwitch from '../atoms/MainSwitch';

const AlarmContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${rWidth(320)}px;
`;

const AlarmContentBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${rHeight(20)}px;
`;

const AlarmContentHeaderTitle = styled(DefaultText)``;

interface AlarmSettingContentProps {
  title: string;
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export default function AlarmSettingContent({
  title,
  isOn,
  setIsOn,
  children,
}: AlarmSettingContentProps) {
  return (
    <AlarmContentBox>
      <AlarmContentWrapper>
        <AlarmContentHeaderTitle typography="h4b" color="black">
          {title}
        </AlarmContentHeaderTitle>
        <MainSwitch isOn={isOn} setIsOn={setIsOn} />
      </AlarmContentWrapper>
      {children && children}
    </AlarmContentBox>
  );
}
