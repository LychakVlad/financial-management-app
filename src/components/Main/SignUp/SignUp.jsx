import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './SignUp.module.css';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../form/Input/CustomInput';
import CustomButton from '../../form/Button/CustomButton';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();

  const { signup, logout } = useAuth();
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
      await signup(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
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
      history('/login');
    } catch {
      setError('Failed to logout');
    }
  }

  const handleEmailChange = (value) => {
    emailRef.current.value = value;
  };

  const handlePasswordChange = (value) => {
    passwordRef.current.value = value;
  };

  const handlePasswordConfirmChange = (value) => {
    passwordConfirmRef.current.value = value;
  };

  const handleNameChange = (value) => {
    nameRef.current.value = value;
  };

  return (
    <div className={styles.main}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <CustomInput
          label="E-mail"
          type="text"
          inputRef={emailRef}
          name="email"
          required
          onChange={handleEmailChange}
        />
        <CustomInput
          label="Name"
          type="text"
          inputRef={nameRef}
          name="name"
          required
          onChange={handleNameChange}
        />
        <CustomInput
          label="Password"
          type="password"
          inputRef={passwordRef}
          name="password"
          required
          onChange={handlePasswordChange}
        />
        <CustomInput
          label="Password confirm"
          type="password"
          inputRef={passwordConfirmRef}
          name="password-confirm"
          required
          onChange={handlePasswordConfirmChange}
        />
        <CustomButton disabled={loading} type="submit" title="Sign Up" />
        <CustomButton
          disabled={loading}
          type="submit"
          title="Log out"
          onClick={handleLogout}
        />
      </form>
      <div className={styles.link}>
        Already have an account?
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default SignUp;
