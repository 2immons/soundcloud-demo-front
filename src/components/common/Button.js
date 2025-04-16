import React from 'react';
import './Button.css'; // We'll create this CSS file for styling

const Button = ({ children, onClick, type }) => {
  const buttonClass = type === 'SOLID' ? 'custom-button solid' : 'custom-button outline';

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button; 