import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

interface userSliceStateType {
  nickName: string;
  email: string;
  kakaoAccessToken: string;
  kakaoRefreshToken: string;
  accessToken: string;
  refreshToken: string;
}
const initialState: userSliceStateType = {
  nickName: '',
  email: '',
  kakaoAccessToken: '',
  kakaoRefreshToken: '',
  accessToken: '',
  refreshToken: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.nickName = action.payload.nickName;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.kakaoAccessToken = action.payload.kakaoAccessToken;
      state.kakaoRefreshToken = action.payload.kakaoRefreshToken;
    },
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setKakaoToken(state, action) {
      state.kakaoAccessToken = action.payload.kakaoAccessToken;
      state.kakaoRefreshToken = action.payload.kakaoRefreshToken;
    },
    setNickName(state, action) {
      state.nickName = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setKakaoAccessToken(state, action) {
      state.kakaoAccessToken = action.payload;
    },
    setKakaoRefreshToken(state, action) {
      state.kakaoRefreshToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  setUser,
  setToken,
  setKakaoToken,
  setNickName,
  setEmail,
  setAccessToken,
  setRefreshToken,
  setKakaoAccessToken,
  setKakaoRefreshToken,
} = userSlice.actions;
export const selectUser = (state: any) => state.user;
export default userSlice.reducer;
