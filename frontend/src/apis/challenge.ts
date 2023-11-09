import fetchWithAuth from '@/utils/fetchWithAuth';

const getChallengeList = (nickname: string) =>
  fetchWithAuth(`/challenge/${nickname}`);

export default getChallengeList;
