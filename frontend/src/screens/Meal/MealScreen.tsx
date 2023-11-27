import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { fetchMealData } from '@/apis/meal';
import { MealPeriodResponseData } from '@/types/api/response/meal';
import { useSelector, useDispatch } from 'react-redux';
import { selectNavigation } from '@/redux/slice/navigationSlice';
import useRouter from '@/hooks/useRouter';
import DatePickerController from '@/components/organisms/DatePickerController';
import MainFillButton from '@/components/atoms/MainFillButton';
import { rWidth } from '@/utils';
import MealHorizontalGraph from '@/components/molecules/MealHorizontalGraph';
import { DefaultText } from '@/styles';
import { rHeight } from '@/utils/style';
import MealCard from '@/components/organisms/MealCard';
import { formatToMonthDay } from '@/utils/formatDate';
import { setMealTime } from '@/redux/slice/mealSlice';

const BloodSugarContainer = styled.View`
  height: 100%;
  width: 100%;
  padding-top: 10%;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const DatePickerControllerWrapper = styled.View`
  width: ${rWidth(320)}px;
`;

const CardWrapper = styled.View`
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

const TextBox = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: ${rHeight(20)}px;
`;
export default function MealScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { nickname } = useSelector(selectNavigation);
  const [mealData, setMealData] = useState<MealPeriodResponseData[]>([]);
  const [page, setPage] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

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

  const fetchMeal = useCallback(async () => {
    const data = await fetchMealData({
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
    fetchMeal();
  }, [fetchMeal]);

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
        {mealData.length > 0 &&
          (curCarbohydrate > 0 || curProtein > 0 || curFat > 0) && (
            <>
              <MealHorizontalGraph
                carbohydrate={curCarbohydrate}
                protein={curProtein}
                fat={curFat}
              />
              <TextBox>
                <DefaultText color="secondary" typography="captionr">
                  탄수화물 기준 섭취량 : {Math.round(baseCarbohydrate)}g 현재
                  섭취량 :{Math.round(curCarbohydrate)}g
                </DefaultText>
                <DefaultText color="secondary" typography="captionr">
                  단백질 기준 섭취량 : {Math.round(baseProtein)}g 현재 섭취량 :
                  {Math.round(curProtein)}g
                </DefaultText>
                <DefaultText color="secondary" typography="captionr">
                  탄수화물 기준 섭취량 : {Math.round(baseFat)}g 현재 섭취량 :
                  {Math.round(curFat)}g
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
        {mealData.map((meal) => (
          <CardWrapper key={meal.time}>
            <MealCard
              onPress={() => {
                dispatch(setMealTime(meal.time));
                router.navigate('MealDaily');
              }}
              topTitle=""
              topText={formatToMonthDay(meal.time)}
              calorie={Math.round(meal.dayFoodCal)}
              sugar={meal.dayFoodSugars || 0}
              protein={meal.dayFoodProtein || 0}
              carbohydrate={meal.dayFoodCarbohydrate || 0}
              fat={meal.dayFoodFat || 0}
            />
          </CardWrapper>
        ))}
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
