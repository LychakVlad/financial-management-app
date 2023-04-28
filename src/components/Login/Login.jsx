import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
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
        <button disabled={loading} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
