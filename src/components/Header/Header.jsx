import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className={styles.header}>
      Welcome Back,
      {currentUser && JSON.stringify(currentUser && currentUser.email)}
    </header>
  );
};

export default Header;
