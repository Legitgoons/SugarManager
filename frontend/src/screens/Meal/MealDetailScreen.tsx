import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { getMealDetail } from '@/apis/meal';
import { BloodSugar, Food } from '@/types/api/response/meal';
import { useSelector } from 'react-redux';
import useRouter from '@/hooks/useRouter';
import { formatToMonthDay, formatToTime } from '@/utils/formatDate';
import { rWidth } from '@/utils';
import { selectMealPK } from '@/redux/slice/mealSlice';
import MainFillButton from '@/components/atoms/MainFillButton';
import DayCard from '@/components/molecules/DayCard';
import MealCard from '@/components/organisms/MealCard';
import BloodSugarContentCard from '@/components/organisms/BloodSugarContentCard';

/**
 * @Todo BloodSugar status 추가 구현시 적용
 */

const DailyContainer = styled.View`
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10%;
  background-color: ${({ theme }) => theme.colors.background};
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

export default function MealDetailScreen() {
  const router = useRouter();
  const [time, setTime] = useState<string>('');
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [mealBloodSugar, setMealBloodSugar] = useState<BloodSugar>();
  const [isTop, setIsTop] = useState(true);
  const menuPK = useSelector(selectMealPK);

  const handleScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const isScrolledToTop = contentOffset.y === 0;
    setIsTop(isScrolledToTop);
  };

  useEffect(() => {
    const fetchDetailMeal = async () => {
      if (menuPK !== null) {
        const data = await getMealDetail({ menuPK });
        setTime(data.response.registedAt);
        setFoodData(data.response.foods);
        setMealBloodSugar(data.response.bloodSugar);
      }
    };
    fetchDetailMeal();
  }, [menuPK]);

  return (
    <DailyContainer>
      <ScrollView onScroll={handleScroll}>
        <DayCard title={`${formatToMonthDay(time)} ${formatToTime(time)}`} />
        {mealBloodSugar && (
          <CardWrapper>
            <BloodSugarContentCard
              size="sm"
              beforeNum={mealBloodSugar.beforeLevel}
              beforeType={mealBloodSugar.beforeStatus}
              afterNum={mealBloodSugar.afterLevel}
              afterType={mealBloodSugar.afterStatus}
            />
          </CardWrapper>
        )}
        {foodData.map((food) => (
          <CardWrapper key={food.foodPk}>
            <MealCard
              topTitle={`${food.foodGrams}g`}
              topText={food.foodName}
              calorie={Math.round(food.foodCal)}
              sugar={food.foodSugars || 0}
              protein={food.foodProtein || 0}
              carbohydrate={food.foodCarbohydrate || 0}
              fat={food.foodFat || 0}
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
    </DailyContainer>
  );
}
