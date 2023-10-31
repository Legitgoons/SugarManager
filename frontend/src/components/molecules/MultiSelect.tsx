import React from 'react';
import styled from 'styled-components/native';
import Week from '@/types/week';
import TextButton from '../atoms/TextButton';

interface MultiSelectProps<T extends string | number | symbol | Week> {
  subject: string;
  items: Record<T, boolean>;
  setItems: React.Dispatch<React.SetStateAction<Record<T, boolean>>>;
}

const MultiSelectContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 320px;
`;

function MultiSelect<T extends string | number | symbol | Week>({
  subject,
  items,
  setItems,
}: MultiSelectProps<T>) {
  const handleClickText = (item: T) => {
    setItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <MultiSelectContainer>
      {Object.entries(items).map(([weekDay, isSelected]) => (
        <TextButton
          key={`${subject}_${weekDay}`}
          title={weekDay}
          isSelected={isSelected as boolean}
          onPress={() => {
            handleClickText(weekDay as T);
          }}
        />
      ))}
    </MultiSelectContainer>
  );
}

export default MultiSelect;
