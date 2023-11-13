import { fetchWithAuth } from '@/utils';

const getGroup = () => fetchWithAuth(`/group`);
export default getGroup;
