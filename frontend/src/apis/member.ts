import PostMemberPokeProps from '@/types/api/request/member';
import { fetchWithAuth } from '@/utils';

const getMyProfile = () => fetchWithAuth(`/member`, { method: 'GET' });
const postMemberPoke = (props: PostMemberPokeProps) =>
  fetchWithAuth('/member/poke', { method: 'POST', body: props });

export { getMyProfile, postMemberPoke };
