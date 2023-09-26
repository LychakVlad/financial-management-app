import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../utils/dateFormat';
import {
  addIncomeAction,
  updateCardAction,
  updateCashAction,
} from '../../../store/actions/incomeActions';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import styles from './IncomeForm.module.css';
import CustomInput from '../../form/Input/CustomInput';
import Dropdown from '../../form/Dropdown/Dropdown';
import CustomButton from '../../form/Button/CustomButton';
import { useAuth } from '../../../contexts/AuthContext';
import DateChange from '../../form/DateChange/DateChange';

function IncomeForm() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { totalAmount, incomes } = useSelector((state) => state.incomes);
  const dispatch = useDispatch();
  const [incomeItem, setIncomeItem] = useState({
    amount: '',
    type: '',
    tax: '',
    date: new Date(),
  });
  const [dropdownTaxError, setDropdownTaxError] = useState(false);
  const [dropdownTaxPlaceholder, setDropdownTaxPlaceholder] =
    useState('Is it taxable?');
  const [dropdownError, setDropdownError] = useState(false);
  const [dropdownPlaceholder, setDropdownPlaceholder] =
    useState('Type of Income');
  const [inputError, setInputError] = useState('');

  const optionsTax = [
    { value: 'Taxable', label: 'Taxable' },
    { value: 'After tax', label: 'After tax' },
  ];

  const optionsPay = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Card', label: 'Card' },
  ];

  const handleAddIncome = useCallback(
    async (e) => {
      e.preventDefault();

      if (!incomeItem.amount) {
        setInputError('Enter the value');
        return;
      }

      if (incomeItem.amount.length > 9) {
        setInputError('Enter the smaller number');
        return;
      }

      if (incomeItem.amount < 0) {
        setInputError('Enter a positive value');
        return;
      }

      if (!incomeItem.type) {
        setDropdownError(true);
        return;
      }

      if (!incomeItem.tax) {
        setDropdownTaxError(true);
        return;
      }

      setLoading(true);

      const income = {
        amount: incomeItem.amount,
        type: incomeItem.type,
        tax: incomeItem.tax,
        date: formatDate(incomeItem.date),
        id: Date.now(),
      };

      dispatch(addIncomeAction(income));

      const totalCash = incomes
        .filter((item) => item.type === 'Cash')
        .reduce((total, item) => total + parseFloat(item.amount), 0);

      const totalCard = incomes
        .filter((item) => item.type === 'Card')
        .reduce((total, item) => total + parseFloat(item.amount), 0);

      const userDocRef = doc(firestore, 'users', currentUser?.uid);
      const userDoc = await getDoc(userDocRef);
      const money = userDoc.data().money;

      await updateDoc(userDocRef, {
        incomes: arrayUnion(income),
        money: {
          ...money,
          totalCash:
            totalCash +
            (incomeItem.type === 'Cash' ? parseFloat(incomeItem.amount) : 0),
          totalCard:
            totalCard +
            (incomeItem.type === 'Card' ? parseFloat(incomeItem.amount) : 0),
          totalMoney: totalAmount + parseFloat(incomeItem.amount),
        },
      });

      dispatch(updateCashAction(totalCash));
      dispatch(updateCardAction(totalCard));

      setIncomeItem({ amount: '', type: '', date: new Date() });
      setInputError('');
      setDropdownPlaceholder('Type of Income');
      setDropdownTaxPlaceholder('Is it taxable?');
      setLoading(false);
    },
    [
      currentUser?.uid,
      incomeItem.amount,
      incomeItem.type,
      incomeItem.tax,
      incomeItem.date,
      incomes,
      dispatch,
      totalAmount,
    ]
  );

  const handleDropdownChange = (option) => {
    setIncomeItem({ ...incomeItem, type: option.value });
    setDropdownError(false);
  };

  const handleTaxDropdownChange = (option) => {
    setIncomeItem({ ...incomeItem, tax: option.value });
    setDropdownTaxError(false);
  };

  const handleInputChange = (value) => {
    setIncomeItem({ ...incomeItem, amount: value });
    setInputError('');
  };

  const handleDateChange = (value) => {
    setIncomeItem({ ...incomeItem, date: value });
    setInputError('');
  };

  const buttonTitle = loading ? 'Loading...' : 'Add income';

  return (
    <form onSubmit={handleAddIncome} className={styles.form}>
      <h2 className={styles.title}>Write down your income</h2>
      <div className={styles.inputs}>
        <CustomInput
          label="Amount"
          type="number"
          id="income"
          step="0.01"
          value={incomeItem.amount}
          error={inputError}
          required
          onChange={handleInputChange}
          maxLength={6}
          test="input-number-test"
        />
        <Dropdown
          placeHolder={dropdownPlaceholder}
          setPlaceHolder={setDropdownPlaceholder}
          options={optionsPay}
          onChange={handleDropdownChange}
          error={dropdownError}
          test="dropdown-type-test"
        />
        <DateChange onChange={handleDateChange} value={incomeItem.date} />
        <Dropdown
          placeHolder={dropdownTaxPlaceholder}
          setPlaceHolder={setDropdownTaxPlaceholder}
          options={optionsTax}
          onChange={handleTaxDropdownChange}
          error={dropdownTaxError}
          test="dropdown-tax-test"
        />
        <CustomButton
          test="btn-add-test"
          type="submit"
          title={buttonTitle}
          disabled={loading}
        />
      </div>
    </form>
  );
}

export default IncomeForm;
