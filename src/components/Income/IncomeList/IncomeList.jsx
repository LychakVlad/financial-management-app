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
  const { totalIncome } = useSelector((state) => state.incomes);
  const dispatch = useDispatch();

  const currentUser = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.currentUser) {
      const fetchData = async () => {
        setLoading(true);
        const userId = currentUser.currentUser.uid;
        const userDocRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        setLoading(false);

        const sortedIncomes =
          userData.incomes.length > 0
            ? userData?.incomes?.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
              )
            : [];

        dispatch(updateIncomeAction(sortedIncomes || []));
      };

      fetchData();
    }
  }, [currentUser, dispatch]);

  const deleteAll = async () => {
    const userDocRef = doc(firestore, 'users', currentUser?.currentUser?.uid);
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

    await updateDoc(userDocRef, {
      incomes: arrayRemove(income),
      money: {
        ...money,
        totalCash: updatedCash,
        totalCard: updatedCard,
        totalMoney: money.totalMoney - income.amount,
      },
    });

    dispatch(removeIncomeAction(income.id));
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
              {incomes.map((income, index) => (
                <div
                  data-testid={`income-list-item-test-${index}`}
                  key={income.id}
                  className={styles.item}
                >
                  <span className={styles.income}>
                    +{formatNumber(income.amount)} $
                  </span>
                  <span className={styles.date}>{income.date}</span>
                  <span>{income.type}</span>
                  <span>{income.tax}</span>
                  <CustomButton
                    type="submit"
                    title="Delete"
                    onClick={() => deletePoint(income)}
                    disabled={loading}
                    test={`delete-btn-income-item-test-${index}`}
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

        <CustomButton
          test={`delete-all-income-btn-test`}
          type="submit"
          title="Delete all"
          onClick={deleteAll}
        />
      </div>
    </ul>
  );
}

export default IncomeList;
