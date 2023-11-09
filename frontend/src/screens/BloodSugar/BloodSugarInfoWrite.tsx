import MainFillButton from '@/components/atoms/MainFillButton';
import Toggle from '@/components/molecules/Toggle';
import BloodSugarInfoWriteContent from '@/components/organisms/BloodSugarInfoWriteContent';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { rHeight } from '@/utils/style';
import DefaultScreenContainer from '@/styles/Container';

const BloodSugarInfoWriteScreen = styled(DefaultScreenContainer)`
  justify-content: flex-start;
  padding-top: 10%;
  gap: ${rHeight(36)}px;
`;

export default function BloodSugarInfoWrite() {
  const [beforeMeal, setBeforeMeal] = useState(false);
  const [bloodSugar, setBloodSugar] = useState('');
  const [issue, setIssue] = useState('');
  const [date, setDate] = useState(new Date());
  const [buttonActive, setButtonActvie] = useState(false);

  return (
    <BloodSugarInfoWriteScreen>
      <Toggle
        isLeft={beforeMeal}
        onPress={setBeforeMeal}
        leftTitle="식전"
        rightTitle="식후"
      />
      <BloodSugarInfoWriteContent
        bloodSugar={bloodSugar}
        setBloodSugar={setBloodSugar}
        issue={issue}
        setIssue={setIssue}
        date={date}
        setDate={setDate}
        mode="time"
      />
      <MainFillButton
        title="등록"
        bgColor="b4"
        disabled={buttonActive}
        onPress={() => console.log('제출')}
      />
    </BloodSugarInfoWriteScreen>
  );
}
