import React from 'react';
import styles from './BudgetTotal.module.css';
import { useSelector } from 'react-redux';

const BudgetTotal = () => {
  const { totalWants, totalSavings, totalNeeds } = useSelector(
    (state) => state.budget
  );
  const totalIncome = useSelector((state) => state.incomes.totalIncome);

  return (
    <div>
      <ul>
        <li>Total Needs: {totalNeeds} $</li>
        <li>Total Wants: {totalWants} $</li>
        <li>Total Savings: {totalSavings} $</li>
      </ul>
      <div>
        <div>Your total income: {totalIncome} $</div>
        <div>50/30/20 comparison:</div>
        <div>50% for necessities: {(totalIncome / 100) * 50}</div>
        <div>30% for wants: {(totalIncome / 100) * 30}</div>
        <div>
          20% for savings and debt repayment: {(totalIncome / 100) * 20}
        </div>
      </div>
    </div>
  );
};

export default BudgetTotal;
