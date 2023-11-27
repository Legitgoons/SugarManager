import { API_ENDPOINT } from '@env';
import { store, RootState } from '@/redux/store/storeConfig';
import { BloodSugarWriteData } from '@/types/api/request/bloodSugar';
import { BloodSugarPeriodApiResponse } from '@/types/api/response/bloodSugar';
import { PeriodProps, DailyProps } from '@/types/api/request/fetchPeriod';
import { fetchWithAuth } from '@/utils';
import { periodDate } from '@/utils/formatDate';

export async function periodBloodSugar({
  nickname,
  startDate,
  endDate,
  page,
}: PeriodProps): Promise<BloodSugarPeriodApiResponse> {
  const state: RootState = store.getState();
  const { accessToken } = state.user;

  const start = periodDate(startDate);
  const end = periodDate(endDate);

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

export const dailyBloodSugar = ({ nickname, year, month, day }: DailyProps) =>
  fetchWithAuth(`/bloodsugar/${nickname}/${year}/${month}/${day}`);

export const saveBloodSugar = (data: BloodSugarWriteData) =>
  fetchWithAuth('/bloodsugar/save', { body: data, method: 'POST' });
