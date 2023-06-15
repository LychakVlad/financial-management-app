import React, { useCallback, useEffect, useState } from 'react';
import styles from './ExpenseForm.module.css';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { addExpenseAction } from '../../store/actions/expenseActions';
import CustomInput from '../form/Input/CustomInput';
import Dropdown from '../form/Dropdown/Dropdown';
import CustomButton from '../form/Button/CustomButton';
import { formatDate } from '../../utils/dateFormat';

const ExpenseForm = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const [expenseItem, setExpenseItem] = useState({
    type: '',
    amount: '',
  });
  const [dropdownError, setDropdownError] = useState(false);
  const [dropdownPlaceholder, setDropdownPlaceholder] =
    useState('Type of Expense');
  const [inputError, setInputError] = useState('');

  const options = [
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Housing', label: 'Housing' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Debt Payments', label: 'Debt Payments' },
    { value: 'Savings', label: 'Savings' },
    { value: 'Other', label: 'Other' },
  ];

  const handleAddExpense = useCallback(
    async (e) => {
      e.preventDefault();
      console.log('addd');

      if (!expenseItem.amount) {
        setInputError('Enter the value');
        return;
      }

      if (!expenseItem.type) {
        setDropdownError(true);
        return;
      }

      const Expense = {
        amount: expenseItem.amount,
        type: expenseItem.type,
        date: formatDate(new Date()),
        id: Date.now(),
      };

      dispatch(addExpenseAction(Expense));

      await updateDoc(doc(firestore, 'users', currentUser?.uid), {
        expenses: arrayUnion(Expense),
      });

      setExpenseItem({ amount: '', type: '' });
      setInputError('');
      setDropdownPlaceholder('Type of Expense');
    },
    [currentUser?.uid, expenseItem.amount, expenseItem.type, dispatch]
  );

  const handleDropdownChange = (option) => {
    setExpenseItem({ ...expenseItem, type: option.value });
    setDropdownError(false);
  };

  const handleInputChange = (value) => {
    setExpenseItem({ ...expenseItem, amount: value });
    setInputError('');
  };

  return (
    <form onSubmit={handleAddExpense} className={styles.form}>
      <h2 className={styles.title}>Write down your expense</h2>
      <div className={styles.inputs}>
        <CustomInput
          label="Amount"
          type="number"
          id="expense"
          step="0.01"
          value={expenseItem.amount}
          error={inputError}
          required
          onChange={handleInputChange}
        />
        <Dropdown
          placeHolder={dropdownPlaceholder}
          setPlaceHolder={setDropdownPlaceholder}
          options={options}
          onChange={handleDropdownChange}
          error={dropdownError}
        />
        <CustomButton type="submit" title="Add Expense" />
      </div>
    </form>
  );
};

export default ExpenseForm;
