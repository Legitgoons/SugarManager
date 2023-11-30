import React from 'react';
import { rHeight, rWidth } from '@/utils';
import styled from 'styled-components/native';
import { DefaultText } from '@/styles';
import TwinButtonGroup from '../molecules/TwinButtonGroup';

const HomeNoneGroupBarBox = styled.View`
  width: ${rWidth(320)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${rHeight(8)}px;
`;
const GroupBarText = styled(DefaultText)``;
const TwinButtonGroupWrapper = styled.View`
  display: flex;
  gap: 16px;
`;

interface HomeNoneGroupBarProps {
  setOpenGroupJoinModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenGroupCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function HomeNoneGroupBar({
  setOpenGroupCreateModal,
  setOpenGroupJoinModal,
}: HomeNoneGroupBarProps) {
  return (
    <HomeNoneGroupBarBox>
      <GroupBarText color="secondary" typography="p3r">
        같이 건강을 관리할 그룹을 만들거나, 참여해보세요!
      </GroupBarText>
      <TwinButtonGroupWrapper>
        <TwinButtonGroup
          leftTitle="그룹 만들기"
          rightTitle="그룹 참여하기"
          onLeftPress={() => {
            setOpenGroupCreateModal(true);
          }}
          onRightPress={() => {
            setOpenGroupJoinModal(true);
          }}
        />
      </TwinButtonGroupWrapper>
    </HomeNoneGroupBarBox>
  );
}
