import fetchWithAuth from '@/utils/fetchWithAuth';

const getGroup = () => fetchWithAuth(`/group`);

export default getGroup;
