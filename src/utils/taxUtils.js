export function calculateTaxLiabilityForBracket(
  bracket,
  remainingIncome,
  setTaxRate
) {
  let taxLiability = 0;
  for (const [key, value] of Object.entries(bracket)) {
    if (remainingIncome > 0) {
      const taxableIncome = Math.min(remainingIncome, value.limit);
      taxLiability += taxableIncome * (value.rate / 100);
      remainingIncome -= taxableIncome;
      setTaxRate(value.rate);
    } else {
      break;
    }
  }
  return taxLiability;
}

export function calculateTaxLiability(
  virginiaTaxRates,
  federalTaxRates,
  filingStatus,
  totalIncome,
  deductions,
  ficaTaxRate,
  setStateTax,
  setFederalTax
) {
  const deductionsNum = deductions ? parseFloat(deductions) : 0;

  const virginiaTaxBrackets = virginiaTaxRates[filingStatus];
  let remainingIncome = totalIncome - deductionsNum;
  const virginiaTaxLiability = calculateTaxLiabilityForBracket(
    virginiaTaxBrackets,
    remainingIncome,
    setStateTax
  );

  const federalTaxBrackets = federalTaxRates[filingStatus];
  remainingIncome = totalIncome - deductionsNum;
  const federalTaxLiability = calculateTaxLiabilityForBracket(
    federalTaxBrackets,
    remainingIncome,
    setFederalTax
  );

  const ficaTaxLiability = totalIncome * (ficaTaxRate / 100);

  const totalTaxLiability =
    virginiaTaxLiability + federalTaxLiability + ficaTaxLiability;

  return totalTaxLiability.toFixed(2);
}
