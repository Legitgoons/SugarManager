import fetchWithAuth from '@/utils/fetchWithAuth';

const getMyProfile = async () => {
  const response = await fetchWithAuth(`/member`, {
    method: 'GET',
  });
  return response;
};

export default getMyProfile;
