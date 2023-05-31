import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      You logged with
      {currentUser && JSON.stringify(currentUser && currentUser.email)}
    </div>
  );
};

export default Header;
