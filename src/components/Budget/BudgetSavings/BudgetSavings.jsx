import React from "react";
import CustomInput from "../../form/Input/CustomInput";
import styles from "./BudgetSavings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addSavingsAction } from "../../../store/actions/budgetActions";
import CustomButton from "../../form/Button/CustomButton";
import { setTabAction } from "../../../store/actions/tabsActions";
import { formatNumber } from "../../../utils/formatNumber";

const BudgetSavings = () => {
  const savings = useSelector((state) => state.budget.savings);
  const total = useSelector((state) => state.budget.totalSavings);
  const dispatch = useDispatch();

  const handleInputChange = (event, category) => {
    const value = event !== "" ? parseFloat(event) : null;
    dispatch(addSavingsAction({ category, value }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(setTabAction("total"));
  }

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
            test={`budget-savings-input-${category.category}`}
            testError="budget-savings-input-error"
            value={category.value !== null ? category.value : ""}
            onChange={(event) => handleInputChange(event, category.category)}
          />
        ))}
      </div>
      <div className={styles.total}>
        <CustomButton
          test="btn-savings"
          type="submit"
          title="Save Savings"
          onClick={handleSubmit}
        />
        <div>
          <p>
            Total spent on savings and paying off debt:
            <span
              data-testid="total-amount-savings"
              className={styles.totalDigit}
            >
              {" "}
              {formatNumber(total)} $
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetSavings;
