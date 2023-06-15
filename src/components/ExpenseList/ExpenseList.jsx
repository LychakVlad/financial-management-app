import React, { useEffect, useState } from 'react';
import styles from './ExpenseList.module.css';
import MoonLoader from 'react-spinners/MoonLoader';
import CustomButton from '../form/Button/CustomButton';
import firebase from 'firebase/compat/app';
import {
  removeExpenseAction,
  updateExpenseAction,
} from '../../store/actions/expenseActions';
import { firestore } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expenses.expenses || []);
  const totalexpense = useSelector((state) => state.expenses.totalexpense);
  const dispatch = useDispatch();

  const currentUser = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.currentUser) {
      const fetchData = async () => {
        console.log('fetching');
        setLoading(true);
        const userId = currentUser.currentUser.uid;
        const userDocRef = firestore.collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();
        dispatch(updateExpenseAction(userData?.expenses || []));
        console.log(userData?.expenses);
        setLoading(false);
      };

      fetchData();
    }
  }, [currentUser, dispatch]);

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
                  <div className={styles.expense}>-{expense.amount} $</div>
                  <div>{expense.type}</div>
                  <div>{expense.date}</div>
                  <CustomButton
                    type="submit"
                    title="Delete"
                    onClick={() => deletePoint(expense)}
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
