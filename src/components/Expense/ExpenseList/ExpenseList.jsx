import React, { useEffect, useState } from 'react';
import styles from './ExpenseList.module.css';
import MoonLoader from 'react-spinners/MoonLoader';
import firebase from 'firebase/compat/app';
import {
  removeExpenseAction,
  updateExpenseAction,
} from '../../../store/actions/expenseActions';
import { firestore } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../contexts/AuthContext';
import CustomButton from '../../form/Button/CustomButton';
import { formatNumber } from '../../../utils/formatNumber';
import { formatDate } from '../../../utils/dateFormat';

const ExpenseList = ({ dates, setDates }) => {
  const expenses = useSelector((state) => state.expenses.expenses || []);
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

        const sortedExpenses = Array.isArray(userData?.expenses)
          ? userData.expenses.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )
          : [];

        const filteredExpenses = sortedExpenses.filter(
          (item) =>
            formatDate(dates.from) <= item.date &&
            item.date <= formatDate(dates.to)
        );

        dispatch(updateExpenseAction(filteredExpenses));
      };

      fetchData();
    }
  }, [currentUser, dispatch, dates]);

  const deletePoint = async (expense) => {
    const userId = currentUser?.currentUser?.uid;

    await firestore
      .collection('users')
      .doc(userId)
      .update({
        expenses: firebase.firestore.FieldValue.arrayRemove(expense),
      });

    dispatch(removeExpenseAction(expense.id));
  };

  return (
    <ul className={styles.list}>
      {loading ? (
        <div className={styles.loading}>
          <MoonLoader color="#2e8b43" />
        </div>
      ) : (
        <>
          {expenses.length > 0 ? (
            <div className={styles.listWrapper}>
              {expenses.map((expense) => (
                <div key={expense.id} className={styles.item}>
                  <span className={styles.expense}>
                    -{formatNumber(expense.amount)} $
                  </span>
                  <span className={styles.description}>
                    {expense.description}
                  </span>
                  <span>{expense.type}</span>
                  <span>{expense.pay}</span>
                  <span>{expense.date}</span>
                  <CustomButton
                    type="submit"
                    title="Delete"
                    onClick={() => deletePoint(expense)}
                    disabled={loading}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>No expense yet...</div>
          )}
        </>
      )}
    </ul>
  );
};

export default ExpenseList;
