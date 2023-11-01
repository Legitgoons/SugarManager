import axios from 'axios';
import { API_ENDPOINT } from '@env';

const AUTH_ENDPOINT = `${API_ENDPOINT}/auth`;

interface SigninProps {
  accessToken: string;
  fcmToken: string;
}
const postKakaoSignin = async (props: SigninProps) => {
  try {
    const res = await axios.post(`${AUTH_ENDPOINT}/kakao`, props, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  } catch (e) {
    return e;
  }
};

export default postKakaoSignin;
