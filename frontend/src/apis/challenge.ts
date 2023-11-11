import PostChallengeAddProps from '@/types/api/request/challenge';
import { fetchWithAuth } from '@/utils';

const getChallengeList = (nickname: string) =>
  fetchWithAuth(`/challenge/${nickname}`);

const postChallengeDelete = (challengePK: Array<string>) =>
  fetchWithAuth(`/challenge/delete`, {
    method: 'POST',
    body: {
      challenge_pk: challengePK,
    },
  });

const postChallengeAdd = (props: PostChallengeAddProps) =>
  fetchWithAuth(`/challenge/add`, {
    method: 'POST',
    body: { ...props },
  });

export { getChallengeList, postChallengeDelete, postChallengeAdd };
