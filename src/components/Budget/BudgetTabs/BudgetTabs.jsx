import React from 'react';
import styles from './BudgetTabs.module.css';

const BudgetTabs = () => {
  return (
    <div className={styles.form}>
      <div className={`${styles.button} ${styles.active}`}>Needs</div>
      <div className={styles.button}>Wants</div>
      <div className={styles.button}>Savings and debt repayment</div>
      <div className={styles.button}>Total</div>
    </div>
  );
};

export default BudgetTabs;
