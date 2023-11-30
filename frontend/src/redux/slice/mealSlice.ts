import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/storeConfig';

interface mealState {
  mealtime: string | null;
  mealPK: number | null;
}

const initialState: mealState = {
  mealtime: null,
  mealPK: null,
};

export const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    setMealTime: (state, action: PayloadAction<string>) => {
      state.mealtime = action.payload;
    },
    setMealPK: (state, action: PayloadAction<number>) => {
      state.mealPK = action.payload;
    },
  },
});

export const { setMealTime, setMealPK } = mealSlice.actions;
export const selectMealTime = (state: RootState) => state.meal.mealtime;
export const selectMealPK = (state: RootState) => state.meal.mealPK;

export default mealSlice.reducer;
