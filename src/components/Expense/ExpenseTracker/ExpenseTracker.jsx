import React, { useState } from "react";
import styles from "./ExpenseTracker.module.css";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import ExpenseGraph from "../ExpenseGraph/ExpenseGraph";
import ExpenseList from "../ExpenseList/ExpenseList";

const ExpenseTracker = () => {
  const date = new Date();
  const newDate = date.setMonth(date.getMonth() - 1);
  const [dates, setDates] = useState({
    from: new Date(newDate),
    to: new Date(),
  });
  return (
    <div className={styles.main}>
      <ExpenseForm />
      <ExpenseGraph dates={dates} setDates={setDates} />
      <ExpenseList dates={dates} setDates={setDates} />
    </div>
  );
};

export default ExpenseTracker;
