import TimelineRequestProps from '@/types/api/request/timeline';
import { fetchWithAuth } from '@/utils';

export const getTimelineState = ({
  userPk,
  year,
  month,
}: TimelineRequestProps) =>
  fetchWithAuth(`/timeline/${userPk}/${year}/${month}`);

export const getTimelineDetail = async ({
  userPk,
  year,
  month,
  day,
}: TimelineRequestProps) =>
  fetchWithAuth(`/timeline/${userPk}/${year}/${month}/${day}`);
