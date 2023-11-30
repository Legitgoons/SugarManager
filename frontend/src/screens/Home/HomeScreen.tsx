import Calendar from '@/components/organisms/Calendar';
import ChanllengeCard from '@/components/molecules/ChallengeCard';
import HomeInfoCard from '@/components/molecules/HomeInfoCard';
import HomeGroupBar from '@/components/organisms/HomeGroupBar';
import HomeHeader from '@/components/organisms/HomeHeader';
import HomeNoneGroupBar from '@/components/organisms/HomeNoneGroupBar';
import { selectUser } from '@/redux/slice/userSlice';
import { rHeight } from '@/utils';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import DailyInfoModal from '@/components/organisms/DailyInfoModal';
import useRouter from '@/hooks/useRouter';
import { selectNavigation } from '@/redux/slice/navigationSlice';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getChallengeList, getMealByDay, getDetailBloodSugar } from '@/apis';
import GroupJoinModal from '@/components/organisms/GroupJoinModal';
import GroupCreateModal from '@/components/organisms/GroupCreateModal';

const HomeContainer = styled.View`
  padding: ${rHeight(30)}px 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  gap: ${rHeight(30)}px;
`;

const HomeCardBox = styled.View`
  gap: ${rHeight(20)}px;
`;

export default function HomeScreen() {
  let challengeLeftNumeric = 0;
  let challengeRightNumeric = 5;
  let mealCnt = 0;
  let bloodSugarCnt = 0;
  const router = useRouter();
  const curDate = new Date();
  const [openGroupJoinModal, setOpenGroupJoinModal] = useState(false);
  const [openGroupCreateModal, setOpenGroupCreateModal] = useState(false);
  const [time, setTime] = useState<{
    year: number;
    month: number;
    day: number;
  }>({
    year: curDate.getFullYear(),
    month: curDate.getMonth() + 1,
    day: 0,
  });
  const [openDailyInfo, setOpenDailyInfo] = useState(false);
  const { groupCode } = useSelector(selectUser);
  const { nickname } = useSelector(selectNavigation);

  const { data: challengeListData } = useSuspenseQuery({
    queryKey: ['getChallengeList', nickname],
    queryFn: () => getChallengeList(nickname),
  });

  const { data: mealData } = useSuspenseQuery({
    queryKey: ['getMealByDay', nickname, time.year, time.month, time.day],
    queryFn: () =>
      getMealByDay({
        nickname,
        year: String(time.year),
        month: String(time.month),
        day: String(time.day),
      }),
  });

  const { data: bloodSugarData } = useSuspenseQuery({
    queryKey: [
      'getDetailBloodSugar',
      nickname,
      time.year,
      time.month,
      time.day,
    ],
    queryFn: () =>
      getDetailBloodSugar({
        nickname,
        year: String(time.year),
        month: String(time.month),
        day: String(time.day),
      }),
  });

  if (
    challengeListData?.response &&
    challengeListData?.success &&
    challengeListData?.response?.list
  ) {
    challengeRightNumeric = challengeListData.response.list.length;
    challengeListData.response.list.forEach(
      ({ goal, count }: { goal: number; count: number }) => {
        if (goal === count) challengeLeftNumeric += 1;
      }
    );
  }

  if (mealData?.response && mealData?.success && mealData?.response?.list) {
    mealCnt = mealData.response.list.length;
  }

  if (
    bloodSugarData?.response &&
    bloodSugarData?.success &&
    bloodSugarData?.response?.list
  ) {
    bloodSugarCnt = bloodSugarData.response.list.length;
  }

  return (
    <>
      {openGroupCreateModal && (
        <GroupCreateModal
          open={openGroupCreateModal}
          setOpen={setOpenGroupCreateModal}
        />
      )}
      {openGroupJoinModal && (
        <GroupJoinModal
          open={openGroupJoinModal}
          setOpen={setOpenGroupJoinModal}
        />
      )}
      <ScrollView style={{ flex: 1 }}>
        <HomeContainer>
          <HomeHeader />
          {groupCode ? (
            <HomeGroupBar />
          ) : (
            <HomeNoneGroupBar
              setOpenGroupJoinModal={setOpenGroupJoinModal}
              setOpenGroupCreateModal={setOpenGroupCreateModal}
            />
          )}
          <Calendar
            time={time}
            setTime={setTime}
            onPress={() => {
              setOpenDailyInfo((prev) => !prev);
            }}
          />
          <HomeCardBox>
            <HomeInfoCard
              title="혈당 측정"
              firstContent="혈당을 기록하고, 관리해보세요."
              secondContent={`오늘 총 ${bloodSugarCnt}회 기록하였습니다.`}
              onPress={() => {
                router.navigate('BloodSugar');
              }}
            />
            <ChanllengeCard
              title="챌린지 - 오늘의 달성도"
              leftNumeric={`${challengeLeftNumeric}개`}
              rightNumeric={`${challengeRightNumeric}개`}
              buttonType="view"
              onPressButton={() => {
                router.navigate('ChallengeInfo');
              }}
              onPress={() => {
                router.navigate('ChallengeInfo');
              }}
            />
            <HomeInfoCard
              title="식사 분석"
              firstContent="식사를 등록하고 관리해보세요"
              secondContent={`오늘은 총 ${mealCnt}회 등록했습니다.`}
              onPress={() => {
                router.navigate('Meal');
              }}
            />
          </HomeCardBox>
        </HomeContainer>
      </ScrollView>
      <DailyInfoModal
        isOpen={openDailyInfo}
        handleClose={() => setOpenDailyInfo(false)}
        time={time}
      />
    </>
  );
}
