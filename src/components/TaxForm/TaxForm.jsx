import React from 'react';

function TaxForm({
  filingStatus,
  setFilingStatus,
  deductions,
  setDeductions,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="filingStatus">Filing status:</label>
      <select
        id="filingStatus"
        value={filingStatus}
        onChange={(event) => setFilingStatus(event.target.value)}
      >
        <option value="single">Single</option>
        <option value="married">Married</option>
      </select>

      <label htmlFor="deductions">Deductions:</label>
      <input
        type="number"
        id="deductions"
        value={deductions}
        onChange={(event) => setDeductions(event.target.value)}
      />

      <button type="submit">Calculate</button>
    </form>
  );
}

export default TaxForm;
