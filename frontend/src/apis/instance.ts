import { navigate } from '@/navigation/NavigationService';
import { store, RootState } from '@/redux/store/storeConfig';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const { accessToken } = state.user;
    if (config.headers && accessToken) {
      config.headers.authorization = `Bearer: ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    const { data } = response;

    if (data?.error) {
      /*
        1. token Refreshing ->  token refresh -> re-request
          - U003(JWT 만료)
        2. can't token Refreshing -> navigate signin
          - U001(인증 실패), U002(권한 없음)
      */
      switch (data.error.code) {
        case 'U003':
          console.log('need TokenRefreshing');
          break;
        case 'U001' || 'U002':
          navigate('Signin');
          break;
        default:
          break;
      }
    }
    return response;
  },
  async (error) => error
);

export default instance;
