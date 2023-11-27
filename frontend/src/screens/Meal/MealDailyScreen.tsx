import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Meals } from '@/types/api/response/meal';
import { useSelector, useDispatch } from 'react-redux';
import { selectNavigation } from '@/redux/slice/navigationSlice';
import useRouter from '@/hooks/useRouter';
import MainFillButton from '@/components/atoms/MainFillButton';
import { rWidth } from '@/utils';
import { selectMealTime, setMealPK } from '@/redux/slice/mealSlice';
import DayCard from '@/components/molecules/DayCard';
import MealCard from '@/components/organisms/MealCard';
import { formatToTime } from '@/utils/formatDate';
import { getMealByDay } from '@/apis/meal';

const DailyContainer = styled.View`
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const DailyContentCardWrapper = styled.View`
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

export default function MealDailyScreen() {
  const router = useRouter();
  const { nickname } = useSelector(selectNavigation);
  const [mealDailyData, setmealDailyData] = useState<Meals[]>([]);
  const [isTop, setIsTop] = useState(true);
  const time = useSelector(selectMealTime);
  const [year, month, day] = time ? time.split('-') : ['', '', ''];
  const dispatch = useDispatch();

  const handleScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const isScrolledToTop = contentOffset.y === 0;
    setIsTop(isScrolledToTop);
  };

  useEffect(() => {
    const fetchDailyMeal = async () => {
      const data = await getMealByDay({ nickname, year, month, day });
      setmealDailyData(data.response.menuPreviews);
    };
    fetchDailyMeal();
  }, [nickname, year, month, day]);
  return (
    <DailyContainer>
      <ScrollView onScroll={handleScroll}>
        <DayCard title={`${year}.${month}.${day}`} />
        {mealDailyData.map((meal, index) => (
          <DailyContentCardWrapper key={meal.menuPk}>
            <MealCard
              onPress={() => {
                dispatch(setMealPK(meal.menuPk));
                router.navigate('MealDetail');
              }}
              topTitle={`${index + 1}회`}
              topText={formatToTime(meal.registedAt)}
              calorie={Math.round(meal.foodCal)}
              sugar={meal.foodSugars || 0}
              protein={meal.foodProtein || 0}
              carbohydrate={meal.foodCarbohydrate || 0}
              fat={meal.foodFat || 0}
            />
          </DailyContentCardWrapper>
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
    </DailyContainer>
  );
}
