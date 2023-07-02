import React from 'react';
import styles from './SideBar.module.css';
import { Link, useLocation } from 'react-router-dom';

const SideItem = ({ to, icon: Icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${styles.point} ${isActive ? styles.active : ''}`}
    >
      <li className={styles.pointFlex}>
        <Icon className={styles.icon} />
        <span>{label}</span>
      </li>
    </Link>
  );
};

export default SideItem;
