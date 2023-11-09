import TimelineRequestProps from '@/types/api/request/timeline';
import fetchWithAuth from '@/utils/fetchWithAuth';

export const getTimelineState = async ({
  nickname,
  year,
  month,
}: TimelineRequestProps): Promise<any> => {
  const result = await fetchWithAuth(`/timeline/${nickname}/${year}/${month}`);
  return result;
};
export const getTimelineDetail = async ({
  nickname,
  year,
  month,
  day,
}: TimelineRequestProps) => {
  try {
    const result = await fetchWithAuth(
      `/timeline/${nickname}/${year}/${month}/${day}`
    );
    return result;
  } catch (e) {
    return e;
  }
};
