import { MovieCardProps } from '../types/types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface favoritesProps {
  data: MovieCardProps[];
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    data: [],
  } as favoritesProps,
  reducers: {
    addToFavorites(
      state: favoritesProps,
      action: PayloadAction<MovieCardProps>
    ) {
      state.data.push(action.payload);
    },
    removeFromFavorites(state: favoritesProps, action: PayloadAction<number>) {
      state.data = state.data.filter(
        (item: MovieCardProps) => item.id !== action.payload
      );
    },
    addManyToFavourites(
      state: favoritesProps,
      action: PayloadAction<MovieCardProps[]>
    ) {
      state.data = action.payload;
    },
  },
});

export default favoritesSlice.reducer;

export const { addToFavorites, removeFromFavorites, addManyToFavourites } =
  favoritesSlice.actions;
