/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import ChanllengeCard from '@/components/molecules/ChallengeCard';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  NavigationSliceStateType,
  selectNavigation,
} from '@/redux/slice/navigationSlice';
import { rHeight, rWidth, showAlert } from '@/utils';
import SubOutlineButton from '@/components/atoms/SubOutlineButton';
import { DefaultText } from '@/styles';
import MainFillButton from '@/components/atoms/MainFillButton';
import ChallengeCheckCard from '@/components/molecules/ChallengeCheckCard';
import useRouter from '@/hooks/useRouter';
import {
  getChallengeList,
  postChallengeClaim,
  postChallengeDelete,
  postMemberPoke,
} from '@/apis';
import { PostChallengeDeleteProps } from '@/types/api/request/challenge';
import alertConfig from '@/config/alertConfig';

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

function checkChallengeProcess(challengeList: any) {
  if (challengeList === undefined || challengeList.length === 0) return [0, 0];
  const checkArr = [0, 0];
  challengeList.forEach(({ count, goal }: { count: number; goal: number }) => {
    checkArr[1] += 1;
    checkArr[0] += count === goal ? 1 : 0;
  });
  return checkArr;
}

export default function ChallengeScreen() {
  let challengeList = [];
  const { normalFail } = alertConfig;
  const queryClient = useQueryClient();
  const router = useRouter();
  const [deleteList, setDeleteList] = useState<Record<string, boolean>>({});
  const { nickname, isMine }: NavigationSliceStateType =
    useSelector(selectNavigation);
  const [mode, setMode] = useState<ChallengeScreenMode>('view');
  const mutation = useMutation({
    mutationFn: (lastDeleteList: Array<PostChallengeDeleteProps>) =>
      postChallengeDelete(lastDeleteList),
  });
  const claimMutation = useMutation({
    mutationFn: (challengePk: number) => postChallengeClaim(challengePk),
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ['getChallengeList', nickname],
        });
      } else {
        showAlert({
          title: normalFail.title('횟수 증가'),
          content: normalFail.content,
          onOk: () => {},
        });
      }
    },
    onError() {
      showAlert({
        title: normalFail.title('횟수 증가'),
        content: normalFail.content,
        onOk: () => {},
      });
    },
  });

  const { data } = useSuspenseQuery({
    queryKey: ['getChallengeList', nickname],
    queryFn: () => getChallengeList(nickname),
  });
  const { success, response } = data;

  if (success && response && response?.list) {
    challengeList = response.list;
  }
  const totalNumericArr = checkChallengeProcess(challengeList);

  const handleDeleteCard = async () => {
    const list = Object.entries(deleteList)
      .filter(([_, v]) => v)
      .map(([k, _]) => ({ challengePk: Number(k), nickname }));
    mutation.mutate(list, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['getChallengeList', nickname],
        });
        setDeleteList(() => ({}));
        setMode('view');
      },
      onError() {
        showAlert({
          title: normalFail.title('챌린지 삭제'),
          content: normalFail.content,
          onOk: () => {},
        });
      },
    });
  };

  return (
    <PageLayout>
      <ScrollView style={{ flex: 1 }}>
        <ChallangeContainer>
          <ChanllengeCard
            title="챌린지-오늘의 달성도"
            leftNumeric={`${totalNumericArr[0]}회`}
            rightNumeric={`${totalNumericArr[1]}회`}
            onPress={() => {}}
            onPressButton={() => {}}
          />
          <ContentBox>
            <ContentHeaderWrapper>
              <ContentHeaderTextWrapper color="black" typography="h4r">
                하루 챌린지 항목
              </ContentHeaderTextWrapper>
              {mode === 'view' ? (
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
              )}
            </ContentHeaderWrapper>
            {response && challengeList ? (
              challengeList.map(({ challengePk, title, count, goal }: any) => {
                if (mode === 'view') {
                  return isMine ? (
                    <ChanllengeCard
                      key={`C_MINE_VIEW_${challengePk}`}
                      title={title}
                      leftNumeric={`${count}회`}
                      rightNumeric={`${goal}회`}
                      buttonType="claim"
                      onPress={() => {
                        router.navigate('ChallengeDetail', { challengePk });
                      }}
                      onPressButton={() => {
                        claimMutation.mutate(challengePk);
                      }}
                    />
                  ) : (
                    <ChanllengeCard
                      key={`C_OTHER_VIEW_${challengePk}`}
                      title={title}
                      leftNumeric={`${count}회`}
                      rightNumeric={`${goal}회`}
                      buttonType="otherAlarm"
                      buttonTitle="콕!찌르기"
                      onPressButton={() => {
                        postMemberPoke({
                          nickname,
                          type: 'CHALLENGE',
                          challengeId: challengePk,
                        });
                      }}
                    />
                  );
                }

                return (
                  <ChallengeCheckCard
                    key={`C_MINE_MODIFY_${challengePk}`}
                    onPress={() => {
                      setDeleteList((prev) => ({
                        ...prev,
                        [challengePk]: !prev[challengePk],
                      }));
                    }}
                    state={deleteList}
                    challengePK={challengePk}
                    title={title}
                  />
                );
              })
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
