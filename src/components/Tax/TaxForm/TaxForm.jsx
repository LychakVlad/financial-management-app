import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTotalTaxLiabilityAction,
  setFilingStatusAction,
  setDeductionsAction,
} from '../../../store/actions/taxActions';
import { federalTaxRates, virginiaTaxRates } from '../../../data/taxRates';
import styles from './TaxForm.module.css';
import CustomButton from '../../form/Button/CustomButton';
import Dropdown from '../../form/Dropdown/Dropdown';
import CustomInput from '../../form/Input/CustomInput';
import Radio from '../../form/Radio/Radio';
import { calculateTaxLiability } from './taxCalculation';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';

function TaxForm() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth() || {};
  const [useStandardDeduction, setUseStandardDeduction] = useState(false);
  const incomes = useSelector((state) => state.incomes.incomes);
  const { filingStatus, deductions } = useSelector((state) => state.taxes);
  const [dropdownError, setDropdownError] = useState(false);
  const [dropdownPlaceholder, setDropdownPlaceholder] =
    useState('Filing status');
  const dispatch = useDispatch();

  const options = [
    { value: 'married', label: 'Married' },
    { value: 'single', label: 'Single' },
  ];

  useEffect(() => {
    useStandardDeduction
      ? dispatch(setDeductionsAction(12500))
      : dispatch(setDeductionsAction(deductions));
  }, [useStandardDeduction, deductions, dispatch]);

  const incomeBeforeTax = incomes.reduce((accumulator, item) => {
    if (item.tax === 'Taxable') {
      return accumulator + parseFloat(item.amount);
    } else {
      return accumulator;
    }
  }, 0);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!filingStatus) {
      setDropdownError(true);
      return;
    }

    setLoading(true);
    let taxLiability = calculateTaxLiability(
      deductions,
      filingStatus,
      incomeBeforeTax,
      virginiaTaxRates,
      federalTaxRates,
      dispatch
    );

    await updateDoc(doc(firestore, 'users', currentUser?.uid), {
      totalTax: parseFloat(taxLiability),
    });

    dispatch(setTotalTaxLiabilityAction(taxLiability));
    setDropdownPlaceholder('Filing status');

    setDropdownError(false);
    dispatch(setFilingStatusAction());

    setLoading(false);
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
    <div className={styles.form}>
      <form>
        <Dropdown
          placeHolder={dropdownPlaceholder}
          setPlaceHolder={setDropdownPlaceholder}
          options={options}
          onChange={handleDropdownChange}
          error={dropdownError}
          test="dropdown-status-test"
        />
        <div className={styles.radios}>
          <label htmlFor="useStandardDeduction">Use standard deduction:</label>

          <Radio
            id="useStandardDeductionNo"
            name="StandardDeduction"
            value="No"
            selectedOption={!useStandardDeduction}
            onChange={() => setUseStandardDeduction(false)}
            test="radio-no-test"
          />
          <Radio
            id="useStandardDeductionYes"
            name="StandardDeduction"
            value="Yes"
            selectedOption={useStandardDeduction}
            onChange={() => setUseStandardDeduction(true)}
            test="radio-yes-test"
          />
        </div>

        {useStandardDeduction ? (
          <p className={styles.deductions}>Standard deduction: $12,500</p>
        ) : (
          <div className={styles.deductionsBlock}>
            <CustomInput
              label="Set your deductions"
              type="number"
              id="deductions"
              step="0.01"
              value={deductions}
              onChange={handleDeductionsInputChange}
              test="input-deductions-test"
            />
          </div>
        )}

        <CustomButton
          type="submit"
          title="Calculate"
          disabled={loading}
          onClick={handleSubmit}
          test="btn-tax-calc-test"
        />
      </form>
      <div className={styles.description}>
        Here you can calculate the approximate amount of money that you need to
        pay <br></br> It takes the income that you marked Taxable and calculates
        % that you need to pay based on your filing status, amount of
        deductions, amount of income, federal tax rates and
        <span className={styles.thickText}> 2022 VA State tax rates</span>
      </div>
    </div>
  );
}

export default TaxForm;
