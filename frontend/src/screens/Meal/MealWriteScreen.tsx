import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, Pressable, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils/style';
import MainFillButton from '@/components/atoms/MainFillButton';
import DefaultScreenContainer from '@/styles/Container';
import SubFillButton from '@/components/atoms/SubFillButton';
import MealWriteAddPhoto from '@/components/molecules/MealWriteAddPhoto';
import InputLine from '@/components/molecules/InputLine';
import TextDatePicker from '@/components/molecules/TextDatePicker';
import PhotoModal from '@/components/organisms/PhotoModal';
import DefaultModal from '@/components/organisms/DefaultModal';
import MealRegistModalContent from '@/components/organisms/MealRegistModalContent';
import { searchFood, saveMeal } from '@/apis/meal';
import { foodNutrients, MealSave } from '@/types/api/request/meal';
import MealCard from '@/components/molecules/MealCard';
import { showAlert } from '@/utils';

const MealWriteContainer = styled(DefaultScreenContainer)`
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10%;
  gap: ${rHeight(30)}px;
`;

const TextDatePickerWrapper = styled.View`
  width: ${rWidth(320)}px;
  align-items: flex-end;
  justify-content: flex-end;
`;

const SearchBox = styled.View`
  width: ${rWidth(320)}px;
  flex-direction: row;
`;
const MealCardWrapper = styled.View`
  padding-bottom: ${rHeight(20)}px;
`;
const FlatListWrapper = styled.View`
  width: ${rWidth(320)}px;
  height: ${rHeight(100)}px;
  flex-direction: row;
`;

const MainFillButtonWrapper = styled.View`
  width: ${rWidth(320)}px;
  position: absolute;
  bottom: 52px;
  width: 100%;
  align-items: center;
`;

