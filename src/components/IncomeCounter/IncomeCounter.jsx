import React, { useCallback } from 'react';
import IncomeForm from '../IncomeForm/IncomeForm';
import IncomeList from '../IncomeList/IncomeList';
import styles from './IncomeCounter.module.css';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import createStore from 'redux';

function IncomeCounter({
  income,
  setIncome,
  type,
  setType,
  date,
  setDate,
  dateList,
  setDateList,
  typeList,
  setTypeList,
  setIncomeList,
  incomeList = [],
  totalIncome,
}) {
  const { currentUser } = useAuth();

  let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  const handleAddIncome = useCallback(
    async (e) => {
      if (Array.isArray(incomeList)) {
        setIncomeList([...incomeList, income]);
        setTypeList([...typeList, type]);
        setDateList([...dateList, utc]);
      } else {
        setIncomeList([income]);
        setTypeList([type]);
        setDate([utc]);
      }
      setIncome('');
      setType('');
      setDate('');

      await setDoc(doc(firestore, 'users', currentUser?._delegate.uid), {
        income: {
          amount: [...incomeList, income],
          type: [...typeList, type],
          date: [...dateList, utc],
        },
      });

      setIncomeList([...incomeList, income]);
      setTypeList([...typeList, type]);
      setDateList([...dateList, utc]);
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
        dateList={dateList}
        setDateList={setDateList}
      />
    </div>
  );
}

export default IncomeCounter;
