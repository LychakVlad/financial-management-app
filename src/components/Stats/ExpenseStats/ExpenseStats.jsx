import React from 'react';
import { formatNumber } from '../../../utils/formatNumber';
import { useSelector } from 'react-redux';
import styles from './ExpenseStats.module.css';

const ExpenseStats = () => {
  const { totalExpense } = useSelector((state) => state.expenses);
  return (
    <div className={styles.main}>
      {' '}
      <p>Your total expenses: {formatNumber(totalExpense) + ' $'}</p>
    </div>
  );
};

export default ExpenseStats;
