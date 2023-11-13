import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { rHeight } from '@/utils';
import { periodBloodSugar } from '@/apis/bloodSugar';
import { BloodSugarResponseData } from '@/types/api/request/bloodSugar';
import { useSelector } from 'react-redux';
import { selectNavigation } from '@/redux/slice/navigationSlice';
import useRouter from '@/hooks/useRouter';
import BloodSugarContentCard from '@/components/organisms/BloodSugarContentCard';
import DatePickerController from '@/components/organisms/DatePickerController';
import MainFillButton from '@/components/atoms/MainFillButton';

const BloodSugarContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  gap: ${rHeight(30)}px;
  align-items: center;
`;

const FillButtonWrapper = styled.View`
  position: absolute;
  bottom: 52px;
  width: 100%;
  align-items: center;
`;

export default function BloodSugarScreen() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { nickname } = useSelector(selectNavigation);
  const [bloodSugarData, setBloodSugarData] = useState<
    BloodSugarResponseData[]
  >([]);
  const [page, setPage] = useState(0);
  const [isTop, setIsTop] = useState(true);

  const setStartDateSafe = (date: Date) => {
    if (date > endDate) {
      setStartDate(endDate);
    } else {
      setStartDate(date);
    }
  };

  const setEndDateSafe = (date: Date) => {
    const now = new Date();
    if (date > now) {
      setEndDate(now);
    } else if (date < startDate) {
      setEndDate(startDate);
    } else {
      setEndDate(date);
    }
  };

  const fetchBloodSugarData = useCallback(async () => {
    const data = await periodBloodSugar({
      nickname,
      startDate,
      endDate,
      page,
    });
    setBloodSugarData((prevData) => [...prevData, ...data.response]);
  }, [nickname, startDate, endDate, page]);

  useEffect(() => {
    fetchBloodSugarData();
  }, [fetchBloodSugarData]);

  const handleScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
    const isScrolledToTop = contentOffset.y === 0;
    const isScrolledToBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height;
    setIsTop(isScrolledToTop);
    if (isScrolledToBottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <BloodSugarContainer>
      <ScrollView onScroll={handleScroll}>
        <DatePickerController
          startDate={startDate}
          setStartDate={setStartDateSafe}
          endDate={endDate}
          setEndDate={setEndDateSafe}
        />
        {bloodSugarData.map(
          (item) =>
            item.bloodSugarBefore != null &&
            item.bloodSugarAfter != null && (
              <BloodSugarContentCard
                key={item.time}
                date={item.time}
                count={item.count}
                beforeNum={item.bloodSugarBefore}
                beforeType="warning"
                afterNum={item.bloodSugarAfter}
                afterType="safety"
              />
            )
        )}
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
    </BloodSugarContainer>
  );
}
