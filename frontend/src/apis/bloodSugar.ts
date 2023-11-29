import { BloodSugarWriteData } from '@/types/api/request/bloodSugar';
import { BloodSugarPeriodApiResponse } from '@/types/api/response/bloodSugar';
import { PeriodProps, DailyProps } from '@/types/api/request/fetchPeriod';
import { fetchWithAuth } from '@/utils';
import { periodDate } from '@/utils/formatDate';

export async function getPeriodBloodSugar({
  nickname,
  startDate,
  endDate,
  page,
}: PeriodProps): Promise<BloodSugarPeriodApiResponse> {
  const start = periodDate(startDate);
  const end = periodDate(endDate);

  return fetchWithAuth(
    `/bloodsugar/period/${nickname}/${start}/${end}/${page}`
  );
}

export const getDetailBloodSugar = ({
  nickname,
  year,
  month,
  day,
}: DailyProps) =>
  fetchWithAuth(`/bloodsugar/${nickname}/${year}/${month}/${day}`);

export const postSaveBloodSugar = (data: BloodSugarWriteData) =>
  fetchWithAuth('/bloodsugar/save', { body: data, method: 'POST' });
