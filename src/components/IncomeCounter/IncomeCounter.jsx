import React from 'react';
import IncomeForm from '../IncomeForm/IncomeForm';
import IncomeList from '../IncomeList/IncomeList';
import styles from './IncomeCounter.module.css';

function IncomeCounter({
  income,
  setIncome,
  handleAddIncome,
  incomeList,
  totalIncome,
}) {
  return (
    <div className={styles.main} id="income-counter">
      <IncomeForm
        income={income}
        setIncome={setIncome}
        handleAddIncome={handleAddIncome}
      />
      <IncomeList incomeList={incomeList} totalIncome={totalIncome} />
    </div>
  );
}

export default IncomeCounter;
