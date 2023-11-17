import { fetchWithAuth } from '@/utils';

const searchFood = async (food: string) => {
  const response = await fetchWithAuth(`/search/${food}`);
  return response;
};

export { searchFood };
