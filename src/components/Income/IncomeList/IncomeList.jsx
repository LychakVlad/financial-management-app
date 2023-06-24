import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { firestore } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeIncomeAction,
  updateIncomeAction,
} from '../../../store/actions/incomeActions';

import styles from './IncomeList.module.css';
import MoonLoader from 'react-spinners/MoonLoader';
import { useAuth } from '../../../contexts/AuthContext';
import CustomButton from '../../form/Button/CustomButton';
import { formatNumber } from '../../../utils/formatNumber';

function IncomeList() {
  const incomes = useSelector((state) => state.incomes.incomes || []);
  const totalIncome = useSelector((state) => state.incomes.totalIncome);
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
          totalIncome: 0,
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
