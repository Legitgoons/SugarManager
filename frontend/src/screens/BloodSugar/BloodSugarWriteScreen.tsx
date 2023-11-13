import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { useMutation } from '@tanstack/react-query';
import { rHeight } from '@/utils/style';
import MainFillButton from '@/components/atoms/MainFillButton';
import Toggle from '@/components/molecules/Toggle';
import BloodSugarInfoWriteContent from '@/components/organisms/BloodSugarWriteContent';
import DefaultScreenContainer from '@/styles/Container';
import { BloodSugarWriteData } from '@/types/api/request/bloodSugar';
import saveBloodSugar from '@/apis/bloodSugar';

const BloodSugarInfoWriteContainer = styled(DefaultScreenContainer)`
  justify-content: flex-start;
  padding-top: 10%;
  gap: ${rHeight(36)}px;
`;

const MainFillButtonWrapper = styled.View`
  justify-self: end;
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

  const setDateSafe = useCallback((newDate: Date) => {
    if (newDate > new Date()) {
      setDate(new Date());
    } else {
      setDate(newDate);
    }
  }, []);

  const mutation = useMutation({
    mutationFn: (data: BloodSugarWriteData) => saveBloodSugar(data),
  });

  const handleSubmit = () => {
    mutation.mutate(
      {
        category: beforeMeal ? 'BEFORE' : 'AFTER',
        level: Number(bloodSugar),
        content: issue,
      },
      {
        onSuccess() {
          console.log('성공');
        },
        onError() {
          console.log('실패');
        },
      }
    );
  };

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
        setDate={setDateSafe}
        mode="datetime"
      />
      <MainFillButtonWrapper>
        <MainFillButton
          title="등록"
          bgColor={buttonDisabled ? 'b3' : 'b4'}
          disabled={buttonDisabled}
          onPress={handleSubmit}
        />
      </MainFillButtonWrapper>
    </BloodSugarInfoWriteContainer>
  );
}
