import React, { useState } from 'react';

function TaxForm({
  filingStatus,
  setFilingStatus,
  deductions,
  setDeductions,
  handleSubmit,
}) {
  const [useStandardDeduction, setUseStandardDeduction] = useState(true);

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

      <label htmlFor="useStandardDeduction">Use standard deduction:</label>
      <input
        type="radio"
        id="useStandardDeductionYes"
        name="useStandardDeduction"
        value="yes"
        checked={useStandardDeduction}
        onChange={() => setUseStandardDeduction(true)}
      />
      <label htmlFor="useStandardDeductionYes">Yes</label>
      <input
        type="radio"
        id="useStandardDeductionNo"
        name="useStandardDeduction"
        value="no"
        checked={!useStandardDeduction}
        onChange={() => setUseStandardDeduction(false)}
      />
      <label htmlFor="useStandardDeductionNo">No</label>

      {useStandardDeduction ? (
        <p>Standard deduction: $12,500</p>
      ) : (
        <>
          <label htmlFor="deductions">Custom deductions:</label>
          <input
            type="number"
            id="deductions"
            value={deductions}
            onChange={(event) => setDeductions(event.target.value)}
          />
        </>
      )}

      <button type="submit">Calculate</button>
    </form>
  );
}

export default TaxForm;
