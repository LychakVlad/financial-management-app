import React from "react";
import TaxForm from "../TaxForm/TaxForm";
import TaxSummary from "../TaxSummary/TaxSummary";
import styles from "./TaxCalculator.module.css";

function TaxCalculator() {
  return (
    <div className={styles.section}>
      <TaxForm />
      <TaxSummary />
    </div>
  );
}

export default TaxCalculator;
