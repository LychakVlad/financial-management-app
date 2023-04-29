import React from 'react';

function IncomeForm({ income, setIncome, type, setType, handleAddIncome }) {
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
      <label htmlFor="type">Type:</label>
      <input
        type="text"
        id="type"
        value={type}
        onChange={(event) => setType(event.target.value)}
        required
      />
      <button type="submit">Add Income</button>
    </form>
  );
}

export default IncomeForm;
