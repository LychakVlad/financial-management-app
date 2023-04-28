import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const { logout } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError('Password do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
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
      You logged with
      {currentUser && JSON.stringify(currentUser && currentUser.email)}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div id="email">
          <label htmlFor="email">Email</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div id="password">
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordRef} required />
        </div>
        <div id="password-confirm">
          <label htmlFor="password-confirm">Password Confirmation</label>
          <input type="password" ref={passwordConfirmRef} required />
        </div>
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Header;
