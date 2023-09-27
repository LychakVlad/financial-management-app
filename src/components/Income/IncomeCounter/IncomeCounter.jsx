import React from "react";
import IncomeForm from "../IncomeForm/IncomeForm";
import IncomeList from "../IncomeList/IncomeList";
import styles from "./IncomeCounter.module.css";

function IncomeCounter() {
  return (
    <div className={styles.main} id="income-counter">
      <IncomeForm />
      <IncomeList />
    </div>
  );
}

export default IncomeCounter;
