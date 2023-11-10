import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import ChanllengeCard from '@/components/molecules/ChallengeCard';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  NavigationSliceStateType,
  selectNavigation,
} from '@/redux/slice/navigationSlice';
import { rHeight, rWidth } from '@/utils';
import SubOutlineButton from '@/components/atoms/SubOutlineButton';
import { DefaultText } from '@/styles';
import MainFillButton from '@/components/atoms/MainFillButton';
import ChallengeCheckCard from '@/components/molecules/ChallengeCheckCard';
import useRouter from '@/hooks/useRouter';
import { postMemberPoke } from '@/apis';

const PageLayout = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;
const ChallangeContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  gap: ${rHeight(40)}px;
  padding-top: ${rHeight(54)}px;
  padding-bottom: ${rHeight(100)}px;
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
const ContentNoneTextWrapper = styled(DefaultText)``;

const DownButtonWrapper = styled.View`
  position: absolute;
  bottom: ${rHeight(30)}px;
`;

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

export default function ChallengeScreen() {
  const router = useRouter();
  const mutation = {
    mutate: () => {
      return { response: 'success' };
    },
  };
  const [deleteList, setDeleteList] = useState<Record<string, boolean>>({});
  const { nickname, isMine }: NavigationSliceStateType =
    useSelector(selectNavigation);
  const [mode, setMode] = useState<ChallengeScreenMode>('view');

  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['getChallengeList', nickname]);

  const { response } = data;
  const totalNumericArr = checkChallengeProcess(response);

  const handleDeleteCard = async () => {
    mutation.mutate();
    setDeleteList(() => ({}));
  };
  return (
    <PageLayout>
      <ScrollView style={{ flex: 1 }}>
        <ChallangeContainer>
          <ChanllengeCard
            title="챌린지-오늘의 달성도"
            leftNumeric={`${totalNumericArr[0]}회`}
            rightNumeric={`${totalNumericArr[1]}회`}
            buttonType="record"
            onPress={() => {}}
            onPressButton={() => {}}
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
            {response ? (
              response.map(
                ({ challenge_pk: challengePK, title, count, goal }: any) => {
                  if (isMine) {
                    return mode === 'view' ? (
                      <ChanllengeCard
                        title={title}
                        leftNumeric={`${count}회`}
                        rightNumeric={`${goal}회`}
                        buttonType="view"
                        onPress={() => {
                          router.navigate('ChallengeDetail');
                        }}
                        onPressButton={() => {
                          router.navigate('ChallengeDetail');
                        }}
                      />
                    ) : (
                      <ChallengeCheckCard
                        onPress={() => {
                          setDeleteList((prev) => ({
                            ...prev,
                            [challengePK]: !prev[challengePK],
                          }));
                        }}
                        state={deleteList}
                        challengePK={challengePK}
                        title={title}
                      />
                    );
                  }
                  // 남의 것
                  return (
                    <ChanllengeCard
                      title={title}
                      leftNumeric={`${count}회`}
                      rightNumeric={`${goal}회`}
                      buttonType="otherAlarm"
                      buttonTitle="콕!찌르기"
                      onPressButton={() => {
                        postMemberPoke({
                          nickname,
                          category: 'CHALLENGE',
                          challengeId: challengePK,
                        });
                      }}
                    />
                  );
                }
              )
            ) : (
              <ContentNoneTextWrapper typography="h3r" color="secondary">
                챌린지를 추가해보세요!
              </ContentNoneTextWrapper>
            )}
          </ContentBox>
        </ChallangeContainer>
      </ScrollView>
      <DownButtonWrapper>
        {isMine &&
          (mode === 'view' ? (
            <MainFillButton
              title="새 챌린지 생성하기"
              onPress={() => {
                router.navigate('ChallengeMake');
              }}
              bgColor="b4"
            />
          ) : (
            <MainFillButton
              title="챌린지 삭제하기"
              onPress={handleDeleteCard}
              bgColor="red"
            />
          ))}
      </DownButtonWrapper>
    </PageLayout>
  );
}
