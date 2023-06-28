import React from 'react';
import { formatNumber } from '../../../utils/formatNumber';
import { useSelector } from 'react-redux';
import styles from './ExpenseStats.module.css';
import { Link } from 'react-router-dom';

const ExpenseStats = () => {
  const { totalExpense } = useSelector((state) => state.expenses);
  return (
    <div className={styles.main}>
      {' '}
      <p>
        Your total expenses:{' '}
        <span className={styles.number}>
          {formatNumber(totalExpense) + ' $'}
        </span>
      </p>
      <Link to={'/expense-tracker'} className={styles.link}>
        {' '}
        Show full list
      </Link>
    </div>
  );
};

export default ExpenseStats;
