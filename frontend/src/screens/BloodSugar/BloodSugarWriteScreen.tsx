import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import MainFillButton from '@/components/atoms/MainFillButton';
import Toggle from '@/components/molecules/Toggle';
import BloodSugarInfoWriteContent from '@/components/organisms/BloodSugarWriteContent';
import { rHeight } from '@/utils/style';
import DefaultScreenContainer from '@/styles/Container';

const BloodSugarInfoWriteContainer = styled(DefaultScreenContainer)`
  justify-content: flex-start;
  padding-top: 10%;
  gap: ${rHeight(36)}px;
`;

export default function BloodSugarInfoWriteScreen() {
  const [beforeMeal, setBeforeMeal] = useState(false);
  const [bloodSugar, setBloodSugar] = useState('');
  const [issue, setIssue] = useState('');
  const [date, setDate] = useState(new Date());
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (bloodSugar === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [bloodSugar]);

  return (
    <BloodSugarInfoWriteContainer>
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
        mode="datetime"
      />
      <MainFillButton
        title="등록"
        bgColor={buttonDisabled ? 'b3' : 'b4'}
        disabled={buttonDisabled}
        onPress={() => console.log('제출')}
      />
    </BloodSugarInfoWriteContainer>
  );
}
