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
  (response) => response,
  async (error) => error
);

export default instance;
