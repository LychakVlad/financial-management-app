import { fireEvent, render, screen } from "@testing-library/react";
import BudgetNeeds from "./BudgetNeeds";
import { Provider } from "react-redux";
import store from "../../../store/store";

describe("Test Budget Needs", () => {
  test("Render successfully", () => {
    render(
      <Provider store={store}>
        <BudgetNeeds />
      </Provider>,
    );

    const totalText = screen.getByText("Total spent on necessities:");

    expect(totalText).toBeInTheDocument();
  });

  test("Input and total change", () => {
    render(
      <Provider store={store}>
        <BudgetNeeds />
      </Provider>,
    );

    const inputGas = screen.getByTestId("budget-needs-input-Gasoline");
    const inputRent = screen.getByTestId("budget-needs-input-Rent/Mortgage");
    const totalNeeds = screen.getByTestId("total-amount-needs");

    fireEvent.change(inputGas, { target: { value: "1000" } });

    expect(totalNeeds).toBeInTheDocument();
    expect(totalNeeds).toHaveTextContent("1,000 $");

    fireEvent.change(inputRent, { target: { value: "1000" } });

    expect(totalNeeds).toHaveTextContent("2,000 $");
  });

  test("Button click check", () => {
    render(
      <Provider store={store}>
        <BudgetNeeds />
      </Provider>,
    );

    const buttonText = screen.getByTestId("btn-needs");

    expect(buttonText).toBeInTheDocument();

    fireEvent.click(buttonText);

    expect(buttonText).toBeInTheDocument();
  });
});
