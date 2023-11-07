import React, { useState } from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeDropdownParam } from '@/types/navigation';
import { HomeDropdownItem } from '@/types/homeDropdown';
import HamburgerlineIcon from '@/assets/icon/HamburgerIcon.svg';
import { rWidth, rHeight } from '@/utils/style';
import Line from '../atoms/Line';

/** HomeDropDownProps
 * @param {HomeDropdownItem[]} items 클릭 시 이동될 이름과 경로
 * @param {() => void} signOut 로그아웃용 Callback함수
 * @returns {JSX.Element} HomeDropDown 컴포넌트
 */

export interface HomeDropDownProps {
  items: HomeDropdownItem[];
  signOut: () => void;
}

const DropDownBox = styled.View`
  position: relative;
  z-index: 10;
`;

const DropdownButton = styled(Pressable)`
  width: ${rWidth(20)}px;
  height: ${rHeight(20)}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemList = styled.View`
  position: absolute;
  top: ${rHeight(20)}px;
  right: 0px;
  width: ${rWidth(60)}px;
  height: ${rHeight(100)}px;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border: 1px solid;
  border-radius: 10px;
`;

const Item = styled.Text`
  display: flex;
  width: 100%;
  height: ${rHeight(20)}px;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typography.captionb};
`;

const HamburgerIcon = styled(HamburgerlineIcon)<{ dropdownVisible: boolean }>`
  width: ${rWidth(20)}px;
  height: ${rHeight(20)}px;
`;

const Button = styled(Pressable)`
  display: flex;
  width: 100%;
  height: ${rHeight(20)}px;
  align-items: center;
  justify-content: center;
`;

const ButtonTitle = styled.Text`
  ${({ theme }) => theme.typography.captionr};
  color: ${({ theme }) => theme.colors.red};
`;

export default function HomeDropDown({ items, signOut }: HomeDropDownProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeDropdownParam>>();

  return (
    <DropDownBox>
      <DropdownButton onPress={() => setDropdownVisible(!dropdownVisible)}>
        <HamburgerIcon dropdownVisible={dropdownVisible} />
      </DropdownButton>
      {dropdownVisible && (
        <ItemList>
          {items.map((item) => (
            <Pressable
              onPress={() => navigation.navigate(item.link)}
              key={item.name}
            >
              <Item>{item.name}</Item>
            </Pressable>
          ))}
          <Line />
          <Button onPress={signOut}>
            <ButtonTitle>로그아웃</ButtonTitle>
          </Button>
        </ItemList>
      )}
    </DropDownBox>
  );
}
