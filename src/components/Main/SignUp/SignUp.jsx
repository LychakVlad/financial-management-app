import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './SignUp.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CustomInput from '../../form/Input/CustomInput';
import CustomButton from '../../form/Button/CustomButton';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError(null);
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

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
          label="Name"
          type="text"
          inputRef={nameRef}
          name="name"
          required
          onChange={handleNameChange}
          id="name"
          test="input-name-test"
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
        <CustomInput
          label="Password confirm"
          type="password"
          inputRef={passwordConfirmRef}
          name="password-repeat"
          required
          onChange={handlePasswordConfirmChange}
          id="password-repeat"
          test="input-pass-confirm-test"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <CustomButton disabled={loading} type="submit" title="Sign Up" />
      </form>
      <div className={styles.link}>
        Already have an account?
        <Link to="/login" id="link-login">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
