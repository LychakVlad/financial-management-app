import React from 'react';

const CustomButton = ({ style, disabled, type, onClick, title, test }) => {
  return (
    <button
      data-testid={test ? test : undefined}
      className={`button ${style}`}
      onClick={onClick}
      type={type}
    >
      <div>{title}</div>
    </button>
  );
};

export default CustomButton;
