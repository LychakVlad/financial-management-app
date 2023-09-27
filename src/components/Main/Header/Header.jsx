import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useAuth } from "../../../contexts/AuthContext";

const Header = ({ setSideMenu, sideMenu }) => {
  const { currentUser } = useAuth();
  const [greetings, setGreetings] = useState("Hello");

  const today = new Date();
  const currentTime = today.getHours();

  const handleClick = () => {
    setSideMenu(!sideMenu);
  };

  useEffect(() => {
    if (currentTime >= 0 && currentTime < 5) {
      setGreetings("Good night");
    } else if (currentTime >= 5 && currentTime < 12) {
      setGreetings("Good morning");
    } else if (currentTime >= 12 && currentTime < 16) {
      setGreetings("Good afternoon");
    } else {
      setGreetings("Good evening");
    }
  }, [currentTime]);

  return (
    <header className={styles.header}>
      <button
        className={`${styles.menuToggle} ${sideMenu ? styles.isActive : null}`}
        onClick={handleClick}
      >
        Menu
      </button>
      <h1>
        {" "}
        {`${greetings}${
          currentUser.displayName !== null
            ? `, ${currentUser.displayName}`
            : ", welcome to this app"
        }!`}
      </h1>
    </header>
  );
};

export default Header;
