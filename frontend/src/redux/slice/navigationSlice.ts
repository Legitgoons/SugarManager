import { createSlice } from '@reduxjs/toolkit';

export interface NavigationSliceStateType {
  nickname: string;
  isMine: boolean;
}
const initialState: NavigationSliceStateType = {
  nickname: '',
  isMine: false,
};
const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation(state, action) {
      state.nickname = action.payload.nickname;
      state.isMine = action.payload.isMine;
    },
  },
});

export const { setNavigation } = navigationSlice.actions;
export const selectNavigation = (state: any) => state.navigation;
export default navigationSlice.reducer;
