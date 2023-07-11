import React, { useState } from 'react';
import styles from './TransferStats.module.css';
import CustomInput from '../../form/Input/CustomInput';
import Dropdown from '../../form/Dropdown/Dropdown';
import CustomButton from '../../form/Button/CustomButton';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import {
  updateCardAction,
  updateCashAction,
  updateSavingsAction,
} from '../../../store/actions/incomeActions';

const TransferStats = ({ handleClick }) => {
  const [transferError, setTransferError] = useState(false);
  const [dropdownFromError, setDropdownFromError] = useState(false);
  const [dropdownFromPlaceholder, setDropdownFromPlaceholder] =
    useState('From');
  const [dropdownToError, setDropdownToError] = useState(false);
  const [dropdownToPlaceholder, setDropdownToPlaceholder] = useState('To');
  const [inputError, setInputError] = useState('');
  const [transferItem, setTransferItem] = useState({
    amount: '',
    from: '',
    to: '',
  });
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const options = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Card', label: 'Card' },
    { value: 'Savings', label: 'Savings' },
  ];

  const handleTransfer = async () => {
    try {
      if (!transferItem.from) {
        setDropdownFromError(true);
        return;
      }

      if (!transferItem.to) {
        setDropdownToError(true);
        return;
      }

      if (!transferItem.amount) {
        setInputError('Enter the value');
        return;
      }

      const { from, to, amount } = transferItem;

      const userDocRef = doc(firestore, 'users', currentUser?.uid);
      const userDoc = await getDoc(userDocRef);
      const money = userDoc.data().money;

      const transferMapping = {
        Card: {
          Cash: { source: 'totalCard', target: 'totalCash' },
          Savings: { source: 'totalCard', target: 'totalSavings' },
        },
        Cash: {
          Card: { source: 'totalCash', target: 'totalCard' },
          Savings: { source: 'totalCash', target: 'totalSavings' },
        },
        Savings: {
          Card: { source: 'totalSavings', target: 'totalCard' },
          Cash: { source: 'totalSavings', target: 'totalCash' },
        },
      };

      if (from in transferMapping && to in transferMapping[from]) {
        const { source, target } = transferMapping[from][to];

        const availableBalance = money[source];
        if (amount > availableBalance) {
          setInputError(
            'Transfer amount exceeds the available balance or balance is 0'
          );
          return;
        }

        const updatedMoney = {
          ...money,
          [source]: money[source] - amount,
          [target]: money[target] + amount,
        };

        await updateDoc(userDocRef, { money: updatedMoney });

        const dispatchActions = {
          Card: () => {
            dispatch(updateCardAction(money.totalCard + parseFloat(amount)));
            dispatch(updateCashAction(money.totalCash));
            dispatch(updateSavingsAction(money.totalSavings));
          },
          Cash: () => {
            dispatch(updateCashAction(money.totalCash + parseFloat(amount)));
            dispatch(updateCardAction(money.totalCard));
            dispatch(updateSavingsAction(money.totalSavings));
          },
          Savings: () => {
            dispatch(
              updateSavingsAction(money.totalSavings + parseFloat(amount))
            );
            dispatch(updateCardAction(money.totalCard));
            dispatch(updateCashAction(money.totalCash));
          },
        };

        dispatchActions[to]();

        setTransferItem({ amount: '', from: '', to: '' });
        setInputError('');
        setDropdownToPlaceholder('To');
        setDropdownFromPlaceholder('From');
        handleClick(false);
      } else {
        setTransferError('Invalid transfer combination');
      }
    } catch (error) {
      console.log('Transfer error:', error);
    }
  };

  const handleDropdownFromChange = (option) => {
    setTransferItem({ ...transferItem, from: option.value });
    setDropdownFromError(false);
  };

  const handleDropdownToChange = (option) => {
    setTransferItem({ ...transferItem, to: option.value });
    setDropdownToError(false);
  };

  const handleInputChange = (value) => {
    setTransferItem({ ...transferItem, amount: value });
    setInputError('');
  };

  return (
    <div className={styles.main}>
      <h2>Transfer money</h2>
      <div className={styles.forms}>
        <Dropdown
          placeHolder={dropdownFromPlaceholder}
          setPlaceHolder={setDropdownFromPlaceholder}
          options={options}
          onChange={handleDropdownFromChange}
          error={dropdownFromError}
        />
        <Dropdown
          placeHolder={dropdownToPlaceholder}
          setPlaceHolder={setDropdownToPlaceholder}
          options={options}
          onChange={handleDropdownToChange}
          error={dropdownToError}
        />
        <CustomInput
          label="Amount"
          type="number"
          id="transfer-amount"
          step="0.01"
          value={transferItem.amount}
          error={inputError}
          required
          onChange={handleInputChange}
        />
      </div>
      {transferError && (
        <div className={styles.transferError}>{transferError}</div>
      )}
      <CustomButton title="Confirm transfer" onClick={handleTransfer} />
    </div>
  );
};

export default TransferStats;
