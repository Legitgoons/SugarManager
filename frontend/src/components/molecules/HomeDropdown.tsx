import React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import Navigation from '@/navigation/Navigation';

/** HomeDropDownProps
 * @param {String} items 이름과 클릭 시 이동될 경로
 * @param {String} isOpen Dropdown Item의 이름
 * @param {() => void} onClick Callback 함수
 * @param {() => void} signOut 로그아웃용 Callback함수
 * @returns {JSX.Element} HomeDropDown 컴포넌트
 */
export interface HomeDropDownProps {
  isOpen: boolean;
  items: { name: string; link: string };
  onClick: () => void;
  signOut: () => void;
}

const DropDownContainer = styled.View`
  position: absolute;
  right: 0;
  z-index: 10;
`;

const ItemList = styled.View`
  width: 60px;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 2px solid;
  border-radius: 5px;
`;

const Item = styled.Text`
  height: 20px;
  justify-content: center;
`;

const Button = styled.Pressable`
  border-top-width: 2px;
  border-style: solid;
  width: 100%;
  height: 20px;
  justify-content: center;
`;

export default function HomeDropDown({
  isOpen,
  items,
  onClick,
  signOut,
}: HomeDropDownProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <DropDownContainer>
      <ItemList>
        {[items].map((item) => (
          <Item key={item.name}>
            <Pressable
              onPress={() => {
                Navigation.push(`${item.link}`);
              }}
            >
              {item.name}
            </Pressable>
          </Item>
        ))}
        <Button onPress={signOut}>로그아웃</Button>
      </ItemList>
    </DropDownContainer>
  );
}
