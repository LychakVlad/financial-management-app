import React from 'react';
import styles from './MoneyStats.module.css';
import { formatNumber } from '../../../utils/formatNumber';
import { useSelector } from 'react-redux';

const MoneyStats = () => {
  const { expenses } = useSelector((state) => state.expenses);
  const { totalCard, totalCash } = useSelector((state) => state.incomes);

  const totalSavings = expenses
    .filter((item) => item.type === 'Savings')
    .reduce((total, item) => total + parseFloat(item.amount), 0);
  return (
    <div className={styles.main}>
      <div className={styles.info}>
        {' '}
        <p>Your total savings: {formatNumber(totalSavings) + ' $'}</p>
        <p>Money in cash: {formatNumber(totalCash) + ' $'}</p>
        <p>Money on Card: {formatNumber(totalCard) + ' $'}</p>
      </div>{' '}
      <div className={styles.buttons}></div>
    </div>
  );
};

export default MoneyStats;
