import React from 'react';
import styles from './LoadingPage.module.css';
import PulseLoader from 'react-spinners/PulseLoader';

const LoadingPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.block}>
        <PulseLoader color="#36d7b7" size={100} />
        <p> Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
