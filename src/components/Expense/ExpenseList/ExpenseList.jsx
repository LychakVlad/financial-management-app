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
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ExpenseList = ({ dates, setDates }) => {
  const { expenses, totalExpense } = useSelector((state) => state.expenses);
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
    try {
      const userId = currentUser.currentUser.uid;
      const userDocRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      const expenses = userData.expenses || [];

      const updatedExpenses = expenses.filter((item) => item.id !== expense.id);

      const newTotalExpense =
        userData.totalExpense - parseFloat(expense.amount);

      const moneyUpdate = { ...userData.money };

      if (expense.pay === 'Card') {
        moneyUpdate.totalCard += parseFloat(expense.amount);
      } else if (expense.pay === 'Cash') {
        moneyUpdate.totalCash += parseFloat(expense.amount);
      }

      const updateData = {
        expenses: updatedExpenses,
        totalExpense: newTotalExpense,
        money: moneyUpdate,
      };

      await updateDoc(userDocRef, updateData);

      dispatch(removeExpenseAction(expense.id));
    } catch (error) {
      console.error('Error deleting expense item:', error);
    }
  };

  return (
    <ul className={styles.list}>
      {loading ? (
        <div className={styles.loading} data-testid="loading-spinner">
          <MoonLoader color="#2e8b43" />
        </div>
      ) : (
        <>
          {expenses?.length > 0 ? (
            <div className={styles.listWrapper}>
              {expenses.map((expense, index) => (
                <div
                  data-testid={`expense-list-item-test-${index}`}
                  key={expense.id}
                  className={styles.item}
                >
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
                    test={`delete-btn-expense-item-test-${index}`}
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
