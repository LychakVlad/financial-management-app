import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatDate } from '../../utils/dateFormat';
import { addIncomeAction } from '../../store/actions/incomeActions';

function IncomeForm() {
  const dispatch = useDispatch();
  const [incomeItem, setIncomeItem] = useState({
    amount: '',
    type: '',
  });

  const addIncome = (amount, type) => {
    const income = {
      amount: incomeItem.amount,
      type: incomeItem.type,
      date: formatDate(new Date()),
      id: Date.now(),
    };
    dispatch(addIncomeAction(income));
    setIncomeItem({ amount: '', type: '' });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addIncome();
      }}
    >
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
