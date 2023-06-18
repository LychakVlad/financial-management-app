import React, { useEffect } from 'react';
import CustomInput from '../../form/Input/CustomInput';
import styles from './BudgetNeeds.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNeedsAction } from '../../../store/actions/budgetActions';

const BudgetNeeds = () => {
  const needs = useSelector((state) => state.budget.needs);
  const total = useSelector((state) => state.budget.totalPlan);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(needs);
    console.log(total);
  }, [needs]);

  console.log(needs);
  return (
    <div className={styles.grid}>
      <CustomInput
        label="Rent/Mortgage"
        type="number"
        id="rentExpense"
        step="0.01"
        required
        onChange={(event) => dispatch(addNeedsAction(event))}
      />

      <CustomInput
        label="Gasoline"
        type="number"
        id="gasolineExpense"
        step="0.01"
        required
        onChange={(event) => dispatch(addNeedsAction(event))}
      />
      <CustomInput
        label="Car Payment"
        type="number"
        id="carPaymentExpense"
        step="0.01"
        required
      />

      <CustomInput
        label="Electricity and Gas"
        type="number"
        id="electricityExpense"
        step="0.01"
        required
      />
      <CustomInput
        label="Water Bill"
        type="number"
        id="waterExpense"
        step="0.01"
        required
      />

      <CustomInput
        label="Health Insurance"
        type="number"
        id="healthInsuranceExpense"
        step="0.01"
        required
      />

      <CustomInput
        label="Groceries"
        type="number"
        id="groceriesExpense"
        step="0.01"
        required
      />

      <CustomInput
        label="Student Loan"
        type="number"
        id="studentLoanExpense"
        step="0.01"
        required
      />

      <CustomInput
        label="Phone and Internet"
        type="number"
        id="phineAndInternetExpense"
        step="0.01"
        required
      />
    </div>
  );
};

export default BudgetNeeds;
