import {
  GetChallengeDetailProps,
  PostChallengeAddProps,
  PostChallengeDeleteProps,
} from '@/types/api/request/challenge';
import { fetchWithAuth } from '@/utils';

const getChallengeList = (nickname: string) =>
  fetchWithAuth(`/challenge/user/${nickname}`);

const getChallengeDetail = ({
  nickname,
  challengePk,
}: GetChallengeDetailProps) =>
  fetchWithAuth(`/challenge/user/${nickname}/${challengePk}`);

const postChallengeDelete = (challengePKArr: Array<PostChallengeDeleteProps>) =>
  fetchWithAuth(`/challenge/delete`, {
    method: 'POST',
    body: {
      deleteList: challengePKArr,
    },
  });

const postChallengeAdd = (props: PostChallengeAddProps) =>
  fetchWithAuth(`/challenge/add`, {
    method: 'POST',
    body: { ...props },
  });

const postChallengeClaim = (challengePk: number) =>
  fetchWithAuth(`/challenge/${challengePk}`, { method: 'POST' });

export {
  getChallengeList,
  postChallengeDelete,
  postChallengeAdd,
  getChallengeDetail,
  postChallengeClaim,
};
