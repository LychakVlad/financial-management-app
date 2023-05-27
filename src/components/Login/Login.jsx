import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmailError } from '../../store/actions/errorActions';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailError = useSelector((state) => state.errors.email);
  const [emailValue, setEmailValue] = useState('');

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError('Failed to sign in');
    }

    setLoading(false);
  }

  const handleClick = () => {
    console.log(emailValue);
    console.log(emailError);
    if (emailValue === '') {
      dispatch(updateEmailError('Incorrect email'));
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="E-mail"
          type="email"
          required
          inputRef={emailRef}
          autoComplete="email"
          helperText={emailError}
          error={emailError}
          value={emailValue} // Track the value using the emailValue state
          onChange={(e) => setEmailValue(e.target.value)} // Update the emailValue state on input change
        ></TextField>
        <TextField
          id="password-confirm"
          label="Password Confirm"
          type="password"
          required
          inputRef={passwordRef}
          helperText={error}
        ></TextField>
        <Button
          variant="contained"
          disabled={loading}
          type="submit"
          onClick={handleClick}
        >
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Login;
