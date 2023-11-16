interface PostMemberPokeProps {
  nickname: string;
  type: 'CHALLENGE' | 'BLOODSUGAR';
  challengeId: string;
}

interface PostAlarmSaveProps {
  category: string;
  status: boolean;
  hour: number | null;
}

interface PostProfileEditProps {
  name: string;
  gender: 'MALE' | 'FEMALE' | null;
  birthday: string;
  nickname: string;
  height: number;
  weight: number;
  bloodSugarMin: number;
  bloodSugarMax: number;
}

export type { PostMemberPokeProps, PostAlarmSaveProps, PostProfileEditProps };
