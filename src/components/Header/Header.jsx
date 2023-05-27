import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      You logged with
      {currentUser && JSON.stringify(currentUser && currentUser.email)}
      <Login />
      <SignUp />
    </div>
  );
};

export default Header;
