import { API_ENDPOINT } from '@env';
import fetchWithAuth from '@/utils/fetchWithAuth';

const AUTH_ENDPOINT = `${API_ENDPOINT}/auth`;
interface SigninProps {
  access_token: string;
  fcm_token: string;
}

const postKakaoSignin = async (props: SigninProps) => {
  try {
    const response = await fetch(`${AUTH_ENDPOINT}/kakao`, {
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

const postSignout = async () => {
  try {
    const result = await fetchWithAuth(`${AUTH_ENDPOINT}/logout`);
    return result;
  } catch (e) {
    return e;
  }
};

export { postKakaoSignin, postSignout };
