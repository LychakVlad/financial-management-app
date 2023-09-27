import React from "react";
import styles from "./Modal.module.css";
import { ReactComponent as Close } from "../../../assets/close-icon.svg";

const Modal = ({ children, handleClose }) => {
  const handleClick = () => {
    handleClose(false);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <button className={styles.close} onClick={handleClick}>
          <Close />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
