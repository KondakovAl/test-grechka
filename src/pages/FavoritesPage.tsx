import { useSelector } from 'react-redux';

import { RootState } from '../store/store';

import { MovieCards } from '../components/MovieCards/MovieCards';

const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.favorites.data);

  return (
    <>
      {favorites.length > 0 ? (
        <MovieCards cards={favorites} />
      ) : (
        <div className='empty'>Ничего не добавлено</div>
      )}
    </>
  );
};

export { FavoritesPage };
