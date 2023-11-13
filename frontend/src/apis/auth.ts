import { API_ENDPOINT } from '@env';

interface SigninProps {
  accessToken: string;
  fcmToken: string;
}

const postKakaoSignin = async (props: SigninProps) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/kakao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

export default postKakaoSignin;
