import {
  PostChallengeAddProps,
  PostChallengeDeleteProps,
} from '@/types/api/request/challenge';
import { fetchWithAuth } from '@/utils';

const getChallengeList = (nickname: string) =>
  fetchWithAuth(`/challenge/user/${nickname}`);

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

export { getChallengeList, postChallengeDelete, postChallengeAdd };
