import { fetchWithAuth } from '@/utils';
import { MealSave } from '@/types/api/request/meal';
import formatDate from '@/utils/formatDate';

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

export { saveMeal, searchFood };
