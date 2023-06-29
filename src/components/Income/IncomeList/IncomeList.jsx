import React, { useEffect, useState } from 'react';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeIncomeAction,
  updateCardAction,
  updateCashAction,
  updateIncomeAction,
  updateSavingsAction,
} from '../../../store/actions/incomeActions';

import styles from './IncomeList.module.css';
import MoonLoader from 'react-spinners/MoonLoader';
import { useAuth } from '../../../contexts/AuthContext';
import CustomButton from '../../form/Button/CustomButton';
import { formatNumber } from '../../../utils/formatNumber';

function IncomeList() {
  const incomes = useSelector((state) => state.incomes.incomes || []);
  const { totalIncome, totalCard, totalCash, totalSavings, totalAmount } =
    useSelector((state) => state.incomes);
  const dispatch = useDispatch();

  const currentUser = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.currentUser) {
      const fetchData = async () => {
        setLoading(true);
        const userId = currentUser.currentUser.uid;
        const userDocRef = firestore.collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();
        setLoading(false);
        dispatch(updateIncomeAction(userData?.incomes || []));
      };

      fetchData();
    }
  }, [currentUser, dispatch]);

  const deleteAll = async () => {
    const userDocRef = doc(
      firestore,
      'users',
      currentUser?.currentUser?._delegate?.uid
    );

    const userDoc = await getDoc(userDocRef);
    const money = userDoc.data().money;

    await updateDoc(userDocRef, {
      incomes: [],
      money: {
        ...money,
        totalCard: 0,
        totalSavings: 0,
        totalCash: 0,
        totalMoney: 0,
      },
    });

    dispatch(updateCashAction(0));
    dispatch(updateCardAction(0));
    dispatch(updateSavingsAction(0));
    dispatch(updateIncomeAction([]));
  };

  const deletePoint = async (income) => {
    const userDocRef = doc(firestore, 'users', currentUser?.currentUser?.uid);
    const userDoc = await getDoc(userDocRef);
    const money = userDoc.data().money;

    let updatedCash =
      money.totalCash -
      (income.type === 'Cash' ? parseFloat(income.amount) : 0);
    let updatedCard =
      money.totalCard -
      (income.type === 'Card' ? parseFloat(income.amount) : 0);

    let adjustedAmount = 0;

    if (totalSavings === 0) {
      if (updatedCash < 0) {
        adjustedAmount = Math.abs(updatedCash);
        console.log(adjustedAmount);
        dispatch(updateCardAction(updatedCard - adjustedAmount));
        updatedCard = updatedCard - adjustedAmount;
      } else if (updatedCard < 0) {
        adjustedAmount = Math.abs(updatedCard);
        dispatch(updateCashAction(updatedCash - adjustedAmount));
        updatedCash = totalCash - adjustedAmount;
      }
    } else {
      adjustedAmount = parseFloat(income.amount);
      if (totalSavings > 0) {
        dispatch(updateSavingsAction(totalSavings - adjustedAmount));
      }
    }

    console.log(adjustedAmount);

    const updatedTotalSavings = totalSavings - adjustedAmount;
    const updatedTotalMoney = totalAmount - adjustedAmount;

    await updateDoc(userDocRef, {
      incomes: arrayRemove(income),
      money: {
        ...money,
        totalCash: updatedCash <= 0 ? 0 : updatedCash,
        totalCard: updatedCard <= 0 ? 0 : updatedCard,
        totalSavings: totalSavings > 0 ? updatedTotalSavings : totalSavings,
        totalMoney: updatedTotalMoney,
      },
    });

    dispatch(removeIncomeAction(income.id));

    const updatedUserDoc = await getDoc(userDocRef);
    const updatedUserData = updatedUserDoc.data();

    dispatch(updateCardAction(updatedUserData.money.totalCard));
    dispatch(updateCashAction(updatedUserData.money.totalCash));
    dispatch(updateIncomeAction(updatedUserData.incomes || []));
  };

  return (
    <ul className={styles.list}>
      {loading ? (
        <div className={styles.loading}>
          <MoonLoader color="#2e8b43" />
        </div>
      ) : (
        <>
          {incomes.length > 0 ? (
            <div className={styles.listWrapper}>
              {incomes.map((income) => (
                <div key={income.id} className={styles.item}>
                  <div className={styles.income}>
                    +{formatNumber(income.amount)} $
                  </div>
                  <div>{income.type}</div>
                  <div>{income.tax}</div>
                  <div>{income.date}</div>
                  <CustomButton
                    type="submit"
                    title="Delete"
                    onClick={() => deletePoint(income)}
                    disabled={loading}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>No income yet...</div>
          )}
        </>
      )}
      <div className={styles.total}>
        <p>
          Your total income:
          {loading ? (
            <span className={styles.totalDigit}> Loading...</span>
          ) : (
            <span className={styles.totalDigit}>
              {' '}
              {formatNumber(totalIncome)} $
            </span>
          )}
        </p>

        <CustomButton type="submit" title="Delete all" onClick={deleteAll} />
      </div>
    </ul>
  );
}

export default IncomeList;
