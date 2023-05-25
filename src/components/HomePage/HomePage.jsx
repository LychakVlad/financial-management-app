import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIncomeAction,
  removeIncomeAction,
} from '../../store/actions/incomeActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const [incomeItem, setIncomeItem] = useState({
    amount: '',
    type: '',
  });

  const incomes = useSelector((state) => state.incomes.incomes);

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

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

  const removeIncome = (income) => {
    dispatch(removeIncomeAction(income.id));
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h1>Tax calculator</h1>
        <p>Web application wich helps you to count your taxes</p>
        <a href="#income-counter" className={styles.btn}>
          Get started
        </a>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addIncome();
        }}
      >
        <input
          type="number"
          name="amount"
          value={incomeItem.amount}
          placeholder="Amount"
          onChange={(e) =>
            setIncomeItem({ ...incomeItem, amount: e.target.value })
          }
        />
        <input
          type="text"
          name="type"
          value={incomeItem.type}
          placeholder="Type"
          onChange={(e) =>
            setIncomeItem({ ...incomeItem, type: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {incomes.length > 0 ? (
          <div>
            {incomes.map((income) => (
              <>
                {' '}
                <div>{income.amount}</div> <div>{income.type}</div>
                <div>{income.date}</div>{' '}
                <button onClick={() => removeIncome(income)}>Delete</button>
              </>
            ))}
          </div>
        ) : (
          <div>No customers...</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
