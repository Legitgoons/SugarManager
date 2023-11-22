import { fetchWithAuth } from '@/utils';
import { MealSave } from '@/types/api/request/meal';
import { store, RootState } from '@/redux/store/storeConfig';
import formatDate from '@/utils/formatDate';
import { periodProps } from '@/types/api/request/fetchPeriod';
import { API_ENDPOINT } from '@env';

const searchFood = async (food: string) => {
  const response = await fetchWithAuth(`/search/${food}`);
  return response;
};

// async function getBlob(uri: string) {
//   const response = await fetch(uri);
//   const blobData = await response.blob();
//   return blobData;
// }

const saveMeal = async (images: string[], date: Date, mealList: MealSave[]) => {
  // const blobs = await Promise.all(images.map((image) => getBlob(image)));
  // blobs.forEach((blob, i) => {
  //   formData.append('file', blob, `image_${i}.jpg`);
  // });
  // const formData = new FormData();
  const menuDto = {
    registedAt: formatDate(date),
    foods: mealList,
  };

  try {
    const fResponse = await fetchWithAuth('/menu/saveContent', {
      body: menuDto,
      method: 'POST',
    });

    if (!fResponse || !fResponse?.success) throw new Error();
    // const { menuPk } = fResponse.response;

    // images.forEach(async (cur) => {
    //   const sijal = await getBlob(cur);
    //   formData.append('file', sijal);
    // });
    // formData.append('menuPk', menuPk);

    // const sResponse = await fetchWithAuth('/menu/saveImage', {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   method: 'POST',
    //   body: formData,
    // });
    // return sResponse;
    return fResponse;
  } catch (e) {
    console.log(e);
  }
  // const formData = new FormData();

  // images.forEach(async (cur) => {
  //   const sijal = await getBlob(cur);
  //   formData.append('file', sijal);
  // });
  // formData.append('menuDto', JSON.stringify(menuDto));

  // const response = await fetchWithAuth(
  //   '/menu/save',
  //   {
  //     method: 'POST',
  //     body: formData,
  //   },
  //   true
  // );
  // return response;
};

const fetchMealData = async ({
  nickname,
  startDate,
  endDate,
  page,
}: periodProps) => {
  const state: RootState = store.getState();
  const { accessToken } = state.user;

  const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
  const startDay = startDate.getDate().toString().padStart(2, '0');

  const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0');
  const endDay = endDate.getDate().toString().padStart(2, '0');

  const start = `${startDate.getFullYear()}-${startMonth}-${startDay}`;
  const end = `${endDate.getFullYear()}-${endMonth}-${endDay}`;

  const response = await fetch(
    `${API_ENDPOINT}/menu/period/${nickname}/${start}/${end}/${page}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};

export { saveMeal, searchFood, fetchMealData };
