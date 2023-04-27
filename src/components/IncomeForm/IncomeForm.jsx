import React from 'react';

function IncomeForm({ income, setIncome, handleAddIncome }) {
  function handleSubmit(event) {
    event.preventDefault();
    handleAddIncome(income);
    setIncome('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Write your income in the input below</h2>
      <label htmlFor="income">Income:</label>
      <input
        type="number"
        id="income"
        step="0.01"
        value={income}
        onChange={(event) => setIncome(event.target.value)}
        required
      />
      <button type="submit">Add Income</button>
    </form>
  );
}

export default IncomeForm;
