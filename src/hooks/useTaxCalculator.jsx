import { useSelector } from 'react-redux';
import { federalTaxRates, virginiaTaxRates } from '../data/taxRates';

const UseTaxCalculator = () => {
  const totalIncome = useSelector((state) => state.incomes.totalIncome);
  const { filingStatus, deductions } = useSelector((state) => state.taxes);

  const calculateTaxLiability = () => {
    const deductionsNum = deductions ? parseFloat(deductions) : 0;

    const calculateTaxLiabilityForBracket = (bracket, remainingIncome) => {
      let taxLiability = 0;
      for (const [key, value] of Object.entries(bracket)) {
        if (remainingIncome > 0) {
          const taxableIncome = Math.min(remainingIncome, value.limit);
          taxLiability += taxableIncome * (value.rate / 100);
          remainingIncome -= taxableIncome;
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
      remainingIncome
    );

    const federalTaxBrackets = federalTaxRates[filingStatus];
    remainingIncome = totalIncome - deductionsNum;
    const federalTaxLiability = calculateTaxLiabilityForBracket(
      federalTaxBrackets,
      remainingIncome
    );

    const ficaTaxLiability = totalIncome * (7.65 / 100);

    const totalTaxLiability =
      virginiaTaxLiability + federalTaxLiability + ficaTaxLiability;

    return totalTaxLiability.toFixed(2);
  };

  return calculateTaxLiability();
};

export default UseTaxCalculator;
