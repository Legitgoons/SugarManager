import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { BloodSugarDetailResponseData } from '@/types/api/response/bloodSugar';
import { useSelector } from 'react-redux';
import { selectNavigation } from '@/redux/slice/navigationSlice';
import useRouter from '@/hooks/useRouter';
import MainFillButton from '@/components/atoms/MainFillButton';
import { rWidth } from '@/utils';
import BloodSugarDetailCard from '@/components/organisms/BloodSugarDetailCard';
import { selectTime } from '@/redux/slice/bloodSugarSlice';
import { dailyBloodSugar } from '@/apis/bloodSugar';
import DayCard from '@/components/molecules/DayCard';

const DetailContainer = styled.View`
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const DetailContentCardWrapper = styled.View`
  width: ${rWidth(320)}px;
  padding-top: ${rWidth(20)}px;
`;

const FillButtonWrapper = styled.View`
  width: ${rWidth(320)}px;
  position: absolute;
  bottom: 52px;
  width: 100%;
  align-items: center;
`;

export default function BloodSugarDetailScreen() {
  const router = useRouter();
  const { nickname } = useSelector(selectNavigation);
  const [bloodSugarDetailData, setBloodSugarDetailData] = useState<
    BloodSugarDetailResponseData[]
  >([]);
  const [isTop, setIsTop] = useState(true);
  const time = useSelector(selectTime);
  const [year, month, day] = time.split('-');

  const handleScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const isScrolledToTop = contentOffset.y === 0;
    setIsTop(isScrolledToTop);
  };
  useEffect(() => {
    const fetchBloodSugarDetailData = async () => {
      const data = await dailyBloodSugar({ nickname, year, month, day });
      console.log(data.response.list);
      setBloodSugarDetailData(data.response.list);
    };
    fetchBloodSugarDetailData();
  }, [nickname, year, month, day]);

  return (
    <DetailContainer>
      <ScrollView onScroll={handleScroll}>
        <DayCard title={`${year}.${month}.${day}`} />
        {bloodSugarDetailData.map((item) => (
          <DetailContentCardWrapper key={item.registedAt}>
            <BloodSugarDetailCard
              key={item.registedAt}
              count={1}
              time={item.registedAt}
              isbefore={item.category === 'BEFORE'}
              bloodSugarNum={item.level}
              bloodSugarType={item.status}
              issue={item.content || undefined}
              size={item.content ? 'lg' : 'md'}
            />
          </DetailContentCardWrapper>
        ))}
      </ScrollView>
      {isTop && (
        <FillButtonWrapper>
          <MainFillButton
            bgColor="b4"
            title="혈당 등록하기"
            onPress={() => {
              router.navigate('BloodSugarWrite');
            }}
          />
        </FillButtonWrapper>
      )}
    </DetailContainer>
  );
}
