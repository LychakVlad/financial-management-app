import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../form/Input/CustomInput';
import CustomButton from '../form/Button/CustomButton';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [emailError, setEmailError] = useState('');
  const { currentUser } = useAuth();

  console.log(currentUser);

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

  const handleEmailChange = (value) => {
    emailRef.current.value = value;
  };

  const handlePasswordChange = (value) => {
    passwordRef.current.value = value;
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <CustomInput
          label="E-mail"
          type="text"
          inputRef={emailRef}
          name="email"
          required
          onChange={handleEmailChange}
        />
        <CustomInput
          label="Password"
          type="password"
          inputRef={passwordRef}
          name="password"
          required
          onChange={handlePasswordChange}
        />
        <CustomButton disabled={loading} type="submit" title="Log in" />

        <div className={styles.link}>
          Don't have an account?
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
