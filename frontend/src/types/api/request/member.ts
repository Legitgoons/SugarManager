interface PostMemberPokeProps {
  nickname: string;
  category: 'CHALLENGE' | 'BLOODSUGAR';
  challengeId: string;
}

interface PostAlarmSaveProps {
  category: string;
  status: boolean;
  hour: number | null;
}

export type { PostMemberPokeProps, PostAlarmSaveProps };
