import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Marks = { [key: string]: number };

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    scenario: 0,
    actors: 0,
    operator: 0,
  } as { [key: string]: number },
  reducers: {
    setScenario(state: Marks, action: PayloadAction<number>) {
      state.scenario = action.payload;
    },
    setActors(state: Marks, action: PayloadAction<number>) {
      state.actors = action.payload;
    },
    setOperator(state: Marks, action: PayloadAction<number>) {
      state.operator = action.payload;
    },
    clearMarks(state: Marks) {
      state.scenario = 0;
      state.actors = 0;
      state.operator = 0;
    },
  },
});

export default modalSlice.reducer;

export const { setScenario, setActors, setOperator, clearMarks } =
  modalSlice.actions;
