import React from 'react';

function IncomeList({ incomeList, totalIncome }) {
  return (
    <ul>
      {incomeList.map((item, index) => (
        <li key={index}>{item + '$'}</li>
      ))}
      <p>Your total income: {totalIncome}$</p>
    </ul>
  );
}

export default IncomeList;
