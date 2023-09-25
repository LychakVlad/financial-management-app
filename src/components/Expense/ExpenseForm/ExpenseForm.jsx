import React, { useCallback, useState } from 'react';
import styles from './ExpenseForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../contexts/AuthContext';
import { firestore } from '../../../firebase';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { addExpenseAction } from '../../../store/actions/expenseActions';
import CustomInput from '../../form/Input/CustomInput';
import Dropdown from '../../form/Dropdown/Dropdown';
import CustomButton from '../../form/Button/CustomButton';
import { formatDate } from '../../../utils/dateFormat';
import DateChange from '../../form/DateChange/DateChange';

const ExpenseForm = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const totalExpense = useSelector((state) => state.expenses.totalExpense);
  const [expenseItem, setExpenseItem] = useState({
    type: '',
    amount: '',
    description: '',
    pay: '',
    date: new Date(),
  });
  const [dropdownError, setDropdownError] = useState(false);
  const [dropdownPlaceholder, setDropdownPlaceholder] = useState('Category');
  const [dropdownPayError, setDropdownPayError] = useState(false);
  const [dropdownPayPlaceholder, setDropdownPayPlaceholder] =
    useState('Type of Expense');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  const options = [
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Housing', label: 'Housing' },
    { value: 'Transport', label: 'Transport' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Other', label: 'Other' },
  ];

  const optionsPay = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Card', label: 'Card' },
  ];

  const handleAddExpense = useCallback(
    async (e) => {
      e.preventDefault();

      if (!expenseItem.amount) {
        setInputError('Enter the value');
        return;
      }

      if (expenseItem.amount.length > 9) {
        setInputError('Enter the smaller number');
        return;
      }

      if (expenseItem.amount < 0) {
        setInputError('Enter a positive value');
        return;
      }

      if (!expenseItem.type) {
        setDropdownError(true);
        return;
      }

      if (!expenseItem.pay) {
        setDropdownPayError(true);
        return;
      }

      setLoading(true);

      const newExpense = {
        amount: expenseItem.amount,
        type: expenseItem.type,
        pay: expenseItem.pay,
        description: expenseItem.description,
        date: formatDate(expenseItem.date),
        id: Date.now(),
      };

      dispatch(addExpenseAction(newExpense));
      const userDocRef = doc(firestore, 'users', currentUser?.uid);
      const userDoc = await getDoc(userDocRef);
      const money = userDoc.data().money;

      if (newExpense.pay === 'Card') {
        await updateDoc(userDocRef, {
          expenses: arrayUnion(newExpense),
          totalExpense: totalExpense + parseFloat(newExpense.amount),
          money: {
            totalCard: money.totalCard - parseFloat(newExpense.amount),
            totalCash: money.totalCash,
            totalSavings: money.totalSavings,
          },
        });
      } else if (newExpense.pay === 'Cash') {
        await updateDoc(userDocRef, {
          expenses: arrayUnion(newExpense),
          totalExpense: totalExpense + parseFloat(newExpense.amount),
          money: {
            totalCash: money.totalCash - parseFloat(newExpense.amount),
            totalCard: money.totalCard,
            totalSavings: money.totalSavings,
          },
        });
      }

      setExpenseItem({
        amount: '',
        type: '',
        description: '',
        pay: '',
        date: new Date(),
      });
      setLoading(false);
      setInputError('');
      setDropdownPlaceholder('Category');
      setDropdownPayPlaceholder('Type of expense');
    },
    [
      currentUser?.uid,
      expenseItem.amount,
      expenseItem.type,
      expenseItem.description,
      expenseItem.pay,
      expenseItem.date,
      dispatch,
      totalExpense,
    ]
  );

  const handleDropdownChange = (option) => {
    setExpenseItem({ ...expenseItem, type: option.value });
    setDropdownError(false);
  };

  const handleDropdownPayChange = (option) => {
    setExpenseItem({ ...expenseItem, pay: option.value });
    setDropdownPayError(false);
  };

  const handleAmountChange = (value) => {
    setExpenseItem({ ...expenseItem, amount: value });
    setInputError('');
  };

  const handleDescChange = (value) => {
    setExpenseItem({ ...expenseItem, description: value });
  };

  const handleDateChange = (value) => {
    setExpenseItem({ ...expenseItem, date: value });
    setInputError('');
  };

  const buttonTitle = loading ? 'Loading...' : 'Add expense';

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
          onChange={handleAmountChange}
          test="input-number-test"
        />
        <CustomInput
          label="Description"
          type="text"
          id="expense-desc"
          value={expenseItem.description}
          required
          onChange={handleDescChange}
          test="input-desc-test"
        />
        <Dropdown
          placeHolder={dropdownPlaceholder}
          setPlaceHolder={setDropdownPlaceholder}
          options={options}
          onChange={handleDropdownChange}
          error={dropdownError}
          test="dropdown-category-test"
        />
        <Dropdown
          placeHolder={dropdownPayPlaceholder}
          setPlaceHolder={setDropdownPayPlaceholder}
          options={optionsPay}
          onChange={handleDropdownPayChange}
          error={dropdownPayError}
          test="dropdown-type-test"
        />
        <DateChange onChange={handleDateChange} value={expenseItem.date} />
        <CustomButton
          test="btn-add-test"
          type="submit"
          title={buttonTitle}
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default ExpenseForm;
