import React from 'react';
import styled from 'styled-components/native';
import { rWidth, rHeight } from '@/utils/style';
import { DatePickerProps } from '@/types/datePicker';
import InputLine from '../molecules/InputLine';
import TextDatePicker from '../molecules/TextDatePicker';

const WriteContentBox = styled.View`
  width: ${rWidth(320)}px;
  height: ${rHeight(240)}px;
  justify-content: space-between;
`;

const DatePickerBox = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const BoxTextWrapper = styled.Text`
  ${({ theme }) => theme.typographys.p2r};
  color: ${({ theme }) => theme.colors.primary};
`;

interface BloodSugarWriteContentProps extends DatePickerProps {
  bloodSugar: number;
  setBloodSugar: React.Dispatch<React.SetStateAction<number>>;
  issue: string;
  setIssue: React.Dispatch<React.SetStateAction<string>>;
}

export default function BloodSugarWriteContent({
  bloodSugar,
  setBloodSugar,
  issue,
  setIssue,
  date,
  setDate,
  mode,
}: BloodSugarWriteContentProps) {
  return (
    <WriteContentBox>
      <InputLine
        onChangeText={setBloodSugar}
        value={bloodSugar}
        placeholder="혈당을 입력해주세요"
        unit="mg/dL"
        keyboardType="numeric"
      />
      <InputLine
        onChangeText={setIssue}
        value={issue}
        placeholder="특이사항이 있다면 입력해주세요"
      />
      <DatePickerBox>
        <BoxTextWrapper>기록일시</BoxTextWrapper>
        <TextDatePicker date={date} setDate={setDate} mode={mode} />
      </DatePickerBox>
    </WriteContentBox>
  );
}
