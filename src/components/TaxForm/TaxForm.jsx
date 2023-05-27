import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTotalTaxLiabilityAction,
  setFilingStatusAction,
  setDeductionsAction,
  setStateTaxAction,
  setFederalTaxAction,
} from '../../store/actions/taxActions';
import { federalTaxRates, virginiaTaxRates } from '../../data/taxRates';

function TaxForm() {
  const [useStandardDeduction, setUseStandardDeduction] = useState(true);
  const totalIncome = useSelector((state) => state.incomes.totalIncome);
  const { filingStatus, deductions, stateTax, federalTax } = useSelector(
    (state) => state.taxes
  );
  const dispatch = useDispatch();

  const calculateTaxLiability = () => {
    const deductionsNum = deductions ? parseFloat(deductions) : 0;

    const calculateTaxLiabilityForBracket = (
      bracket,
      remainingIncome,
      func
    ) => {
      let taxLiability = 0;
      for (const [key, value] of Object.entries(bracket)) {
        if (remainingIncome > 0) {
          const taxableIncome = Math.min(remainingIncome, value.limit);
          taxLiability += taxableIncome * (value.rate / 100);
          remainingIncome -= taxableIncome;
          dispatch(func(taxLiability));
        } else {
          break;
        }
      }
      return taxLiability;
    };

    const virginiaTaxBrackets = virginiaTaxRates[filingStatus];
    let remainingIncome = totalIncome - deductionsNum;
    const virginiaTaxLiability = calculateTaxLiabilityForBracket(
      virginiaTaxBrackets,
      remainingIncome,
      setStateTaxAction
    );

    const federalTaxBrackets = federalTaxRates[filingStatus];
    remainingIncome = totalIncome - deductionsNum;
    const federalTaxLiability = calculateTaxLiabilityForBracket(
      federalTaxBrackets,
      remainingIncome,
      setFederalTaxAction
    );

    const ficaTaxLiability = totalIncome * (7.65 / 100);

    const totalTaxLiability =
      virginiaTaxLiability + federalTaxLiability + ficaTaxLiability;

    return totalTaxLiability.toFixed(2);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const taxLiability = calculateTaxLiability();
    dispatch(setTotalTaxLiabilityAction(taxLiability));
    console.log(taxLiability);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="filingStatus">Filing status:</label>
      <select
        id="filingStatus"
        value={filingStatus}
        onChange={(event) =>
          dispatch(setFilingStatusAction(event.target.value))
        }
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
            onChange={(event) => setDeductionsAction(event.target.value)}
          />
        </>
      )}

      <button type="submit">Calculate</button>
    </form>
  );
}

export default TaxForm;
