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
export { getChallengeList, postChallengeDelete };
