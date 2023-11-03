import Calendar from '@/components/organisms/Calendar';
import HomeGroupBar from '@/components/organisms/HomeGroupBar';
import HomeHeader from '@/components/organisms/HomeHeader';
import { rWidth } from '@/utils/style';
import React, { useState } from 'react';
import styled from 'styled-components/native';

const HomeContainer = styled.View`
  width: ${rWidth(320)}px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function HomeScreen() {
  // /api/v1/timeline/{nickname}/{year}/{month}
  // const {} = useSuspenseQuery(['monthStatus'] queryFn : a});
  /*
    const [year, setYear] = useState(curDate.getFullYear());
  const [month, setMonth] = useState(curDate.getMonth() + 1);
  */
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
  const handlePressDay = () => {
    onClick;
  };
  return (
    <HomeContainer>
      <HomeHeader />
      <HomeGroupBar />
      <Calendar time={time} setTime={setTime} open={openDailyInfo} />
    </HomeContainer>
  );
}
