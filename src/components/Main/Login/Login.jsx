import React, { useRef, useState } from 'react';
import styles from './Login.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import CustomInput from '../../form/Input/CustomInput';
import CustomButton from '../../form/Button/CustomButton';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history('/');
    } catch {
      setError('Failed to sign in');
    }

    setLoading(false);
  }

  const handleEmailChange = (value) => {
    emailRef.current.value = value;
  };

  const handlePasswordChange = (value) => {
    passwordRef.current.value = value;
  };

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.popup}>
        <p>Hi, thanks for visiting this app!👋</p>
        <br></br> If you want to try all the functionality you can create an
        account with any fake email Or you can use these details
        <p className={styles.data}> Email: testing@gmail.com</p>
        <p className={styles.data}> Password: 123456</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <CustomInput
          label="E-mail"
          type="text"
          inputRef={emailRef}
          name="email"
          required
          onChange={handleEmailChange}
          id="email"
          test="input-email-test"
        />
        <CustomInput
          label="Password"
          type="password"
          inputRef={passwordRef}
          name="password"
          required
          onChange={handlePasswordChange}
          id="password"
          test="input-pass-test"
        />
        <CustomButton
          disabled={loading}
          type="submit"
          title="Log in"
          test="btn-login-test"
        />

        <div className={styles.link}>
          Don&apos;t have an account?
          <Link to="/signup" id="link-signup">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
