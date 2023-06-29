import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
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
  const { totalIncome, totalCash, totalCard, totalSavings } = useSelector(
    (state) => state.incomes
  );
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
    await updateDoc(
      doc(firestore, 'users', currentUser?.currentUser?._delegate?.uid),
      {
        incomes: {},
        money: {
          totalIncome: totalIncome,
        },
      }
    );
    dispatch(updateIncomeAction([]));
  };

  const deletePoint = async (income) => {
    const userId = currentUser?.currentUser?.uid;

    await firestore
      .collection('users')
      .doc(userId)
      .update({
        incomes: firebase.firestore.FieldValue.arrayRemove(income),
        money: {
          totalCash: totalCash,
          totalCard: totalCard,
        },
      });

    if (income.type === 'Cash' && totalIncome !== 0) {
      dispatch(updateCashAction(totalCash - parseFloat(income.amount)));
    } else if (income.type === 'Card' && totalIncome !== 0) {
      dispatch(updateCardAction(totalCard - parseFloat(income.amount)));
    } else {
      dispatch(updateSavingsAction(totalSavings - parseFloat(income.amount)));
    }

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
