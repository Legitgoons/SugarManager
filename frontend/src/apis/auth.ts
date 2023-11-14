import { RootState, store } from '@/redux/store/storeConfig';
import { fetchWithAuth } from '@/utils';
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

const postTokenRefresh = async () => {
  const state: RootState = store.getState();
  const { refreshToken } = state.user;

  const response = await fetchWithAuth('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
    wasRefreshing: true,
  });
  const data = await response.json();
  return data;
};
export { postKakaoSignin, postTokenRefresh };
