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
  type,
  setType,
  typeList,
  setTypeList,
  setIncomeList,
  incomeList = [],
  totalIncome,
}) {
  const { currentUser } = useAuth();

  const handleAddIncome = useCallback(
    async (e) => {
      if (Array.isArray(incomeList)) {
        setIncomeList([...incomeList, income]);
        setTypeList([...typeList, type]);
      } else {
        setIncomeList([income]);
        setTypeList([type]);
      }
      setIncome('');
      setType('');

      await setDoc(doc(firestore, 'users', currentUser?._delegate.uid), {
        income: {
          amount: [...incomeList, income],
          type: [...typeList, type],
        },
      });

      console.log(incomeList);
    },
    [
      incomeList,
      income,
      currentUser?._delegate.uid,
      setIncomeList,
      setIncome,
      setType,
      setTypeList,
      type,
      typeList,
    ]
  );

  return (
    <div className={styles.main} id="income-counter">
      <IncomeForm
        income={income}
        setIncome={setIncome}
        type={type}
        setType={setType}
        handleAddIncome={handleAddIncome}
      />
      <IncomeList
        typeList={typeList}
        setTypeList={setTypeList}
        incomeList={incomeList}
        setIncomeList={setIncomeList}
        totalIncome={totalIncome}
      />
    </div>
  );
}

export default IncomeCounter;
