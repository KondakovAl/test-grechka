import { combineReducers, configureStore } from '@reduxjs/toolkit';

import modalSlice from './modalSlice';
import ratedSlice from './ratedSlice';
import moviesSlice from './moviesSlice';
import favoritesSlice from './favoritesSlice';

const rootReducer = combineReducers({
  movies: moviesSlice,
  favorites: favoritesSlice,
  rated: ratedSlice,
  modal: modalSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
