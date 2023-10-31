import React from 'react';
import styled from 'styled-components/native';
import Week from '@/types/week';
import TextButton from '../atoms/TextButton';

interface MultiSelectProps {
  subject: string;
  items: Record<Week, boolean>;
  setItems: React.Dispatch<React.SetStateAction<Record<Week, boolean>>>;
}

const MultiSelectContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 320px;
`;

function MultiSelect({ subject, items, setItems }: MultiSelectProps) {
  const handleClickText = (item: Week) => {
    setItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <MultiSelectContainer>
      {Object.entries(items).map(([weekDay, isSelected]) => (
        <TextButton
          key={`${subject}_${weekDay}`}
          title={weekDay}
          isSelected={isSelected}
          onPress={() => {
            handleClickText(weekDay as Week);
          }}
        />
      ))}
    </MultiSelectContainer>
  );
}

export default MultiSelect;