export default function MealWriteScreen() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [expandedImage, setExpandedImage] = useState('');
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
  const [calorie, setCalorie] = useState(0);
  const [searchResults, setSearchResults] = useState<foodNutrients[]>([]);
  const [mealList, setMealList] = useState<MealSave[]>([]);
  const [registmModalVisible, setRegistModalVisible] = useState(false);
  const [registByUser, setRegistByUser] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const title = '등록에 실패했습니다.';
  const content = '다시 시도해주세요.';
  const onOk = () => {};

  const foodReset = () => {
    setFoodName('');
    setAmount(0);
    setSugar(0);
    setCarbohydrate(0);
    setFat(0);
    setProtein(0);
    setCalorie(0);
    setRegistByUser(false);
  };
  const photoModalOpen = () => {
    setPhotoModalVisible(true);
  };
  const photoModalClose = () => {
    setPhotoModalVisible(false);
  };
  const registModalOpen = () => {
    setRegistModalVisible(true);
  };
  const registModalClose = () => {
    foodReset();
    setRegistModalVisible(false);
  };

  const deleteImage = () => {
    setSelectedImages(
      selectedImages.filter((image) => image !== expandedImage)
    );
    setPhotoModalVisible(false);
  };

  const setDateSafe = useCallback((newDate: Date) => {
    if (newDate > new Date()) {
      setDate(new Date());
    } else {
      setDate(newDate);
    }
  }, []);

  useEffect(() => {
    const fetchSearchFood = async () => {
      const res = await searchFood(search);
      if (!res.success) {
        throw new Error('API 요청에 실패했습니다.');
      }
      setSearchResults(res.response);
    };

    const debounce = setTimeout(async () => {
      if (search) {
        await fetchSearchFood();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [search]);

  const handleMealSave = () => {
    setMealList((prevMealList) => [
      ...prevMealList,
      {
        foodName,
        foodCal: calorie,
        foodGrams: amount,
        foodCarbohydrate: carbohydrate,
        foodProtein: protein,
        foodDietaryFiber: 0,
        foodVitamin: 0,
        foodSalt: 0,
        foodSugars: sugar,
        foodFat: fat,
      },
    ]);
    registModalClose();
  };

  const registerUserMeal = () => {
    setRegistByUser(true);
    setFoodName(search);
    registModalOpen();
  };

  const handleScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const isScrolledToTop = contentOffset.y === 0;
    setIsTop(isScrolledToTop);
  };

  useEffect(() => {
    if (mealList.length === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [mealList]);

  const handleSubmit = async () => {
    try {
      const result = await saveMeal(selectedImages, date, mealList);
      if (result.success) {
        foodReset();
        setMealList([]);
        setSearch('');
        setSelectedImages([]);
        setExpandedImage('');
      } else {
        showAlert({ title, content, onOk });
      }
    } catch (error) {
      showAlert({ title, content, onOk });
    }
  };

  return (
    <MealWriteContainer>
      <MealWriteAddPhoto
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        setExpandedImage={setExpandedImage}
        photoModalOpen={photoModalOpen}
      />
      <PhotoModal
        modalVisible={photoModalVisible}
        setModalVisible={photoModalClose}
        expandedImage={expandedImage}
        deleteImg={deleteImage}
      />
      <TextDatePickerWrapper>
        <TextDatePicker date={date} setDate={setDateSafe} mode="datetime" />
      </TextDatePickerWrapper>
      <SearchBox>
        <InputLine
          placeholder="메뉴를 입력해주세요"
          value={search}
          onChangeText={setSearch}
          width={260}
        />
        <SubFillButton
          bgColor="b4"
          title="직접 등록"
          onPress={registerUserMeal}
          size="sm"
        />
      </SearchBox>
      <FlatListWrapper>
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setAmount(item.nutrientsAmount);
                setFoodName(item.nutrientsName);
                setCalorie(item.nutrientsKcal);
                setProtein(item.nutrientsProtein);
                setFat(item.nutrientsFat);
                setCarbohydrate(item.nutrientsCh);
                setSugar(item.nutrientsSugar);
                registModalOpen();
              }}
            >
              <Text>{item.nutrientsName}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => (item ? item.nutrientsPk.toString() : '')}
        />
      </FlatListWrapper>
      <DefaultModal
        modalVisible={registmModalVisible}
        setModalVisible={setRegistModalVisible}
        mainTitle="식단에 추가하기"
        leftBtnTitle="뒤로가기"
        onLeftPress={registModalClose}
        rightBtnTitle="추가하기"
        onRightPress={handleMealSave}
      >
        <MealRegistModalContent
          registByUser={registByUser}
          amount={amount}
          setAmount={setAmount}
          foodName={
            foodName.length > 6 ? `${foodName.substring(0, 6)}...` : foodName
          }
          setFoodName={setFoodName}
          sugar={sugar}
          setSugar={setSugar}
          carbohydrate={carbohydrate}
          setCarbohydrate={setCarbohydrate}
          fat={fat}
          setFat={setFat}
          protein={protein}
          setProtein={setProtein}
          calorie={calorie}
          setCalorie={setCalorie}
        />
      </DefaultModal>
      <ScrollView onScroll={handleScroll}>
        {mealList.map((meal) => (
          <MealCardWrapper>
            <MealCard
              key={meal.foodName}
              topTitle={`${meal.foodGrams}g`}
              topText={meal.foodName}
              calorie={meal.foodCal}
              sugar={meal.foodSugars}
              protein={meal.foodProtein}
              carbohydrate={meal.foodCarbohydrate}
              fat={meal.foodFat}
            />
          </MealCardWrapper>
        ))}
      </ScrollView>
      {isTop && (
        <MainFillButtonWrapper>
          <MainFillButton
            title="등록"
            bgColor={buttonDisabled ? 'b3' : 'b4'}
            disabled={buttonDisabled}
            onPress={handleSubmit}
          />
        </MainFillButtonWrapper>
      )}
    </MealWriteContainer>
  );
}
