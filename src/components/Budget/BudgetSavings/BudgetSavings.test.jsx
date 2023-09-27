import { fireEvent, render, screen } from "@testing-library/react";
import BudgetSavings from "./BudgetSavings";
import { Provider } from "react-redux";
import store from "../../../store/store";

describe("Test Budget Savings", () => {
  test("Render successfully", () => {
    render(
      <Provider store={store}>
        <BudgetSavings />
      </Provider>,
    );

    const totalText = screen.getByText(
      "Total spent on savings and paying off debt:",
    );

    expect(totalText).toBeInTheDocument();
  });

  test("Input and total change", () => {
    render(
      <Provider store={store}>
        <BudgetSavings />
      </Provider>,
    );

    const inputGas = screen.getByTestId(
      "budget-savings-input-Emergency Savings",
    );
    const inputRent = screen.getByTestId("budget-savings-input-House Savings");
    const totalSavings = screen.getByTestId("total-amount-savings");

    fireEvent.change(inputGas, { target: { value: "1000" } });

    expect(totalSavings).toBeInTheDocument();
    expect(totalSavings).toHaveTextContent("1,000 $");

    fireEvent.change(inputRent, { target: { value: "1000" } });

    expect(totalSavings).toHaveTextContent("2,000 $");
  });

  test("Button click check", () => {
    render(
      <Provider store={store}>
        <BudgetSavings />
      </Provider>,
    );

    const buttonText = screen.getByTestId("btn-savings");

    expect(buttonText).toBeInTheDocument();

    fireEvent.click(buttonText);

    expect(buttonText).toBeInTheDocument();
  });
});
