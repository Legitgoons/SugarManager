import { useDispatch } from 'react-redux';
import { login as kakaoLogin } from '@react-native-seoul/kakao-login';
import { postKakaoSignin, PostSignin, getMyProfile } from '@/apis';
import { setKakaoToken, setProfile, setToken } from '@/redux/slice/userSlice';
import showAlert from '@/utils/alert';
import useRouter from '@/hooks/useRouter';
import { setNavigation } from '@/redux/slice/navigationSlice';
import alertConfig from '@/config/alertConfig';

const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { normalFail } = alertConfig;

  const handleSignInSuccess = async () => {
    const myProfile = await getMyProfile();
    if (myProfile.error === null) {
      if (myProfile.success === true) {
        dispatch(setProfile({ ...myProfile.response }));
        dispatch(
          setNavigation({
            isMine: true,
            uid: myProfile.response.uid,
            nickname: myProfile.response.nickname,
          })
        );
        router.navigate('Home');
      } else {
        throw new Error('로그인에 실패했습니다.');
      }
    } else {
      throw new Error(myProfile.error.message);
    }
  };

  const signInWithKakao = async () => {
    try {
      const { accessToken, refreshToken } = await kakaoLogin();
      dispatch(setKakaoToken({ accessToken, refreshToken }));

      const apiRes = await postKakaoSignin({ accessToken, fcmToken: '1234' });
      if (apiRes.error === null) {
        dispatch(
          setToken({
            accessToken: apiRes.response.accessToken,
            refreshToken: apiRes.response.refreshToken,
          })
        );
        await handleSignInSuccess();
      } else {
        throw new Error(apiRes.error.message);
      }
    } catch (error) {
      showAlert({
        title: normalFail.title('카카오 로그인 접근'),
        content: normalFail.content,
        onOk: () => {},
      });
    }
  };

  const signIn = async (id: string, pw: string) => {
    try {
      const apiRes = await PostSignin({ id, pw });
      if (apiRes.error === null) {
        dispatch(
          setToken({
            accessToken: apiRes.response.accessToken,
            refreshToken: apiRes.response.refreshToken,
          })
        );
        await handleSignInSuccess();
      } else {
        throw new Error(apiRes.error.message);
      }
    } catch (error) {
      showAlert({
        title: normalFail.title('로그인'),
        content: normalFail.content,
        onOk: () => {},
      });
    }
  };

  return { signInWithKakao, signIn };
};

export default useAuth;
