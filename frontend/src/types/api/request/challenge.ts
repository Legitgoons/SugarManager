import Week from '@/types/week';

type ChallengeTypeEnum = 'CUSTOM' | 'WALK' | 'CHECK';

interface PostChallengeAddProps {
  title: string;
  goal: number;
  type: ChallengeTypeEnum;
  alert: boolean;
  hour: number;
  minute: number;
  days: Week[];
  userPk: string;
  nickname: string;
}

interface PostChallengeDeleteProps {
  nickname: string;
  challengePk: number;
}

interface GetChallengeDetailProps {
  nickname: string;
  challengePk: number;
}

export type {
  ChallengeTypeEnum,
  PostChallengeAddProps,
  PostChallengeDeleteProps,
  GetChallengeDetailProps,
};
