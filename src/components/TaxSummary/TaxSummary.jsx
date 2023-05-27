import React from 'react';
import { useSelector } from 'react-redux';

function TaxSummary() {
  const totalIncome = useSelector((state) => state.incomes.totalIncome);
  const { stateTax, federalTax, totalTaxLiability } = useSelector(
    (state) => state.taxes
  );
  return (
    <div>
      <p>State tax: {stateTax}%</p>
      <p>Federal tax: {federalTax}%</p>
      <p>FICA tax: 7.65%</p>

      <p>Your total income: {totalIncome}$</p>
      <p>You need to pay: {totalTaxLiability}$</p>
    </div>
  );
}

export default TaxSummary;
