import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import TextButton from '../atoms/TextButton';

type Weeks = '일' | '월' | '화' | '수' | '목' | '금' | '토';
interface MultiSelectProps {
  items: Array<Weeks>;
}

const MultiSelectContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 320px;
`;

function MultiSelect({ items }: MultiSelectProps) {
  const [selectedItems, setSelectedItems] = useState<Record<Weeks, boolean>>({
    일: false,
    월: false,
    화: false,
    수: false,
    목: false,
    금: false,
    토: false,
  });

  useEffect(() => {
    items.forEach((item) => {
      setSelectedItems((prev) => ({ ...prev, [item]: !prev[item] }));
    });
  }, [items]);

  const handleClickText = (item: Weeks) => {
    setSelectedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <MultiSelectContainer>
      {Object.entries(selectedItems).map(([weekDay, isSelected]) => (
        <TextButton
          key={`${weekDay}`}
          title={weekDay}
          isSelected={isSelected}
          onPress={() => {
            handleClickText(weekDay as Weeks);
          }}
        />
      ))}
    </MultiSelectContainer>
  );
}

export default MultiSelect;
