import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { getMealDetail } from '@/apis/meal';
import { BloodSugar, Food, MenuImage } from '@/types/api/response/meal';
import { useSelector } from 'react-redux';
import useRouter from '@/hooks/useRouter';
import { formatToMonthDay, formatToTime } from '@/utils/formatDate';
import { rWidth } from '@/utils';
import { selectMealPK } from '@/redux/slice/mealSlice';
import MainFillButton from '@/components/atoms/MainFillButton';
import DayCard from '@/components/molecules/DayCard';
import MealCard from '@/components/organisms/MealCard';
import BloodSugarContentCard from '@/components/organisms/BloodSugarContentCard';
import ImageScrollView from '@/components/molecules/ImageScrollView';
import PhotoModal from '@/components/organisms/PhotoModal';

const DetailContainer = styled.View`
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
  const [mealImage, setMealImage] = useState<MenuImage[]>([]);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [expandedImage, setExpandedImage] = useState('');
  const [mealBloodSugar, setMealBloodSugar] = useState<BloodSugar>();
  const [isTop, setIsTop] = useState(true);
  const menuPK = useSelector(selectMealPK);

  const handleScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const isScrolledToTop = contentOffset.y === 0;
    setIsTop(isScrolledToTop);
  };

  const photoModalOpen = () => {
    setPhotoModalVisible(true);
  };
  const photoModalClose = () => {
    setPhotoModalVisible(false);
  };

  const handleImagePress = (image: MenuImage) => {
    setExpandedImage(image.menuImageUrl);
    photoModalOpen();
  };

  useEffect(() => {
    const fetchDetailMeal = async () => {
      if (menuPK !== null) {
        const data = await getMealDetail({ menuPK });
        setTime(data.response.registedAt);
        setMealImage(data.response.menuImages);
        setFoodData(data.response.foods);
        setMealBloodSugar(data.response.bloodSugar);
      }
    };
    fetchDetailMeal();
  }, [menuPK]);

  return (
    <DetailContainer>
      <ScrollView onScroll={handleScroll}>
        <DayCard title={`${formatToMonthDay(time)} ${formatToTime(time)}`} />
        {(mealBloodSugar?.beforeLevel || mealBloodSugar?.afterLevel) && (
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
        {mealImage.length !== 0 && (
          <>
            <ImageScrollView
              images={mealImage}
              onImagePress={handleImagePress}
              isWrite={false}
            />
            <PhotoModal
              modalVisible={photoModalVisible}
              setModalVisible={photoModalClose}
              expandedImage={expandedImage}
            />
          </>
        )}
        {foodData.map(
          ({
            foodPk,
            foodName,
            foodCal,
            foodGrams,
            foodCarbohydrate,
            foodProtein,
            foodFat,
            foodSugars,
          }) => (
            <CardWrapper key={foodPk}>
              <MealCard
                topTitle={`${foodGrams}g`}
                topText={foodName}
                calorie={Math.round(foodCal)}
                sugar={foodSugars || 0}
                protein={foodProtein || 0}
                carbohydrate={foodCarbohydrate || 0}
                fat={foodFat || 0}
              />
            </CardWrapper>
          )
        )}
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
    </DetailContainer>
  );
}
