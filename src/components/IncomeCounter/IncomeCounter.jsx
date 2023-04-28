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
  incomeList,
  totalIncome,
}) {
  const { currentUser } = useAuth();

  const handleAddIncome = useCallback(
    async (e) => {
      setIncomeList([...incomeList, income]);
      setIncome('');

      await setDoc(
        doc(
          firestore,
          'users',
          currentUser._delegate.uid,
          'income',
          currentUser._delegate.uid + 1
        ),
        {
          income: {
            amount: null,
            type: null,
          },
        }
      );
      console.log(incomeList);

      return firestore
        .collection('income')
        .doc(currentUser._delegate.uid + 1)
        .set({
          income: {
            amount: null,
            type: null,
          },
        });
    },
    [incomeList, income]
  );

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
