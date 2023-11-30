import { RootState, store } from '@/redux/store/storeConfig';
import {
  PostKakaoSigninProps,
  PostSignupProps,
  PostSigninProps,
} from '@/types/api/request/auth';
import { fetchWithAuth } from '@/utils';
import { API_ENDPOINT } from '@env';

const postKakaoSignin = async (props: PostKakaoSigninProps) => {
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

const PostSignup = async (props: PostSignupProps) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/signup`, {
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

const PostSignin = async (props: PostSigninProps) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/signin`, {
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
export { postKakaoSignin, postTokenRefresh, PostSignup, PostSignin };
