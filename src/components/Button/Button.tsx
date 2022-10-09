import React from 'react';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ className, children, onClick, disabled }: ButtonProps) => {
  const buttonClass = `${className ? `${className}__button` : ''} ${
    disabled ? '--disabled' : ''
  }`;
  return (
    <button
      onClick={onClick}
      className={`button ${buttonClass}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { Button };
