import { DefaultText } from '@/styles';
import React from 'react';
import styled from 'styled-components/native';
import { rWidth } from '@/utils';
import Dropdown, { DropdownProps } from './Dropdown';

const TitleWrapper = styled(DefaultText)``;
const TitleDropdownBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${rWidth(320)}px;
`;

interface TitleDropdownProps extends DropdownProps {
  title: string;
}

export default function TitleDropdown({
  title,
  placeholder,
  list,
  selectItem,
  setSelectItem,
}: TitleDropdownProps) {
  return (
    <TitleDropdownBox>
      <TitleWrapper color="black" typography="h4r">
        {title}
      </TitleWrapper>
      <Dropdown
        placeholder={placeholder}
        list={list}
        selectItem={selectItem}
        setSelectItem={setSelectItem}
      />
    </TitleDropdownBox>
  );
}
