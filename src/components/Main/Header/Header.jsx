import React from 'react';

import styles from './Header.module.css';
import { useAuth } from '../../../contexts/AuthContext';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className={styles.header}>
      Welcome back, {currentUser && currentUser.displayName}!
    </header>
  );
};

export default Header;
