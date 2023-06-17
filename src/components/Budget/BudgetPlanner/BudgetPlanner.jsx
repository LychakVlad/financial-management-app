import React from 'react';
import styles from './BudgetPlanner.module.css';
import BudgetTabs from '../BudgetTabs/BudgetTabs';

const BudgetPlanner = () => {
  return (
    <div className={styles.section}>
      <BudgetTabs />
    </div>
  );
};

export default BudgetPlanner;
