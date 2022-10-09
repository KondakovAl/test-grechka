import { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { ReactComponent as Star } from '../../assets/images/icon_star.svg';
import { addToRated, changeRating } from '../../store/ratedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { onModalClose } from '../../utils';
import {
  clearMarks,
  setActors,
  setOperator,
  setScenario,
} from '../../store/modalSlice';
import { RootState } from '../../store/store';
import { MovieCardProps, RatedCards } from '../../types/types';

interface ModalFeatureProps {
  feature: { type: 'scenario' | 'actors' | 'operator'; name: string };
  setMark: (mark: number) => void;
}

const ModalFeature = ({ feature, setMark }: ModalFeatureProps) => {
  const [hover, setHover] = useState<number | null>(0);
  const modalState = useSelector((state: RootState) => state.modal);

  return (
    <div className='modal__feature'>
      <h3 className='modal__feature-title'>
        {feature.name}
        <sup>*</sup>:
      </h3>
      <div className='modal__rating rating'>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label className='rating__label' key={index}>
              <div
                className={`rating__container ${
                  ratingValue <= (hover || modalState[feature.type])
                    ? '--fill'
                    : ''
                }`}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              >
                <Star />
              </div>
              <input
                type='radio'
                className='rating__input'
                name={feature.type}
                value={modalState[feature.type]}
                onClick={() => setMark(ratingValue)}
                required
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentCard: MovieCardProps;
}

const Modal = ({ setIsModalOpen, currentCard }: ModalProps) => {
  const dispatch = useDispatch();
  const rated = useSelector((state: RootState) => state.rated.data);
  const modalState = useSelector((state: RootState) => state.modal);

  const isSubmitDisabled =
    modalState.scenario === 0 ||
    modalState.actors === 0 ||
    modalState.operator === 0;

  const getAverage = () => {
    let sum = 0;
    let values = [];
    for (const key in modalState) {
      if (modalState[key] !== 0) {
        values.push(modalState[key]);
        sum += modalState[key];
      }
    }
    if (values.length > 0) {
      let average = (sum / values.length).toFixed(2);
      return average;
    }
    return 0;
  };

  useEffect(() => {
    const cardInRating = rated.find((card) => card.id === currentCard.id);

    if (cardInRating) {
      dispatch(setScenario(cardInRating.marks.scenario));
      dispatch(setActors(cardInRating.marks.actors));
      dispatch(setOperator(cardInRating.marks.operator));
    } else {
      dispatch(clearMarks());
    }
  }, [currentCard, rated, dispatch]);

  return (
    <div
      className='modal'
      onClick={() => {
        setIsModalOpen(false);
        onModalClose();
      }}
    >
      <div className='modal__content' onClick={(e) => e.stopPropagation()}>
        <div className='modal__header'>
          <h1 className='modal__title'>Ваша оценка {getAverage()}</h1>
          <span
            className='modal__close'
            onClick={() => {
              setIsModalOpen(false);
              onModalClose();
            }}
          >
            ×
          </span>
        </div>

        <div className='modal__main'>
          <ModalFeature
            feature={{ type: 'scenario', name: 'Cценарий' }}
            setMark={(scenario) => dispatch(setScenario(scenario))}
          />
          <ModalFeature
            feature={{ type: 'actors', name: 'Актерское мастерство' }}
            setMark={(actors) => dispatch(setActors(actors))}
          />
          <ModalFeature
            feature={{ type: 'operator', name: 'Операторская работа' }}
            setMark={(operator) => dispatch(setOperator(operator))}
          />
        </div>
        {!rated.find((item: RatedCards) => item.id === currentCard.id) ? (
          <Button
            onClick={() => {
              dispatch(
                addToRated({
                  ...currentCard,
                  marks: {
                    scenario: modalState.scenario,
                    actors: modalState.actors,
                    operator: modalState.operator,
                  },
                })
              );
              setIsModalOpen(false);
              onModalClose();
            }}
            disabled={isSubmitDisabled}
          >
            Оценить
          </Button>
        ) : (
          <Button
            onClick={() => {
              dispatch(
                changeRating({
                  id: currentCard.id,
                  marks: {
                    scenario: modalState.scenario,
                    actors: modalState.actors,
                    operator: modalState.operator,
                  },
                })
              );
              setIsModalOpen(false);
              onModalClose();
            }}
            disabled={isSubmitDisabled}
          >
            Изменить оценку
          </Button>
        )}
      </div>
    </div>
  );
};

export { Modal };
