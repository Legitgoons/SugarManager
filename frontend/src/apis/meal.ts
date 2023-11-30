import { fetchWithAuth } from '@/utils';
import { MealSave, MealDetailProps } from '@/types/api/request/meal';
import { periodDate, formatToApiDateTime } from '@/utils/formatDate';
import { DailyProps, PeriodProps } from '@/types/api/request/fetchPeriod';

import RNFetchBlob from 'rn-fetch-blob';

const getsearchFood = async (food: string) => {
  const response = await fetchWithAuth(`/search/${food}`);
  return response;
};

const createFormData = async (photos: string[], body = {}) => {
  const data = new FormData();

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const imgBlob = await RNFetchBlob.fs.readFile(photo, 'base64');
    const blob = `data:image/jpg;base64,${imgBlob}`;

    data.append(`file${i}`, {
      uri: blob,
      type: 'image/jpg',
      name: `photo${i}.jpg`,
    });
  }

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const postSaveMeal = async (
  images: string[],
  date: Date,
  mealList: MealSave[]
) => {
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

    const { menuPk } = fResponse.response;
    const imageFormData = await createFormData(images, { menuPk });

    const sResponse = fetchWithAuth(
      '/menu/saveImage',
      {
        method: 'POST',
        body: imageFormData,
      },
      true
    );
    return sResponse;
  } catch (e) {
    return e;
  }
};

const getMealData = async ({
  nickname,
  startDate,
  endDate,
  page,
}: PeriodProps) => {
  const start = periodDate(startDate);
  const end = periodDate(endDate);
  return fetchWithAuth(`/menu/period/${nickname}/${start}/${end}/${page}`);
};

const getMealByDay = ({ nickname, year, month, day }: DailyProps) =>
  fetchWithAuth(`/menu/${nickname}/${year}/${month}/${day}`);

const getMealDetail = ({ menuPK }: MealDetailProps) =>
  fetchWithAuth(`/menu/${menuPK}`);

export {
  getsearchFood,
  postSaveMeal,
  getMealData,
  getMealByDay,
  getMealDetail,
};
