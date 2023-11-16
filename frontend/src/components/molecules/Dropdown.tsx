import React, { useState } from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import BlackDownArrow from '@/assets/icon/BlackDownArrowIcon.svg';
import BlackUpArrow from '@/assets/icon/BlackUpArrowIcon.svg';
import { rWidth, rHeight } from '@/utils';
import DropdownItem from '../../types/dropdown';
import Line from '../atoms/Line';

export interface DropdownProps {
  placeholder: string;
  list: Array<DropdownItem>;
  selectItem: DropdownItem | null;
  setSelectItem: React.Dispatch<React.SetStateAction<DropdownItem | null>>;
}

const DropdownContainer = styled.View`
  position: relative;
`;

const DropdownButton = styled(Pressable)`
  border-width: 1px;
  width: ${rWidth(120)}px;
  height: ${rHeight(40)}px;
  border-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${rHeight(8)}px;
`;

const DropdownText = styled.Text`
  ${({ theme }) => theme.typographys.p2r};
`;

const ArrowIconWrapper = styled.View`
  justify-self: end;
`;

const BlackDownArrowIcon = styled(BlackDownArrow)``;
const BlackUpArrowIcon = styled(BlackUpArrow)``;

const ListItem = styled(Pressable)<{ isFirst: boolean; isLast: boolean }>`
  width: ${rWidth(120)}px;
  height: ${rHeight(60)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ListItemText = styled.Text`
  ${({ theme }) => theme.typographys.p2r};
`;

const DropdownListContainer = styled.View`
  border-radius: ${rHeight(10)}px;
  overflow: hidden;
  max-height: ${rHeight(60 * 3)}px;
  top: 100%;
  z-index: 1;
  position: absolute;
  width: ${rWidth(120)}px;
  elevation: 3;
`;

const DropdownListScrollView = styled.ScrollView``;

export default function Dropdown({
  placeholder,
  list,
  selectItem,
  setSelectItem,
}: DropdownProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <DropdownContainer>
      <DropdownButton onPress={() => setDropdownVisible(!dropdownVisible)}>
        <DropdownText>
          {selectItem ? selectItem.value : placeholder}
        </DropdownText>
        <ArrowIconWrapper>
          {dropdownVisible ? <BlackUpArrowIcon /> : <BlackDownArrowIcon />}
        </ArrowIconWrapper>
      </DropdownButton>
      {dropdownVisible && (
        <DropdownListContainer>
          <DropdownListScrollView>
            {list.map((item: DropdownItem, idx) => (
              <>
                <ListItem
                  key={item.id}
                  onPress={() => {
                    setSelectItem(item);
                    setDropdownVisible(false);
                  }}
                  isFirst={idx === 0}
                  isLast={idx === list.length - 1}
                >
                  <ListItemText>{item.value}</ListItemText>
                </ListItem>
                {idx < list.length - 1 && <Line color="tertiary" />}
              </>
            ))}
          </DropdownListScrollView>
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
}
