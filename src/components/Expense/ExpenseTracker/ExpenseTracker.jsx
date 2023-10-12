import React, { useEffect, useState } from 'react';
import styles from './ExpenseTracker.module.css';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import ExpenseGraph from '../ExpenseGraph/ExpenseGraph';
import ExpenseList from '../ExpenseList/ExpenseList';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { formatDate } from '../../../utils/dateFormat';
import { updateExpenseAction } from '../../../store/actions/expenseActions';

const ExpenseTracker = ({ fetchData }) => {
  const date = new Date();
  const newDate = date.setMonth(date.getMonth() - 1);
  const [dates, setDates] = useState({
    from: new Date(newDate),
    to: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser?.currentUser) {
      const fetchData = async () => {
        setLoading(true);
        const userId = currentUser.currentUser.uid;
        const userDocRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc?.data();
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

  return (
    <div className={styles.main}>
      <ExpenseForm />
      <ExpenseGraph setDates={setDates} dates={dates} />
      <ExpenseList setDates={setDates} loading={loading} />
    </div>
  );
};

export default ExpenseTracker;
