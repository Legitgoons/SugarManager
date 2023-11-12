import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

export interface NavigationSliceStateType {
  uid: number;
  nickname: string;
  isMine: boolean;
}
const initialState: NavigationSliceStateType = {
  uid: 0,
  nickname: '',
  isMine: false,
};
const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation(state, action) {
      state.uid = action.payload.uid;
      state.nickname = action.payload.nickname;
      state.isMine = action.payload.isMine;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setNavigation } = navigationSlice.actions;
export const selectNavigation = (state: any) => state.navigation;
export default navigationSlice.reducer;
