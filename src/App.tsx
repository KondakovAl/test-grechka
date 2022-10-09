import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './assets/scss/index.scss';

import { Header } from './components/Header/Header';

import { MainPage } from './pages/MainPage';
import { RatedPage } from './pages/RatedPage';
import { FavoritesPage } from './pages/FavoritesPage';

import { fetchMovies } from './store/moviesSlice';
import { addManyToRated } from './store/ratedSlice';
import { AppDispatch, RootState } from './store/store';
import { addManyToFavourites } from './store/favoritesSlice';

const App = () => {
  const favorites = useSelector((state: RootState) => state.favorites.data);
  const rated = useSelector((state: RootState) => state.rated.data);
  const [isMount, setIsMount] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsMount(true);
    return () => setIsMount(false);
  }, []);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    dispatch(addManyToFavourites(savedFavorites));
  }, [dispatch]);

  useEffect(() => {
    if (isMount) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [isMount, favorites]);

  useEffect(() => {
    const savedRated = JSON.parse(localStorage.getItem('rated') || '[]');
    dispatch(addManyToRated(savedRated));
  }, [dispatch]);

  useEffect(() => {
    if (isMount) {
      localStorage.setItem('rated', JSON.stringify(rated));
    }
  }, [isMount, rated]);

  return (
    <div className='layout'>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/rated' element={<RatedPage />} />
      </Routes>
    </div>
  );
};

export { App };
