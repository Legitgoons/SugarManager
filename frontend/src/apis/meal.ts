import { fetchWithAuth } from '@/utils';
import { MealSave } from '@/types/api/request/meal';
import formatDate from '@/utils/formatDate';

const searchFood = async (food: string) => {
  const response = await fetchWithAuth(`/search/${food}`);
  return response;
};

async function getBlob(uri: string) {
  const response = await fetch(uri);
  return response.blob();
}

const saveMeal = async (images: string[], date: Date, mealList: MealSave[]) => {
  const formData = new FormData();

  const blobs = await Promise.all(images.map((image) => getBlob(image)));
  blobs.forEach((blob, i) => {
    formData.append('menuImages', blob, `image_${i}.jpg`);
  });

  const menuDto = {
    registedAt: formatDate(date),
    foods: mealList,
  };
  formData.append('menuDto', JSON.stringify(menuDto));

  const response = await fetchWithAuth('/menu/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
  return response;
};

export { saveMeal, searchFood };
