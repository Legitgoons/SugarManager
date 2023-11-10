import { fetchWithAuth } from '@/utils';
import { API_ENDPOINT } from '@env';

interface SigninProps {
  access_token: string;
  fcm_token: string;
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

const postSignout = () => fetchWithAuth(`/auth/logout`);

export { postKakaoSignin, postSignout };
