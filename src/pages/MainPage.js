import React from 'react';
import Header from '../components/Main/Header/Header';
import SideBar from '../components/Main/SideBar/SideBar';
import styles from './MainPage.module.css';

const MainPage = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.side}>
          {' '}
          <SideBar />
        </div>
        <div className={styles.block}>{children}</div>
      </div>
    </>
  );
};

export default MainPage;
