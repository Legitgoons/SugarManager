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
import { getChallengeList } from '@/apis';
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
    month: curDate.getMonth(),
    day: 0,
  });
  const [openDailyInfo, setOpenDailyInfo] = useState(false);

  const { groupCode } = useSelector(selectUser);
  const { nickname } = useSelector(selectNavigation);
  useSuspenseQuery({
    queryKey: ['getChallengeList', nickname],
    queryFn: () => getChallengeList(nickname),
  });

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
              firstContent="오늘 총, 3회 측정 하였습니다."
              secondContent="저녁 식사 후 측정이 필요합니다."
              onPress={() => {
                router.navigate('BloodSugar');
              }}
            />
            <ChanllengeCard
              title="챌린지 - 오늘의 달성도"
              leftNumeric="0개"
              rightNumeric="5개"
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
              firstContent="기능 추가 예정입니다."
              secondContent="빠른 시일 내 추가하겠습니다."
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
