import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../utils/dateFormat';
import { addIncomeAction } from '../../store/actions/incomeActions';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../firebase';

function IncomeForm() {
  const { currentUser } = useAuth();
  const incomes = useSelector((state) => state.incomes.incomes);
  const dispatch = useDispatch();
  const [incomeItem, setIncomeItem] = useState({
    amount: '',
    type: '',
  });

  const handleAddIncome = useCallback(
    async (e) => {
      e.preventDefault();

      const income = {
        amount: incomeItem.amount,
        type: incomeItem.type,
        date: formatDate(new Date()),
        id: Date.now(),
      };
      dispatch(addIncomeAction(income));

      await setDoc(doc(firestore, 'users', currentUser?.uid), {
        incomes: [...incomes, income],
      });
      setIncomeItem({ amount: '', type: '' });
    },
    [currentUser?.uid, incomeItem.amount, incomeItem.type, dispatch, incomes]
  );

  return (
    <form onSubmit={(e) => handleAddIncome(e)}>
      <h2>Write your income in the input below</h2>
      <label htmlFor="income">Income:</label>
      <input
        type="number"
        id="income"
        step="0.01"
        value={incomeItem.amount}
        onChange={(event) =>
          setIncomeItem({ ...incomeItem, amount: event.target.value })
        }
        required
      />
      <label htmlFor="type">Type:</label>
      <input
        type="text"
        id="type"
        value={incomeItem.type}
        onChange={(event) =>
          setIncomeItem({ ...incomeItem, type: event.target.value })
        }
        required
      />
      <button type="submit">Add Income</button>
    </form>
  );
}

export default IncomeForm;
