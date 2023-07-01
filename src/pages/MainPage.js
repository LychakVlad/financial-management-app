import React, { useState } from 'react';
import Header from '../components/Main/Header/Header';
import SideBar from '../components/Main/SideBar/SideBar';
import styles from './MainPage.module.css';

const MainPage = ({ children }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <>
      <Header setSideMenu={setOpenSideMenu} sideMenu={openSideMenu} />
      <div className={styles.main}>
        <div
          className={`${styles.side} ${openSideMenu ? styles.isActive : ''}`}
        >
          {' '}
          <SideBar />
        </div>
        <div className={styles.block}>{children}</div>
      </div>
    </>
  );
};

export default MainPage;
