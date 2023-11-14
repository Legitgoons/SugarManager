/* eslint-disable no-underscore-dangle */
import { API_ENDPOINT } from '@env';
import { store, RootState, persistor } from '@/redux/store/storeConfig';
import { navigate } from '@/navigation/NavigationService';
import { postTokenRefresh } from '@/apis';
import { setAccessToken } from '@/redux/slice/userSlice';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, string>;
  wasRefreshing?: boolean;
}

const fetchWithAuth = async (
  url: string,
  options: FetchOptions = { wasRefreshing: false }
): Promise<any> => {
  const state: RootState = store.getState();
  const { accessToken } = state.user;

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...options.headers,
  });

  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  const fetchOptions: any = {
    ...options,
    headers,
    credentials: 'include',
  };

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_ENDPOINT}${url}`, fetchOptions);

    if (!response.ok) {
      throw response;
    }
    const data: any = await response.json();
    return data;
  } catch (error) {
    const { code } = JSON.parse((error as any)._bodyText).error;
    switch (code) {
      case 'U003':
        if (options.wasRefreshing) break;
        try {
          const refreshResponse = await postTokenRefresh();
          const data = await refreshResponse.json();
          store.dispatch(setAccessToken(data.response.accessToken));
          return fetchWithAuth(url, {
            ...options,
            wasRefreshing: true,
          });
        } catch (e) {
          await persistor.purge();
          navigate('Signin');
          return e;
        }
      default:
        break;
    }
    console.log('에러발생!', error);
    return error;
  }
};
export default fetchWithAuth;
