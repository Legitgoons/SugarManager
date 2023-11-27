import { fetchWithAuth } from '@/utils';
import { MealSave, MealDetailProps } from '@/types/api/request/meal';
import { store, RootState } from '@/redux/store/storeConfig';
import { formatToApiDateTime } from '@/utils/formatDate';
import { DailyProps, PeriodProps } from '@/types/api/request/fetchPeriod';
import { API_ENDPOINT } from '@env';
import periodDate from '@/utils/periodDate';

const searchFood = async (food: string) => {
  const response = await fetchWithAuth(`/search/${food}`);
  return response;
};

async function getBlob(uri: string) {
  const response = await fetch(uri);
  const blobData = await response.blob();
  return blobData;
}

const saveMeal = async (images: string[], date: Date, mealList: MealSave[]) => {
  const formData = new FormData();

  const menuDto = {
    registedAt: formatToApiDateTime(date),
    foods: mealList,
  };

  try {
    const fResponse = await fetchWithAuth('/menu/saveContent', {
      body: menuDto,
      method: 'POST',
    });

    if (!fResponse || !fResponse?.success) {
      throw new Error();
    } else if (images.length === 0) return fResponse;

    const blobs = await Promise.all(images.map((image) => getBlob(image)));
    blobs.forEach((blob, i) => {
      formData.append('file', blob, `image_${i}.jpg`);
    });

    const { menuPk } = fResponse.response;

    images.forEach(async (cur) => {
      const sijal = await getBlob(cur);
      formData.append('file', sijal);
    });
    formData.append('menuPk', menuPk);

    const sResponse = await fetchWithAuth('/menu/saveImage', {
      headers: { 'Content-Type': 'MultiPart' },
      method: 'POST',
      body: formData,
    });
    return sResponse;
  } catch (e) {
    return e;
  }
};

const fetchMealData = async ({
  nickname,
  startDate,
  endDate,
  page,
}: PeriodProps) => {
  const state: RootState = store.getState();
  const { accessToken } = state.user;

  const start = periodDate(startDate);
  const end = periodDate(endDate);

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

const getMealByDay = ({ nickname, year, month, day }: DailyProps) =>
  fetchWithAuth(`/menu/${nickname}/${year}/${month}/${day}`);

const getMealDetail = ({ menuPK }: MealDetailProps) =>
  fetchWithAuth(`/menu/${menuPK}`);

export { saveMeal, searchFood, fetchMealData, getMealByDay, getMealDetail };
