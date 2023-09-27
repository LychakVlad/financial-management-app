import { fireEvent, render, screen } from "@testing-library/react";
import BudgetWants from "./BudgetWants";
import { Provider } from "react-redux";
import store from "../../../store/store";

describe("Test Budget Wants", () => {
  test("Render successfully", () => {
    render(
      <Provider store={store}>
        <BudgetWants />
      </Provider>,
    );

    const totalText = screen.getByText("Total spent on wants:");

    expect(totalText).toBeInTheDocument();
  });

  test("Input and total change", () => {
    render(
      <Provider store={store}>
        <BudgetWants />
      </Provider>,
    );

    const inputGas = screen.getByTestId("budget-wants-input-Travel");
    const inputRent = screen.getByTestId("budget-wants-input-Shopping");
    const totalWants = screen.getByTestId("total-amount-wants");

    fireEvent.change(inputGas, { target: { value: "1000" } });

    expect(totalWants).toBeInTheDocument();
    expect(totalWants).toHaveTextContent("1,000 $");

    fireEvent.change(inputRent, { target: { value: "1000" } });

    expect(totalWants).toHaveTextContent("2,000 $");
  });

  test("Button click check", () => {
    render(
      <Provider store={store}>
        <BudgetWants />
      </Provider>,
    );

    const buttonText = screen.getByTestId("btn-wants");

    expect(buttonText).toBeInTheDocument();

    fireEvent.click(buttonText);

    expect(buttonText).toBeInTheDocument();
  });
});
