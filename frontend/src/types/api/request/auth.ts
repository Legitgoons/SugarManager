interface PostKakaoSigninProps {
  accessToken: string;
  fcmToken: string;
}

interface PostSignupProps {
  id: string;
  pw: string;
  email: string;
  name: string;
  nickname: string;
  fcmToken: string;
}

interface PostSigninProps {
  id: string;
  pw: string;
}
export type { PostKakaoSigninProps, PostSignupProps, PostSigninProps };
