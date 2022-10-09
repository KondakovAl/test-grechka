import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../Button/Button';

import { onModalClose, onModalOpen } from '../../utils';

const dataHeader = {
  links: [
    { name: 'Главная', path: '/' },
    { name: 'Избранное', path: '/favorites' },
    { name: 'Оцененные', path: '/rated' },
  ],
};

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className='header'>
      <div className='header__wrapper wrapper'>
        <Button
          className='header'
          onClick={() => {
            setIsNavOpen(!isNavOpen);
            isNavOpen ? onModalClose() : onModalOpen();
          }}
        >
          Меню
        </Button>
      </div>
      {isNavOpen && (
        <>
          <nav className={'header__navigation navigation'}>
            {dataHeader.links.map((link, index) => (
              <span
                key={index}
                className='navigation__item'
                onClick={() => {
                  setIsNavOpen(false);
                  onModalClose();
                }}
              >
                <Link to={link.path}>{link.name}</Link>
              </span>
            ))}
            <span
              className='navigation__close'
              onClick={() => {
                setIsNavOpen(false);
                onModalClose();
              }}
            >
              ×
            </span>
          </nav>
          <div
            className={'overlay'}
            onClick={() => {
              setIsNavOpen(false);
              onModalOpen();
            }}
          />
        </>
      )}
    </header>
  );
};

export { Header };
