import React from 'react';
import styles from './ExpenseGraph.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseGraph = () => {
  const expenses = useSelector((state) => state.expenses.expenses || []);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const categoryTotals = expenses.reduce((totals, item) => {
    if (totals[item.type]) {
      totals[item.type] += parseFloat(item.amount);
    } else {
      totals[item.type] = parseFloat(item.amount);
    }
    return totals;
  }, {});

  const data = {
    labels: expenses.map((item) => `You spend $${item.amount} on ${item.type}`),
    datasets: [
      {
        label: 'Spend $',
        data: expenses.map((item) => item.amount),
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

  return (
    <div className={styles.form}>
      <div className={styles.expenses}>
        <h2>Expenses:</h2>
        {Object.entries(categoryTotals).map(([category, total]) => (
          <p key={category}>
            You spend ${total.toFixed(2)} in {category}
          </p>
        ))}
      </div>
      <Doughnut data={data} options={options} height={1000} width={1000} />
    </div>
  );
};

export default ExpenseGraph;
