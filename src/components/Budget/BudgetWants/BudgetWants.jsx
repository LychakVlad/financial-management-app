import React from 'react';
import CustomInput from '../../form/Input/CustomInput';
import styles from './BudgetWants.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addWantsAction } from '../../../store/actions/budgetActions';
import CustomButton from '../../form/Button/CustomButton';

const BudgetWants = () => {
  const wants = useSelector((state) => state.budget.wants);
  const total = useSelector((state) => state.budget.totalWants);
  const dispatch = useDispatch();

  const handleInputChange = (event, category) => {
    const value = event !== '' ? parseFloat(event) : null;
    dispatch(addWantsAction({ category, value }));
  };

  return (
    <div>
      <div className={styles.grid}>
        {wants.map((category) => (
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
        <CustomButton type="submit" title="Save Wants" />
        <div>
          <p>
            Total spent on wants:
            <span className={styles.totalDigit}> {total} $</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetWants;
