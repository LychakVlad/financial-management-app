import React from 'react';
import styles from './ExpenseGraph.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../utils/formatNumber';
import DateChange from '../../form/DateChange/DateChange';
import { formatDate } from '../../../utils/dateFormat';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseGraph = ({ dates, setDates }) => {
  const expenses = useSelector((state) => state.expenses.expenses || []);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const filteredExpenses = expenses?.filter(
    (item) =>
      formatDate(dates.from) <= item.date && item.date <= formatDate(dates.to)
  );

  const categoryTotals = filteredExpenses?.reduce((totals, item) => {
    if (totals[item.type]) {
      totals[item.type] += parseFloat(item.amount);
    } else {
      totals[item.type] = parseFloat(item.amount);
    }
    return totals;
  }, {});

  const totalExpense = filteredExpenses?.reduce(
    (total, item) => total + parseFloat(item.amount),
    0
  );

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Spend $',
        data: Object.values(categoryTotals),
        backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.9)',
          'rgba(153, 102, 255, 0.9)',
          'rgba(255, 159, 64, 0.9)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
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
          <DateChange onChange={handleFromChange} value={dates.from} />
          <DateChange onChange={handleToChange} value={dates.to} />
        </div>
        <div className={styles.list}>
          <p>{totalExpense}$ Total expense</p>
          {Object.entries(categoryTotals)
            .sort(([, totalA], [, totalB]) => totalB - totalA)
            .map(([category, total]) => (
              <p key={category}>
                {formatNumber(total)} $
                <span className={styles.category}> in {category}</span>
              </p>
            ))}
        </div>
      </div>
      <div className={styles.graph}>
        <Doughnut data={data} options={options} height={1000} width={300} />
      </div>
    </div>
  );
};

export default ExpenseGraph;
