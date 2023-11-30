import { fetchWithAuth } from '@/utils';

const getGroup = () => fetchWithAuth(`/group`);
const postGroupLeave = () => fetchWithAuth('/group/leave', { method: 'POST' });
const postGroupCraete = () =>
  fetchWithAuth('/group/create', { method: 'POST' });
const postGroupJoin = (groupCode: string) =>
  fetchWithAuth('/group/join', { body: { groupCode }, method: 'POST' });

export { getGroup, postGroupLeave, postGroupCraete, postGroupJoin };
