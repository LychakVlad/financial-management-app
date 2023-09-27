import React, { useState } from "react";
import Header from "../components/Main/Header/Header";
import SideBar from "../components/Main/SideBar/SideBar";
import styles from "./MainPage.module.css";
import { useDisableBodyScroll } from "../hooks/useDisableBodyScroll";

const MainPage = ({ children }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  useDisableBodyScroll(openSideMenu);

  return (
    <div className={styles.body}>
      <Header setSideMenu={setOpenSideMenu} sideMenu={openSideMenu} />
      <div className={styles.main}>
        <div
          className={`${styles.side} ${openSideMenu ? styles.isActive : ""}`}
        >
          {" "}
          <SideBar setSideMenu={setOpenSideMenu} sideMenu={openSideMenu} />
        </div>
        <div className={styles.block}>{children}</div>
        <div
          className={`${styles.bg} ${openSideMenu ? styles.isActiveBg : ""}`}
        ></div>
      </div>
    </div>
  );
};

export default MainPage;
