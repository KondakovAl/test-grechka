import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MovieCardProps } from '../types/types';

export const fetchMovies: AsyncThunk<MovieCardProps[], void, {}> =
  createAsyncThunk('/movies/fetchMovies', async function () {
    const res = await fetch(
      'https://run.mocky.io/v3/f41356c2-e1ee-4fe3-aad7-62e2c5bb68a4'
    );
    const data = await res.json();
    return data.data as MovieCardProps[];
  });

interface moviesState {
  data: MovieCardProps[];
  status: 'loading' | 'resolved' | 'rejected';
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    data: [],
    status: 'loading',
  } as moviesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'resolved';
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export default moviesSlice.reducer;
