import { API_ENDPOINT } from '@env';
import { store, RootState } from '@/redux/store/storeConfig';
import { BloodSugarWriteData } from '@/types/api/request/bloodSugar';

export default async function saveBloodSugar(data: BloodSugarWriteData) {
  const state: RootState = store.getState();
  const { accessToken } = state.user;
  const response = await fetch(`${API_ENDPOINT}/bloodsugar/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
}
