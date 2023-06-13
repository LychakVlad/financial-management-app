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
import styles from './TaxForm.module.css';
import CustomButton from '../form/Button/CustomButton';
import Dropdown from '../form/Dropdown/Dropdown';
import CustomInput from '../form/Input/CustomInput';
import Radio from '../form/Radio/Radio';

function TaxForm() {
  const [useStandardDeduction, setUseStandardDeduction] = useState(true);
  const totalIncome = useSelector((state) => state.incomes.totalIncome);
  const { filingStatus, deductions } = useSelector((state) => state.taxes);
  const [dropdownError, setDropdownError] = useState(false);
  const [dropdownPlaceholder, setDropdownPlaceholder] =
    useState('Filing status');
  const dispatch = useDispatch();

  console.log(filingStatus);

  const options = [
    { value: 'married', label: 'Married' },
    { value: 'single', label: 'Single' },
  ];
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

    console.log(filingStatus);

    if (!filingStatus) {
      setDropdownError(true);
      return;
    }

    const taxLiability = calculateTaxLiability();
    dispatch(setTotalTaxLiabilityAction(taxLiability));
    setDropdownPlaceholder('Filing status');
    dispatch(setFilingStatusAction());
  }

  const handleDropdownChange = (option) => {
    dispatch(setFilingStatusAction(option.value));
    setDropdownError(false);
  };

  const handleDeductionsInputChange = (event) => {
    dispatch(setDeductionsAction(event));
    setDropdownError(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Dropdown
        placeHolder={dropdownPlaceholder}
        setPlaceHolder={setDropdownPlaceholder}
        options={options}
        onChange={handleDropdownChange}
        error={dropdownError}
      />
      <div className={styles.radios}>
        <label htmlFor="useStandardDeduction">Use standard deduction:</label>
        <Radio
          id="useStandardDeductionYes"
          name="StandardDeduction"
          value="Yes"
          selectedOption={useStandardDeduction}
          onChange={() => setUseStandardDeduction(true)}
        />

        <Radio
          id="useStandardDeductionNo"
          name="StandardDeduction"
          value="No"
          selectedOption={!useStandardDeduction}
          onChange={() => setUseStandardDeduction(false)}
        />
      </div>

      {useStandardDeduction ? (
        <p>Standard deduction: $12,500</p>
      ) : (
        <div className={styles.deductionsBlock}>
          <CustomInput
            label="Deductions"
            type="number"
            id="deductions"
            step="0.01"
            value={deductions}
            onChange={handleDeductionsInputChange}
          />
        </div>
      )}

      <CustomButton type="submit" title="Calculate" />
    </form>
  );
}

export default TaxForm;
