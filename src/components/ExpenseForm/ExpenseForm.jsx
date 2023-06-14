import React from 'react';
import styles from './ExpenseForm.module.css';
import { useDispatch, useSelector } from 'react-redux';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const totalIncome = useSelector((state) => state.incomes.incomeToSpend);

  return <div className={styles.form}>{totalIncome}</div>;
};

export default ExpenseForm;
