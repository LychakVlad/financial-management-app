import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h1>Tax calculator</h1>
        <p>Web application wich helps you to count your taxes</p>
        <a href="#income-counter" className={styles.btn}>
          Get started
        </a>
      </div>
    </div>
  );
};

export default HomePage;
