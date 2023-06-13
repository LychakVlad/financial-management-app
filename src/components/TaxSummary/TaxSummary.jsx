import React from 'react';
import { useSelector } from 'react-redux';
import styles from './TaxSummary.module.css';

function TaxSummary() {
  const totalIncome = useSelector((state) => state.incomes.totalIncome);
  const { stateTax, federalTax, totalTaxLiability } = useSelector(
    (state) => state.taxes
  );
  return (
    <div className={styles.form}>
      <p>
        State tax: <span className={styles.tax}>{stateTax}%</span>
      </p>
      <p>
        Federal tax: <span className={styles.tax}>{federalTax}%</span>
      </p>
      <p>
        FICA tax: <span className={styles.tax}> 7.65%</span>
      </p>

      <p>
        Your total income: <span className={styles.income}>{totalIncome}$</span>
      </p>
      <p>
        You need to pay:{' '}
        <span className={styles.totalTax}>{totalTaxLiability}$</span>
      </p>
    </div>
  );
}

export default TaxSummary;
