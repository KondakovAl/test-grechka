import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/favoritesSlice';
import { RootState } from '../../store/store';

import { onModalOpen } from '../../utils';

import { MovieCardProps, RatedCards } from '../../types/types';

import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';

interface MovieCardsProps {
  cards: MovieCardProps[];
}

const MovieCards = ({ cards }: MovieCardsProps) => {
  const dispatch = useDispatch();
  const rated = useSelector((state: RootState) => state.rated.data);
  const favorites = useSelector((state: RootState) => state.favorites.data);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<MovieCardProps | null>(null);

  return (
    <>
      <div className='movie'>
        <div className='movie__wrapper wrapper'>
          {cards &&
            cards.map((card) => (
              <div className='movie__card card' key={card.id}>
                <div className='card__image-container'>
                  <img src={card.src} alt={card.name} className='card__image' />
                </div>
                <div className='card__content'>
                  <h2 className='card__title'>{card.name}</h2>
                  <p className='card__description'>{card.description}</p>
                  <div className='card__buttons'>
                    <Button
                      className='card'
                      onClick={() => {
                        setCurrentCard(card);
                        setIsModalOpen(true);
                        onModalOpen();
                      }}
                    >
                      {!rated.find((item: RatedCards) => item.id === card.id)
                        ? 'Оценить'
                        : 'Изменить оценку'}
                    </Button>
                    {favorites.find(
                      (item: MovieCardProps) => item.id === card.id
                    ) ? (
                      <Button
                        className='card'
                        onClick={() => dispatch(removeFromFavorites(card.id))}
                      >
                        Убрать из избранного
                      </Button>
                    ) : (
                      <Button
                        className='card'
                        onClick={() => dispatch(addToFavorites(card))}
                      >
                        В Избранное
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isModalOpen && currentCard && (
        <Modal setIsModalOpen={setIsModalOpen} currentCard={currentCard} />
      )}
    </>
  );
};

export { MovieCards };
