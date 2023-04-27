import React, { useState } from 'react';
import { virginiaTaxRates, federalTaxRates } from '../../data/taxRates';
import { calculateTaxLiability } from '../../utils/taxUtils';
import TaxForm from '../TaxForm/TaxForm';
import TaxSummary from '../TaxSummary/TaxSummary';
import styles from './TaxCalculator.module.css';

function TaxCalculator({ totalIncome }) {
  const [filingStatus, setFilingStatus] = useState('single');
  const [deductions, setDeductions] = useState('');
  const [totalTaxLiability, setTotalTaxLiability] = useState(0);
  const [stateTax, setStateTax] = useState(0);
  const [federalTax, setFederalTax] = useState(0);
  const [ficaTaxRate] = useState(7.65);

  function handleSubmit(e) {
    e.preventDefault();
    const taxLiability = calculateTaxLiability(
      virginiaTaxRates,
      federalTaxRates,
      filingStatus,
      totalIncome,
      deductions,
      ficaTaxRate,
      setStateTax,
      setFederalTax
    );
    setTotalTaxLiability(taxLiability);
  }

  return (
    <div className={styles.section}>
      <TaxForm
        filingStatus={filingStatus}
        setFilingStatus={setFilingStatus}
        deductions={deductions}
        setDeductions={setDeductions}
        handleSubmit={handleSubmit}
      />
      <TaxSummary
        stateTax={stateTax}
        ficaTaxRate={ficaTaxRate}
        federalTax={federalTax}
        totalIncome={totalIncome}
        totalTaxLiability={totalTaxLiability}
      />
    </div>
  );
}

export default TaxCalculator;
