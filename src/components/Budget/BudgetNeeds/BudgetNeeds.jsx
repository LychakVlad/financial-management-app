import React, { useEffect } from 'react';
import CustomInput from '../../form/Input/CustomInput';
import styles from './BudgetNeeds.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNeedsAction } from '../../../store/actions/budgetActions';
import CustomButton from '../../form/Button/CustomButton';

const BudgetNeeds = () => {
  const needs = useSelector((state) => state.budget.needs);
  const total = useSelector((state) => state.budget.totalPlan);
  const dispatch = useDispatch();

  const handleInputChange = (event, category) => {
    const value = event !== '' ? parseFloat(event) : null;
    dispatch(addNeedsAction({ category, value }));
  };

  return (
    <div>
      <div className={styles.grid}>
        {needs.map((category) => (
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
        <CustomButton type="submit" title="Save Needs" />
        <div>
          <p>
            Your total for needs:
            <span className={styles.totalDigit}> {total} $</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetNeeds;
