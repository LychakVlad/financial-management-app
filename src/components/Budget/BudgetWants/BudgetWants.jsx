import React from "react";
import CustomInput from "../../form/Input/CustomInput";
import styles from "./BudgetWants.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addWantsAction } from "../../../store/actions/budgetActions";
import CustomButton from "../../form/Button/CustomButton";
import { setTabAction } from "../../../store/actions/tabsActions";
import { formatNumber } from "../../../utils/formatNumber";

const BudgetWants = () => {
  const wants = useSelector((state) => state.budget.wants);
  const total = useSelector((state) => state.budget.totalWants);
  const dispatch = useDispatch();

  const handleInputChange = (event, category) => {
    const value = event !== "" ? parseFloat(event) : null;
    dispatch(addWantsAction({ category, value }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(setTabAction("savings"));
  }

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
            test={`budget-wants-input-${category.category}`}
            testError="budget-wants-input-error"
            value={category.value !== null ? category.value : ""}
            onChange={(event) => handleInputChange(event, category.category)}
          />
        ))}
      </div>
      <div className={styles.total}>
        <CustomButton
          test="btn-wants"
          type="submit"
          title="Save Wants"
          onClick={handleSubmit}
        />
        <div>
          <p>
            Total spent on wants:
            <span
              data-testid="total-amount-wants"
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

export default BudgetWants;
