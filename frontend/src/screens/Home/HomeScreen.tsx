/* eslint-disable react-hooks/exhaustive-deps */
import Calendar from '@/components/organisms/Calendar';
import ChanllengeCard from '@/components/molecules/ChallengeCard';
import HomeInfoCard from '@/components/molecules/HomeInfoCard';
import HomeGroupBar from '@/components/organisms/HomeGroupBar';
import HomeHeader from '@/components/organisms/HomeHeader';
import HomeNoneGroupBar from '@/components/organisms/HomeNoneGroupBar';
import { selectUser } from '@/redux/slice/userSlice';
import { rHeight } from '@/utils';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import DailyInfoModal from '@/components/organisms/DailyInfoModal';
import useRouter from '@/hooks/useRouter';
import { selectNavigation, setNavigation } from '@/redux/slice/navigationSlice';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getChallengeList } from '@/apis';

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

  const dispatch = useDispatch();
  const { groupCode, nickname: myNickname } = useSelector(selectUser);
  const { nickname } = useSelector(selectNavigation);

  useSuspenseQuery({
    queryKey: ['getChallengeList', nickname],
    queryFn: () => getChallengeList(nickname),
    staleTime: 1000 * 60 * 100,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    dispatch(setNavigation({ isMine: true, myNickname }));
  }, []);

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <HomeContainer>
          <HomeHeader />
          {groupCode ? <HomeGroupBar /> : <HomeNoneGroupBar />}
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
                router.navigate('BloodSugarInfo');
              }}
            />
            <ChanllengeCard
              title="챌린지 - 오늘의 달성도"
              leftNumeric="3개"
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
              firstContent="오늘 총, 2회 측정 하였습니다."
              secondContent="저녁 식사 측정이 필요합니다."
              onPress={() => {
                router.navigate('MealInfo');
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
