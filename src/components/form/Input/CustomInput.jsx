import React from 'react';
import { useDispatch } from 'react-redux';
import { updateEmailError } from '../../../store/actions/errorActions';

const CustomInput = ({ label, type, inputRef }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(updateEmailError(e.target.value));
  };

  return (
    <div>
      <label>{label}</label>
      <input type={type} ref={inputRef} onChange={handleInputChange} required />
    </div>
  );
};

export default CustomInput;
