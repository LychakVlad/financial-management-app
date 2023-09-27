import React from "react";
import CustomInput from "../../form/Input/CustomInput";
import styles from "./BudgetNeeds.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addNeedsAction } from "../../../store/actions/budgetActions";
import CustomButton from "../../form/Button/CustomButton";
import { setTabAction } from "../../../store/actions/tabsActions";
import { formatNumber } from "../../../utils/formatNumber";

const BudgetNeeds = React.memo(() => {
  const needs = useSelector((state) => state.budget.needs);
  const total = useSelector((state) => state.budget.totalNeeds);
  const dispatch = useDispatch();

  const handleInputChange = (event, category) => {
    const value = event !== "" ? parseFloat(event) : null;
    dispatch(addNeedsAction({ category, value }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(setTabAction("wants"));
  }

  return (
    <form>
      <div className={styles.grid}>
        {needs.map((category) => (
          <CustomInput
            key={category.key}
            label={category.category}
            type="number"
            id={category.key}
            step="0.01"
            test={`budget-needs-input-${category.category}`}
            testError="budget-needs-input-error"
            required
            value={category.value !== null ? category.value : ""}
            onChange={(event) => handleInputChange(event, category.category)}
          />
        ))}
      </div>
      <div className={styles.total}>
        <CustomButton
          test="btn-needs"
          type="submit"
          title="Save Needs"
          onClick={handleSubmit}
        />
        <div>
          <p>
            Total spent on necessities:
            <span
              className={styles.totalDigit}
              data-testid="total-amount-needs"
            >
              {formatNumber(total)} ${" "}
            </span>
          </p>
        </div>
      </div>
    </form>
  );
});

export default BudgetNeeds;
