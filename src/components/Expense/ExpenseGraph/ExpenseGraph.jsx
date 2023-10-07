import React, { useMemo } from 'react';
import styles from './ExpenseGraph.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../utils/formatNumber';
import DateChange from '../../form/DateChange/DateChange';
import { formatDate } from '../../../utils/dateFormat';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseGraph = ({ dates, setDates }) => {
  const expenses = useSelector((state) => state.expenses?.expenses || []);

  const filteredExpenses = useMemo(
    () =>
      expenses?.filter(
        (item) =>
          formatDate(dates.from) <= item.date &&
          item.date <= formatDate(dates.to)
      ),
    [expenses, dates]
  );

  const categoryTotals = useMemo(() => {
    return filteredExpenses?.reduce((totals, item) => {
      if (totals[item.type]) {
        totals[item.type] += parseFloat(item.amount);
      } else {
        totals[item.type] = parseFloat(item.amount);
      }
      return totals;
    }, {});
  }, [filteredExpenses]);

  const totalExpense = useMemo(() => {
    return filteredExpenses?.reduce(
      (total, item) => total + parseFloat(item.amount),
      0
    );
  }, [filteredExpenses]);

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
