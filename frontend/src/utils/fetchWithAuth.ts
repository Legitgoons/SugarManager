import { API_ENDPOINT } from '@env';
import { store, RootState, persistor } from '@/redux/store/storeConfig';
import { reset } from '@/navigation/NavigationService';
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
  const { accessToken, uid } = state.user;
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Authorization-Id': uid.toString(),
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
    const errorResponse = await (error as any).json();
    if (errorResponse === undefined) {
      await persistor.purge();
      reset('Signin');
      return error;
    }
    switch (errorResponse.error.code) {
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
          reset('Signin');
          return e;
        }
      default:
        break;
    }
    return error;
  }
};
export default fetchWithAuth;
