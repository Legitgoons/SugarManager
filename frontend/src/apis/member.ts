import {
  PostMemberPokeProps,
  PostAlarmSaveProps,
  PostProfileEditProps,
} from '@/types/api/request/member';
import { fetchWithAuth } from '@/utils';

const getMyProfile = () => fetchWithAuth(`/member`, { method: 'GET' });
const postMemberPoke = (body: PostMemberPokeProps) =>
  fetchWithAuth('/member/poke', { method: 'POST', body });
const getMyAlarm = () => fetchWithAuth('/member/alarm', { method: 'GET' });
const postAlarmSave = (body: PostAlarmSaveProps) =>
  fetchWithAuth('/member/alarm/save', { method: 'POST', body });
const postProfileEdit = (body: PostProfileEditProps) =>
  fetchWithAuth('/member/edit', { method: 'POST', body });
const postMemberDelete = (nickname: string) =>
  fetchWithAuth('/member/delete', { method: 'POST', body: { nickname } });
export {
  getMyProfile,
  postMemberPoke,
  getMyAlarm,
  postAlarmSave,
  postProfileEdit,
  postMemberDelete,
};
