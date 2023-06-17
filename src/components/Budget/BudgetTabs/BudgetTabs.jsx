import React from 'react';
import styles from './BudgetTabs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTabAction } from '../../../store/actions/tabsActions';

const BudgetTabs = () => {
  const tab = useSelector((state) => state.tabs.currentTab);
  const dispatch = useDispatch();

  const handleClick = (type) => {
    dispatch(setTabAction(type));
  };

  console.log(tab);
  return (
    <div className={styles.form}>
      <div
        onClick={() => handleClick('needs')}
        className={`${styles.button} ${tab === 'needs' ? styles.active : ''}`}
      >
        Needs
      </div>
      <div
        onClick={() => handleClick('wants')}
        className={`${styles.button} ${tab === 'wants' ? styles.active : ''}`}
      >
        Wants
      </div>
      <div
        onClick={() => handleClick('savings')}
        className={`${styles.button} ${tab === 'savings' ? styles.active : ''}`}
      >
        Savings and debt repayment
      </div>
      <div
        onClick={() => handleClick('total')}
        className={`${styles.button} ${tab === 'total' ? styles.active : ''}`}
      >
        Total
      </div>
    </div>
  );
};

export default BudgetTabs;
