import React from 'react';
import styles from './BudgetTotal.module.css';
import { useSelector } from 'react-redux';

const BudgetTotal = () => {
  const { totalWants, totalSavings, totalNeeds } = useSelector(
    (state) => state.budget
  );
  const totalIncome = useSelector((state) => state.incomes.totalIncome);
  const totalTax = useSelector((state) => state.taxes.totalTaxLiability);

  const totalAfterTax = Math.round(totalIncome - totalTax);

  return (
    <div className={styles.main}>
      <div>
        <h2 className={styles.title}>Your totals:</h2>
        <ul className={styles.list}>
          <li className={styles.point}>Needs: {totalNeeds} $</li>
          <li className={styles.point}>Wants: {totalWants} $</li>
          <li className={styles.point}>
            Savings and debt repayment: {totalSavings} $
          </li>
        </ul>
      </div>
      <div>
        <h2 className={styles.title}>50/30/20 comparison:</h2>
        <ul className={styles.list}>
          {' '}
          <li className={styles.point}>
            Your total income after tax: {totalAfterTax} $
          </li>
          <li className={styles.point}>
            50% for necessities: {(totalAfterTax / 100) * 50}
          </li>
          <li className={styles.point}>
            30% for wants: {(totalAfterTax / 100) * 30}
          </li>
          <li className={styles.point}>
            20% for savings and debt repayment: {(totalAfterTax / 100) * 20}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BudgetTotal;
