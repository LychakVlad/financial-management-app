import React from 'react';
import styles from './HomePage.module.css';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);

  const addCash = () => {
    dispatch({ type: 'ADD_CASH', payload: 5 });
  };

  const getCash = () => {
    dispatch({ type: 'GET_CASH', payload: 5 });
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };
    dispatch({ type: 'ADD_CUSTOMER', payload: customer });
  };

  console.log(customers);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h1>Tax calculator</h1>
        <p>Web application wich helps you to count your taxes</p>
        <a href="#income-counter" className={styles.btn}>
          Get started
        </a>
      </div>
      <div>
        {cash}
        <button onClick={() => addCash()}>Plus</button>
        <button onClick={() => getCash()}>Minus</button>
        <button onClick={() => addCustomer(prompt())}>PlusCust</button>
        <button onClick={() => getCash()}>MinusCust</button>
      </div>
      <div>
        {customers.length > 0 ? (
          <div>
            {customers.map((customer) => (
              <div>{customer.name}</div>
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
