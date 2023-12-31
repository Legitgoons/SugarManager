import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

interface UserSliceStateType {
  isSignin: boolean;
  uid: string;
  name: string;
  nickname: string;
  email: string;
  gender: string;
  birthday: string;
  height: number;
  weight: number;
  bloodSugarMin: number;
  bloodSugarMax: number;
  profileImage: string;
  groupCode: string;
  kakaoAccessToken: string;
  kakaoRefreshToken: string;
  accessToken: string;
  refreshToken: string;
}
const initialState: UserSliceStateType = {
  isSignin: false,
  uid: '',
  name: '',
  nickname: '',
  email: '',
  gender: '',
  birthday: '',
  height: -1,
  weight: -1,
  bloodSugarMax: -1,
  bloodSugarMin: -1,
  profileImage: '',
  groupCode: '',
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
      state.isSignin = action.payload.isSignin;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.gender = action.payload.gender;
      state.birthday = action.payload.birthday;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
      state.bloodSugarMax = action.payload.bloodSugarMax;
      state.bloodSugarMin = action.payload.bloodSugarMin;
      state.profileImage = action.payload.profileImage;
      state.groupCode = action.payload.groupCode;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.kakaoAccessToken = action.payload.kakaoAccessToken;
      state.kakaoRefreshToken = action.payload.kakaoRefreshToken;
    },
    setProfile(state, action) {
      state.isSignin = true;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.gender = action.payload.gender;
      state.birthday = action.payload.birthday;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
      state.bloodSugarMax = action.payload.bloodSugarMax;
      state.bloodSugarMin = action.payload.bloodSugarMin;
      state.profileImage = action.payload.profileImage;
      state.groupCode = action.payload.groupCode;
    },
    setProfileSetting(state, action) {
      state.nickname = action.payload.nickname;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
      state.gender = action.payload.gender;
      state.bloodSugarMax = action.payload.bloodSugarMax;
      state.bloodSugarMin = action.payload.bloodSugarMin;
    },
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setKakaoToken(state, action) {
      state.kakaoAccessToken = action.payload.kakaoAccessToken;
      state.kakaoRefreshToken = action.payload.kakaoRefreshToken;
    },
    setIsSignin(state, action) {
      state.isSignin = action.payload;
    },
    setNickname(state, action) {
      state.nickname = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    setBirthday(state, action) {
      state.birthday = action.payload;
    },
    setHeight(state, action) {
      state.height = action.payload;
    },
    setWeight(state, action) {
      state.weight = action.payload;
    },
    setBloodSugarMin(state, action) {
      state.bloodSugarMin = action.payload;
    },
    setBloodSugarMax(state, action) {
      state.bloodSugarMax = action.payload;
    },
    setGroupCode(state, action) {
      state.groupCode = action.payload;
    },
    setProfileImage(state, action) {
      state.profileImage = action.payload;
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
  setProfile,
  setProfileSetting,
  setToken,
  setKakaoToken,
  setIsSignin,
  setNickname,
  setEmail,
  setGender,
  setBirthday,
  setHeight,
  setWeight,
  setBloodSugarMax,
  setBloodSugarMin,
  setGroupCode,
  setAccessToken,
  setRefreshToken,
  setKakaoAccessToken,
  setKakaoRefreshToken,
  setProfileImage,
} = userSlice.actions;
export const selectUser = (state: any) => state.user;
export default userSlice.reducer;
