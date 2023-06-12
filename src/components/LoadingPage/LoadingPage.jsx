import React from 'react';
import styles from './LoadingPage.module.css';
import FadeLoader from 'react-spinners/FadeLoader';

const LoadingPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.block}>
        <FadeLoader color="#2e8b43" size={30} />
        <p> Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
