import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/storeConfig';

interface TimeState {
  value: string | null;
}

const initialState: TimeState = {
  value: null,
};

export const timeSlice = createSlice({
  name: 'bloodSugar',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setTime } = timeSlice.actions;
export const selectTime = (state: RootState) => state.time.value;
export default timeSlice.reducer;
