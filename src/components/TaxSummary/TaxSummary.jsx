import React from 'react';

function TaxSummary({
  stateTax,
  federalTax,
  ficaTaxRate,
  totalIncome,
  totalTaxLiability,
}) {
  return (
    <div>
      <p>State tax: {stateTax}%</p>
      <p>Federal tax: {federalTax}%</p>
      <p>FICA tax: {ficaTaxRate}%</p>

      <p>Your total income: {totalIncome}$</p>
      <p>You need to pay: {totalTaxLiability}$</p>
    </div>
  );
}

export default TaxSummary;
