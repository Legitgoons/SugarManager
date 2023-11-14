import TimelineRequestProps from '@/types/api/request/timeline';
import { fetchWithAuth } from '@/utils';

export const getTimelineState = ({
  nickname,
  year,
  month,
}: TimelineRequestProps) =>
  fetchWithAuth(`/timeline/${nickname}/${year}/${month}`);

export const getTimelineDetail = async ({
  nickname,
  year,
  month,
  day,
}: TimelineRequestProps) =>
  fetchWithAuth(`/timeline/${nickname}/${year}/${month}/${day}`);
