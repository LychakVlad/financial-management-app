import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../utils/dateFormat';
import { addIncomeAction } from '../../../store/actions/incomeActions';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

import { firestore } from '../../../firebase';
import styles from './IncomeForm.module.css';
import CustomInput from '../../form/Input/CustomInput';
import Dropdown from '../../form/Dropdown/Dropdown';
import CustomButton from '../../form/Button/CustomButton';
import { useAuth } from '../../../contexts/AuthContext';

function IncomeForm() {
  const { currentUser } = useAuth();
  const totalAmount = useSelector((state) => state.incomes.totalAmount);
  const dispatch = useDispatch();
  const [incomeItem, setIncomeItem] = useState({
    amount: '',
    type: '',
  });
  const [dropdownError, setDropdownError] = useState(false);
  const [dropdownPlaceholder, setDropdownPlaceholder] =
    useState('Type of Income');
  const [inputError, setInputError] = useState('');

  const options = [
    { value: 'Taxable', label: 'Taxable' },
    { value: 'After tax', label: 'After tax' },
  ];

  const handleAddIncome = useCallback(
    async (e) => {
      e.preventDefault();

      if (!incomeItem.amount) {
        setInputError('Enter the value');
        return;
      }

      if (!incomeItem.type) {
        setDropdownError(true);
        return;
      }

      const income = {
        amount: incomeItem.amount,
        type: incomeItem.type,
        date: formatDate(new Date()),
        id: Date.now(),
      };

      dispatch(addIncomeAction(income));

      await updateDoc(doc(firestore, 'users', currentUser?.uid), {
        incomes: arrayUnion(income),
        totalAmount: totalAmount + parseFloat(incomeItem.amount),
      });

      setIncomeItem({ amount: '', type: '' });
      setInputError('');
      setDropdownPlaceholder('Type of Income');
    },
    [
      currentUser?.uid,
      incomeItem.amount,
      incomeItem.type,
      dispatch,
      totalAmount,
    ]
  );

  const handleDropdownChange = (option) => {
    setIncomeItem({ ...incomeItem, type: option.value });
    setDropdownError(false);
  };

  const handleInputChange = (value) => {
    setIncomeItem({ ...incomeItem, amount: value });
    setInputError('');
  };

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
        />
        <Dropdown
          placeHolder={dropdownPlaceholder}
          setPlaceHolder={setDropdownPlaceholder}
          options={options}
          onChange={handleDropdownChange}
          error={dropdownError}
        />
        <CustomButton type="submit" title="Add income" />
      </div>
    </form>
  );
}

export default IncomeForm;
