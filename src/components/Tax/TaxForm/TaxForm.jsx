import React, { useState } from 'react';
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
  const { currentUser } = useAuth();
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

  const incomeBeforeTax = incomes.reduce((accumulator, item) => {
    if (item.tax === 'Taxable') {
      return accumulator + parseFloat(item.amount);
    } else {
      return accumulator;
    }
  }, 0);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!filingStatus) {
      setDropdownError(true);
      return;
    }
    const taxLiability = calculateTaxLiability(
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
          id="useStandardDeductionNo"
          name="StandardDeduction"
          value="No"
          selectedOption={!useStandardDeduction}
          onChange={() => setUseStandardDeduction(false)}
        />
        <Radio
          id="useStandardDeductionYes"
          name="StandardDeduction"
          value="Yes"
          selectedOption={useStandardDeduction}
          onChange={() => setUseStandardDeduction(true)}
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
          />
        </div>
      )}

      <CustomButton type="submit" title="Calculate" disabled={loading} />
    </form>
  );
}

export default TaxForm;
