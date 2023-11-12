import React, { useState } from 'react';
import { Pressable, FlatList } from 'react-native';
import styled from 'styled-components/native';
import BlackRightArrowIcon from '@/assets/icon/BlackRightArrowIcon.svg';
import { rWidth, rHeight } from '@/utils';

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
  ${({ theme }) => theme.typographys.p2r};
`;

const BlackArrowIcon = styled(BlackRightArrowIcon)<{
  dropdownVisible: boolean;
}>`
  justify-self: end;
  transform: ${(props) => {
    if (props.dropdownVisible === true) {
      return 'rotate(270deg)';
    }
    return 'rotate(90deg)';
  }};
`;

const DropdownListContainer = styled.View`
  position: absolute;
  width: ${rWidth(120)}px;
  top: 100%;
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
  max-height: ${rHeight(80 * 3)}px;
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
  ${({ theme }) => theme.typographys.p2r};
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
        <BlackArrowIcon
          width={20}
          height={20}
          dropdownVisible={dropdownVisible}
        />
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
