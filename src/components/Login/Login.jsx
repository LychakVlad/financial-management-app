import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@mui/material';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../form/Input/CustomInput';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history('/');
    } catch {
      setError('Failed to sign up');
    }

    setLoading(false);
  }

  return (
    <div className={styles.main}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <CustomInput label="E-mail" type="email" inputRef={emailRef} />
        <CustomInput label="Password" type="password" inputRef={passwordRef} />
        <Button variant="contained" disabled={loading} type="submit">
          Log in
        </Button>
        <div>
          Don't have an account?
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
