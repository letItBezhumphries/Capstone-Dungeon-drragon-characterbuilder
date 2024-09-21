import React from 'react';
import './Button.css';

const Button = ({ step, icon, color, text, type }) => {
  return (
    <div
      className={
        step === 'Prev'
          ? 'step-btn-container prev-step'
          : 'step-btn-container next-step'
      }
    >
      <button className={step === 'Prev' ? 'prev-btn' : 'next-btn'} type={type}>
        {text}
        <i className={icon} style={{ color: color }}></i>
      </button>
    </div>
  );
};

export default Button;
