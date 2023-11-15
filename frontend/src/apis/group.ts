import { fetchWithAuth } from '@/utils';

const getGroup = () => fetchWithAuth(`/group`);
const postGroupLeave = () => fetchWithAuth('/group/leave');
export { getGroup, postGroupLeave };
