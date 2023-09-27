import React, { useState } from "react";
import { formatNumber } from "../../../utils/formatNumber";
import { useSelector } from "react-redux";
import styles from "./ExpenseStats.module.css";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { formatDate } from "../../../utils/dateFormat";
import DateChange from "../../form/DateChange/DateChange";

const ExpenseStats = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const date = new Date();
  const newDate = date.setMonth(date.getMonth() - 1);
  const [dates, setDates] = useState({
    from: new Date(newDate),
    to: new Date(),
  });

  const filteredExpenses = expenses?.filter(
    (item) =>
      formatDate(dates.from) <= item.date && item.date <= formatDate(dates.to),
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
    0,
  );

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Spend $",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
          "rgba(153, 102, 255, 0.9)",
          "rgba(255, 159, 64, 0.9)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
    <div className={styles.main}>
      {" "}
      <div className={styles.dates}>
        <DateChange
          onChange={handleFromChange}
          value={dates.from}
          desc={"From:"}
        />
        <DateChange onChange={handleToChange} value={dates.to} desc={"To:"} />
      </div>
      <p>
        Your total expenses:{" "}
        <span className={styles.number}>
          {formatNumber(totalExpense) + " $"}
        </span>
      </p>
      <div className={styles.graph}>
        <Doughnut data={data} options={options} height={1000} width={300} />
      </div>
      <Link to={"/expense-tracker"} className={styles.link}>
        {" "}
        Show full list
      </Link>
    </div>
  );
};

export default ExpenseStats;
