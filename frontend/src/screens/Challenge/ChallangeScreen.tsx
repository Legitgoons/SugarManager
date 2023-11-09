import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import ChanllengeCard from '@/components/molecules/ChallengeCard';
import getChallengeList from '@/apis/challenge';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  NavigationSliceStateType,
  selectNavigation,
} from '@/redux/slice/navigationSlice';
import { rHeight, rWidth } from '@/utils/style';
import SubOutlineButton from '@/components/atoms/SubOutlineButton';
import DefaultText from '@/styles/Text';
import MainFillButton from '@/components/atoms/MainFillButton';

const ChallangeContainer = styled.View`
  padding-top: ${rHeight(54)}px;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  gap: ${rHeight(40)}px;
`;
const ContentBox = styled.View`
  justify-content: center;
  align-items: center;
  gap: ${rHeight(16)}px;
`;

const ContentHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${rWidth(320)}px;
`;
const ContentHeaderTextWrapper = styled(DefaultText)``;
type ChallengeScreenMode = 'view' | 'modify';

function checkChallengeProcess(response: any) {
  if (response === undefined || response.length === 0) return [0, 0];
  const checkArr = [0, 0];
  response.forEach(({ count, goal }: { count: number; goal: number }) => {
    checkArr[1] += 1;
    checkArr[0] += count === goal ? 1 : 0;
  });
  return checkArr;
}

export default function ChallangeScreen() {
  const { nickname, isMine }: NavigationSliceStateType =
    useSelector(selectNavigation);
  const [mode, setMode] = useState<ChallengeScreenMode>('view');
  const { data } = useSuspenseQuery({
    queryKey: ['getChallgeList'],
    queryFn: () => getChallengeList(nickname),
    staleTime: 1000 * 60 * 100,
    refetchOnWindowFocus: false,
  });

  const { response } = data;
  const totalNumericArr = checkChallengeProcess(response);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ChallangeContainer>
          <ChanllengeCard
            title="챌린지-오늘의 달성도"
            leftNumeric={`${totalNumericArr[0]}회`}
            rightNumeric={`${totalNumericArr[1]}회`}
            button=""
            onPress={() => {}}
          />
          <ContentBox>
            <ContentHeaderWrapper>
              <ContentHeaderTextWrapper color="black" typography="h4r">
                하루 챌린지 항목
              </ContentHeaderTextWrapper>
              {isMine &&
                (mode === 'view' ? (
                  <SubOutlineButton
                    borderColor="red"
                    onPress={() => {
                      setMode('modify');
                    }}
                    title="편집하기"
                  />
                ) : (
                  <SubOutlineButton
                    borderColor="b4"
                    onPress={() => {
                      setMode('view');
                    }}
                    title="조회하기"
                  />
                ))}
            </ContentHeaderWrapper>
          </ContentBox>
        </ChallangeContainer>
      </ScrollView>
      <View>
        {isMine &&
          (mode === 'view' ? (
            <MainFillButton
              title="새 챌린지 생성하기"
              onPress={() => {}}
              bgColor="b4"
            />
          ) : (
            <MainFillButton
              title="챌린지 삭제하기"
              onPress={() => {}}
              bgColor="red"
            />
          ))}
      </View>
    </View>
  );
}
