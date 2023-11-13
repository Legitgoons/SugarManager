import React, { useState } from 'react';
import styled from 'styled-components/native';
import BloodSugarContentCard from '@/components/organisms/BloodSugarContentCard';
import DatePickerController from '@/components/organisms/DatePickerController';

const BloodSugarContainer = styled.View``;

export default function BloodSugarScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <BloodSugarContainer>
      <DatePickerController
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <BloodSugarContentCard
        date="11/10"
        count={1}
        beforeNum={43}
        beforeType="warning"
        afterNum={112}
        afterType="safety"
      />
    </BloodSugarContainer>
  );
}
