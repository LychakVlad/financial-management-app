import React from 'react';
import styles from './BudgetPlanner.module.css';
import BudgetTabs from '../BudgetTabs/BudgetTabs';
import BudgetNeeds from '../BudgetNeeds/BudgetNeeds';

const BudgetPlanner = () => {
  return (
    <div className={styles.section}>
      <BudgetTabs />
      <div className={styles.bottom}>
        <BudgetNeeds />
      </div>
    </div>
  );
};

export default BudgetPlanner;
