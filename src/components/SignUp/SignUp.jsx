import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const { logout } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  async function handleLogout() {
    setError('');

    try {
      await logout();
    } catch {
      setError('Failed to logout');
    }
  }

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
          helperText={error}
        ></TextField>
        <TextField
          id="password"
          label="Password"
          type="password"
          required
          inputRef={passwordRef}
          helperText={error}
        ></TextField>
        <TextField
          id="password-confirm"
          label="Password Confirm"
          type="password"
          required
          inputRef={passwordConfirmRef}
          helperText={error}
        ></TextField>
        <Button variant="contained" type="submit" disabled={loading}>
          Sign up
        </Button>
      </form>
      <Button variant="outlined" onClick={handleLogout}>
        Log out
      </Button>
      <div>
        Already have an account?
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default SignUp;
