import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';
import { ReactComponent as MenuIcon } from '../../../assets/menu-icon.svg';
import { ReactComponent as MenuIcon1 } from '../../../assets/menu-icon1.svg';
import { ReactComponent as MenuIcon2 } from '../../../assets/menu-icon2.svg';
import { ReactComponent as MenuIcon3 } from '../../../assets/menu-icon3.svg';
import { ReactComponent as MenuIcon4 } from '../../../assets/menu-icon4.svg';
import { ReactComponent as LogOut } from '../../../assets/logout.svg';
import SideItem from './SideItem';
import { useAuth } from '../../../contexts/AuthContext';

const SideBar = ({ setSideMenu, sideMenu }) => {
  const { logout } = useAuth();
  const [error, setError] = useState('');
  const history = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history('/login');
    } catch {
      setError('Failed to logout');
      console.log(error);
    }
  }

  const onClick = () => {
    if (sideMenu === true) {
      setSideMenu(false);
    } else return;
  };

  return (
    <div className={styles.side}>
      <div className={styles.menu}>
        <h3 className={styles.title}>Main menu</h3>
        <ul className={styles.list}>
          <SideItem
            to="/"
            icon={MenuIcon4}
            label="Main Page"
            onClick={onClick}
          />
          <SideItem
            to="/income-tracker"
            icon={MenuIcon3}
            label="Income Tracker"
            onClick={onClick}
          />
          <SideItem
            to="/expense-tracker"
            icon={MenuIcon1}
            label="Expense Tracker"
            onClick={onClick}
          />
          <SideItem
            to="/tax-calculator"
            icon={MenuIcon2}
            label="Tax Calculator"
            onClick={onClick}
          />
          <SideItem
            to="/budget-planner"
            icon={MenuIcon}
            label="Budget Planner"
            onClick={onClick}
          />
        </ul>
      </div>
      <div className={styles.logout} onClick={handleLogout}>
        <LogOut />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SideBar;
