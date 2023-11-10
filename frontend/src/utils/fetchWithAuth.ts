import { API_ENDPOINT } from '@env';
import { store, RootState } from '@/redux/store/storeConfig';
import { navigate } from '@/navigation/NavigationService';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

const fetchWithAuth = async (
  url: string,
  options: FetchOptions = {}
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
    if (data.error !== null) {
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

    return data;
  } catch (error) {
    return error;
  }
};
export default fetchWithAuth;
