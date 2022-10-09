import { Marks, RatedCards } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RatedProps {
  data: RatedCards[];
}

const ratedSlice = createSlice({
  name: 'rated',
  initialState: {
    data: [],
  } as RatedProps,
  reducers: {
    addToRated(state: RatedProps, action: PayloadAction<RatedCards>) {
      state.data.push(action.payload);
    },
    changeRating(
      state: RatedProps,
      action: PayloadAction<{ id: number; marks: Marks }>
    ) {
      const index = state.data.findIndex(
        (item: RatedCards) => item.id === action.payload.id
      );
      state.data[index].marks = { ...action.payload.marks };
    },
    addManyToRated(state: RatedProps, action: PayloadAction<RatedCards[]>) {
      state.data = action.payload;
    },
  },
});

export default ratedSlice.reducer;

export const { addToRated, changeRating, addManyToRated } = ratedSlice.actions;
