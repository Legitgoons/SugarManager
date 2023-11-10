import React, { useState } from 'react';
import { Pressable, FlatList } from 'react-native';
import styled from 'styled-components/native';
import BlackDownArrow from '@/assets/icon/BlackDownArrowIcon.svg';
import BlackUpArrow from '@/assets/icon/BlackUpArrowIcon.svg';
import { rWidth, rHeight } from '@/utils/style';

interface DropdownItem {
  id: string;
  value: string;
}

interface DropdownProps {
  placeholder: string;
  list: Array<DropdownItem>;
  selectItem: DropdownItem | null;
  setSelectItem: React.Dispatch<React.SetStateAction<DropdownItem | null>>;
}

/** 공통 Dropdown Component
@param {String} placeholder : Dropdown의 값 미선택 시 나오는 placeholder 지정
@param {Array<DropdownItem>} list : 드롭다운 클릭 시 나오는 선택 가능한 리스트들. id는 key를 대응하며, value는 실제 보이는 값
@param {DropdownItem | null} selectItem : 현재 선택된 값. null 가능성 존재
@param {React.Dispatch<React.SetStateAction<DropdownItem | null>>} setSelectItem selectItem의 상태를 변경해주는 함수
@returns {JSX.Element} 컴포넌트 반환 */

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
`;

const DropdownText = styled.Text`
  ${({ theme }) => theme.typography.p2r};
`;

const ArrowIconWrapper = styled.View`
  justify-self: end;
`;

const BlackDownArrowIcon = styled(BlackDownArrow)``;
const BlackUpArrowIcon = styled(BlackUpArrow)``;

const DropdownListContainer = styled.View`
  position: absolute;
  width: ${rWidth(120)}px;
  top: 100%;
  border-radius: 10px;
  overflow: hidden;
`;
const ListItem = styled(Pressable)`
  width: ${rWidth(120)}px;
  height: ${rHeight(80)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ListItemText = styled.Text`
  ${({ theme }) => theme.typography.p2r};
`;

export default function Dropdown({
  placeholder,
  list,
  selectItem,
  setSelectItem,
}: DropdownProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const renderItem = ({ item }: { item: DropdownItem }) => (
    <ListItem
      onPress={() => {
        setSelectItem(item);
        setDropdownVisible(false);
      }}
    >
      <ListItemText>{item.value}</ListItemText>
    </ListItem>
  );

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
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={(item: DropdownItem) => item.id}
          />
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
}
