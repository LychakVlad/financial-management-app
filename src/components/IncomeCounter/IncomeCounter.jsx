import React, { useCallback } from 'react';
import IncomeForm from '../IncomeForm/IncomeForm';
import IncomeList from '../IncomeList/IncomeList';
import styles from './IncomeCounter.module.css';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

function IncomeCounter({
  income,
  setIncome,
  setIncomeList,
  incomeList = [], // initialize incomeList as an empty array
  totalIncome,
}) {
  const { currentUser } = useAuth();

  const handleAddIncome = useCallback(
    async (e) => {
      if (Array.isArray(incomeList)) {
        // check if incomeList is an array
        setIncomeList([...incomeList, income]);
      } else {
        setIncomeList([income]);
      }
      setIncome('');

      await setDoc(doc(firestore, 'users', currentUser?._delegate.uid), {
        income: {
          amount: income,
          type: null,
        },
      });

      console.log(incomeList);
    },
    [incomeList, income, currentUser?._delegate.uid, setIncomeList]
  );

  return (
    <div className={styles.main} id="income-counter">
      <IncomeForm
        income={income}
        setIncome={setIncome}
        handleAddIncome={handleAddIncome}
      />
      <IncomeList
        incomeList={incomeList}
        setIncomeList={setIncomeList}
        totalIncome={totalIncome}
      />
    </div>
  );
}

export default IncomeCounter;
