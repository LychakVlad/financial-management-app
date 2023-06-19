import React from 'react';
import CustomInput from '../../form/Input/CustomInput';
import styles from './BudgetSavings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addSavingsAction } from '../../../store/actions/budgetActions';
import CustomButton from '../../form/Button/CustomButton';

const BudgetSavings = () => {
  const savings = useSelector((state) => state.budget.savings);
  const total = useSelector((state) => state.budget.totalSavings);
  const dispatch = useDispatch();

  const handleInputChange = (event, category) => {
    const value = event !== '' ? parseFloat(event) : null;
    dispatch(addSavingsAction({ category, value }));
    console.log(category);
    console.log(total);
  };

  return (
    <div>
      <div className={styles.grid}>
        {savings.map((category) => (
          <CustomInput
            key={category.key}
            label={category.category}
            type="number"
            id={category.key}
            step="0.01"
            required
            value={category.value !== null ? category.value : ''}
            onChange={(event) => handleInputChange(event, category.category)}
          />
        ))}
      </div>
      <div className={styles.total}>
        <CustomButton type="submit" title="Save Savings" />
        <div>
          <p>
            Your total for savings:
            <span className={styles.totalDigit}> {total} $</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetSavings;
