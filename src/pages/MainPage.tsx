import { useSelector } from 'react-redux';

import { RootState } from '../store/store';

import { MovieCards } from '../components/MovieCards/MovieCards';

const MainPage = () => {
  const movies = useSelector((state: RootState) => state.movies.data);
  return <MovieCards cards={movies} />;
};

export { MainPage };
