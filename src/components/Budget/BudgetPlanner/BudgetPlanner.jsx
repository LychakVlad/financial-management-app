import React from "react";
import styles from "./BudgetPlanner.module.css";
import BudgetTabs from "../BudgetTabs/BudgetTabs";
import BudgetNeeds from "../BudgetNeeds/BudgetNeeds";
import { useSelector } from "react-redux";
import BudgetWants from "../BudgetWants/BudgetWants";
import BudgetSavings from "../BudgetSavings/BudgetSavings";
import BudgetTotal from "../BudgetTotal/BudgetTotal";

const BudgetPlanner = () => {
  const tab = useSelector((state) => state.tabs.currentTab);

  return (
    <div className={styles.section}>
      <BudgetTabs />
      <div className={styles.bottom}>
        {tab === "needs" ? <BudgetNeeds /> : null}
        {tab === "wants" ? <BudgetWants /> : null}
        {tab === "savings" ? <BudgetSavings /> : null}
        {tab === "total" ? <BudgetTotal /> : null}
      </div>
    </div>
  );
};

export default BudgetPlanner;
