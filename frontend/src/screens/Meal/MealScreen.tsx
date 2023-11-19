import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { periodBloodSugar } from '@/apis/bloodSugar';
import { BloodSugarResponseData } from '@/types/api/request/bloodSugar';
import { useSelector } from 'react-redux';
import { selectNavigation } from '@/redux/slice/navigationSlice';
import useRouter from '@/hooks/useRouter';
import DatePickerController from '@/components/organisms/DatePickerController';
import MainFillButton from '@/components/atoms/MainFillButton';
import { rWidth } from '@/utils';
import MealHorizontalGraph from '@/components/molecules/MealHorizontalGraph';
import { DefaultText } from '@/styles';
import { rHeight } from '@/utils/style';

const BloodSugarContainer = styled.View`
  height: 100%;
  width: 100%;
  padding-top: 10%;
  justify-content: flex-start;
  align-items: center;
`;

const DatePickerControllerWrapper = styled.View`
  width: ${rWidth(320)}px;
`;

// const MealContentCardWrapper = styled.View`
// width: ${rWidth(320)}px;
// padding-top: ${rWidth(20)}px;
// `;

const FillButtonWrapper = styled.View`
  width: ${rWidth(320)}px;
  position: absolute;
  bottom: 52px;
  width: 100%;
  align-items: center;
`;

const TextBox = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: ${rHeight(20)}px;
`;
export default function MealScreen() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { nickname } = useSelector(selectNavigation);
  const [mealData, setMealData] = useState<BloodSugarResponseData[]>([]);
  const [page, setPage] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  let baseCarbohydrate = 0;
  let baseProtein = 0;
  let baseFat = 0;
  let curCarbohydrate = 0;
  let curProtein = 0;
  let curFat = 0;

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
    if (data.response.length === 0) {
      setIsEnd(true);
    } else {
      setMealData((prevData) => [...prevData, ...data.response]);
    }
  }, [nickname, startDate, endDate, page]);

  useEffect(() => {
    setMealData([]);
    setPage(0);
    setIsEnd(false);
  }, [nickname, startDate, endDate]);

  useEffect(() => {
    fetchBloodSugarData();
  }, [fetchBloodSugarData]);

  const handleScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
    const isScrolledToTop = contentOffset.y === 0;
    const isScrolledToBottom =
      Math.round(contentOffset.y + layoutMeasurement.height) >=
      Math.round(contentSize.height);
    setIsTop(isScrolledToTop);
    if (isScrolledToBottom && !isEnd) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const calculateMealSummary = () => {
    let carbohydrate = 0;
    let protein = 0;
    let fat = 0;
    let cnt = 0;

    mealData.forEach((item) => {
      cnt += 1;
      carbohydrate += item.dayFoodCarbohydrate || 0;
      protein += item.dayFoodProtein || 0;
      fat += item.dayFoodFat || 0;
    });
    return { carbohydrate, protein, fat, cnt };
  };

  if (mealData.length > 0) {
    baseCarbohydrate = 120 * mealData.length;
    baseProtein = 20 * mealData.length;
    baseFat = 25 * mealData.length;
    const { carbohydrate, protein, fat } = calculateMealSummary();
    curCarbohydrate += carbohydrate;
    curProtein += protein;
    curFat += fat;
  }

  return (
    <BloodSugarContainer>
      <ScrollView onScroll={handleScroll}>
        {mealData.length > 0 && (
          <>
            <MealHorizontalGraph
              carbohydrate={curCarbohydrate}
              protein={curProtein}
              fat={curFat}
            />
            <TextBox>
              <DefaultText color="secondary" typography="captionr">
                탄수화물 기준 섭취량 : {baseCarbohydrate}g 현재 섭취량 :
                {curCarbohydrate}g
              </DefaultText>
              <DefaultText color="secondary" typography="captionr">
                단백질 기준 섭취량 : {baseProtein}g 현재 섭취량 : {curProtein}g
              </DefaultText>
              <DefaultText color="secondary" typography="captionr">
                탄수화물 기준 섭취량 : {baseFat}g 현재 섭취량 : {curFat}g
              </DefaultText>
            </TextBox>
          </>
        )}
        <DatePickerControllerWrapper>
          <DatePickerController
            startDate={startDate}
            setStartDate={setStartDateSafe}
            endDate={endDate}
            setEndDate={setEndDateSafe}
          />
        </DatePickerControllerWrapper>
      </ScrollView>
      {isTop && (
        <FillButtonWrapper>
          <MainFillButton
            bgColor="b4"
            title="식사 등록하기"
            onPress={() => {
              router.navigate('MealWrite');
            }}
          />
        </FillButtonWrapper>
      )}
    </BloodSugarContainer>
  );
}
