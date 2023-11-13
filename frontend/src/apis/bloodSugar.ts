import { API_ENDPOINT } from '@env';
import { store, RootState } from '@/redux/store/storeConfig';
import {
  BloodSugarWriteData,
  periodBloodSugarProps,
  BloodSugarApiResponse,
} from '@/types/api/request/bloodSugar';

export async function periodBloodSugar({
  nickname,
  startDate,
  endDate,
  page,
}: periodBloodSugarProps): Promise<BloodSugarApiResponse> {
  const state: RootState = store.getState();
  const { accessToken } = state.user;

  const start = `${startDate.getFullYear()}-${
    startDate.getMonth() + 1
  }-${startDate.getDate()}`;
  const end = `${endDate.getFullYear()}-${
    endDate.getMonth() + 1
  }-${endDate.getDate()}`;

  const response = await fetch(
    `${API_ENDPOINT}/bloodsugar/period/${nickname}/${start}/${end}/${page}`,
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
}

export async function saveBloodSugar(data: BloodSugarWriteData) {
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
