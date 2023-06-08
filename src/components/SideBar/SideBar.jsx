import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';

const SideBar = () => {
  return (
    <div className={styles.side}>
      <div className={styles.menu}>
        <h3>Main menu</h3>
        <ul>
          <li>
            <Link to="/income-tracker">Income Tracker</Link>
          </li>
          <li>
            <Link to="/tax-calculator">Tax Calculator</Link>
          </li>
          <li>
            <Link to="/expense-tracker">Expense Tracker</Link>
          </li>
          <li>
            <Link to="/budget-planner">Budget Planner</Link>
          </li>
        </ul>
      </div>
      <div className={styles.logout}>SideBar Logout</div>
    </div>
  );
};

export default SideBar;
