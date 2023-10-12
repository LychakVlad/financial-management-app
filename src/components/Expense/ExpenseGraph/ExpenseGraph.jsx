import React, { useEffect, useMemo } from 'react';
import styles from './ExpenseGraph.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumber } from '../../../utils/formatNumber';
import DateChange from '../../form/DateChange/DateChange';
import { formatDate } from '../../../utils/dateFormat';
import { useAuth } from '../../../contexts/AuthContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseGraph = ({ dates, setDates }) => {
  const expenses = useSelector((state) => state.expenses?.expenses || []);
  const dispatch = useDispatch();
  const currentUser = useAuth();

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

  const categoryTotals = () => {
    return expenses?.reduce((totals, item) => {
      if (totals[item.type]) {
        totals[item.type] += parseFloat(item.amount);
      } else {
        totals[item.type] = parseFloat(item.amount);
      }
      return totals;
    }, {});
  };

  const totalExpense = () => {
    return expenses?.reduce(
      (total, item) => total + parseFloat(item.amount),
      0
    );
  };

  const handleFromChange = (value) => {
    setDates({ ...dates, from: value });
  };

  const handleToChange = (value) => {
    setDates({ ...dates, to: value });
  };

  return (
    <div className={styles.form}>
      <div className={styles.expenses}>
        <h2>Expenses:</h2>
        <div className={styles.dates}>
          <DateChange
            onChange={handleFromChange}
            value={dates.from}
            desc={'From:'}
          />
          <DateChange onChange={handleToChange} value={dates.to} desc={'To:'} />
        </div>
        <div className={styles.total} data-testid="total-expense-test">
          {' '}
          {formatNumber(totalExpense)} $ Total expense
        </div>
        <div className={styles.list}>
          {Object.entries(categoryTotals)
            .sort(([, totalA], [, totalB]) => totalB - totalA)
            .map(([category, total], index) => (
              <p key={category} data-testid={`total-expense-test-${category}`}>
                {formatNumber(total)} $
                <span className={styles.category}> in {category}</span>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseGraph;
