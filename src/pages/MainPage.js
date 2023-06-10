import React from 'react';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';

const MainPage = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ width: '100%' }}>{children}</div>
      </div>
    </>
  );
};

export default MainPage;
