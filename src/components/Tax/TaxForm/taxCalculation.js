import {
  setStateTaxAction,
  setFederalTaxAction,
} from "../../../store/actions/taxActions";

export const calculateTaxLiability = (
  deductions,
  filingStatus,
  totalIncome,
  virginiaTaxRates,
  federalTaxRates,
  dispatch,
) => {
  const deductionsNum = deductions ? parseFloat(deductions) : 0;

  const calculateTaxLiabilityForBracket = (bracket, remainingIncome, func) => {
    let taxLiability = 0;
    for (const [key, value] of Object.entries(bracket)) {
      if (remainingIncome > 0) {
        const taxableIncome = Math.min(remainingIncome, value.limit);
        taxLiability += taxableIncome * (value.rate / 100);
        remainingIncome -= taxableIncome;
        dispatch(func(value.rate));
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
    setStateTaxAction,
  );

  const federalTaxBrackets = federalTaxRates[filingStatus];
  remainingIncome = totalIncome - deductionsNum;
  const federalTaxLiability = calculateTaxLiabilityForBracket(
    federalTaxBrackets,
    remainingIncome,
    setFederalTaxAction,
  );

  const ficaTaxLiability = totalIncome * (7.65 / 100);

  const totalTaxLiability =
    virginiaTaxLiability + federalTaxLiability + ficaTaxLiability;

  return totalTaxLiability.toFixed(2);
};
