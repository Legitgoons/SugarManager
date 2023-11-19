import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { useMutation } from '@tanstack/react-query';
import { rHeight } from '@/utils/style';
import MainFillButton from '@/components/atoms/MainFillButton';
import Toggle from '@/components/molecules/Toggle';
import BloodSugarWriteContent from '@/components/organisms/BloodSugarWriteContent';
import DefaultScreenContainer from '@/styles/Container';
import { BloodSugarWriteData } from '@/types/api/request/bloodSugar';
import { saveBloodSugar } from '@/apis/bloodSugar';
import { showAlert } from '@/utils';
import formatDate from '@/utils/formatDate';
import BloodSugarStatusBarContent from '@/components/organisms/BloodSugarStatusBarContent';

const BloodSugarWriteContainer = styled(DefaultScreenContainer)`
  justify-content: flex-start;
  padding-top: 10%;
  gap: ${rHeight(36)}px;
`;

const MainFillButtonWrapper = styled.View`
  justify-self: end;
`;

export default function BloodSugarWriteScreen() {
  const [beforeMeal, setBeforeMeal] = useState(false);
  const [bloodSugar, setBloodSugar] = useState('');
  const [issue, setIssue] = useState('');
  const [date, setDate] = useState(new Date());
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const title = '경고';
  const onOk = () => {};

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
    const bloodSugarNum = Number(bloodSugar);
    if (Number.isNaN(bloodSugarNum)) {
      const content = '혈당 수치는 숫자여야 합니다.';
      showAlert({ title, content, onOk });
      return;
    }
    // eslint-disable-next-line yoda
    if (bloodSugarNum < 0 || 999 < bloodSugarNum) {
      const content = '혈당 수치가 정상적이지 않습니다.';
      showAlert({ title, content, onOk });
      return;
    }
    mutation.mutate(
      {
        category: beforeMeal ? 'BEFORE' : 'AFTER',
        level: bloodSugarNum,
        content: issue,
        registedAt: formatDate(date),
      },
      {
        onSuccess() {
          setBloodSugar('');
          setIssue('');
        },
        onError() {
          const content = '혈당이 등록되지 않았습니다. 다시 시도해주세요.';
          showAlert({ title, content, onOk });
        },
      }
    );
  };

  return (
    <BloodSugarWriteContainer>
      <Toggle
        isLeft={beforeMeal}
        onPress={setBeforeMeal}
        leftTitle="식전"
        rightTitle="식후"
      />
      {bloodSugar && <BloodSugarStatusBarContent value={+bloodSugar} />}
      <BloodSugarWriteContent
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
    </BloodSugarWriteContainer>
  );
}
