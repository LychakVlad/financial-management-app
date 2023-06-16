import React from 'react';
import styles from './ExpenseTracker.module.css';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import ExpenseGraph from '../ExpenseGraph/ExpenseGraph';
import ExpenseList from '../ExpenseList/ExpenseList';

const ExpenseTracker = () => {
  return (
    <div className={styles.main}>
      <ExpenseForm />
      <ExpenseGraph />
      <ExpenseList />
    </div>
  );
};

export default ExpenseTracker;
