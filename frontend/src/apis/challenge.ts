import { fetchWithAuth } from '@/utils';

const getChallengeList = (userPk: string) =>
  fetchWithAuth(`/challenge/user/${userPk}`);

const postChallengeDelete = (challengePK: Array<string>) =>
  fetchWithAuth(`/challenge/delete`, {
    method: 'POST',
    body: {
      challenge_pk: challengePK,
    },
  });
export { getChallengeList, postChallengeDelete };
