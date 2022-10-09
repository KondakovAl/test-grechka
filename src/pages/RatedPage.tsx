import { useSelector } from 'react-redux';

import { RootState } from '../store/store';

import { MovieCards } from '../components/MovieCards/MovieCards';

const RatedPage = () => {
  const rated = useSelector((state: RootState) => state.rated.data);
  return (
    <>
      {rated.length > 0 ? (
        <MovieCards cards={rated} />
      ) : (
        <div className='empty'>Ничего не добавлено</div>
      )}
    </>
  );
};

export { RatedPage };
