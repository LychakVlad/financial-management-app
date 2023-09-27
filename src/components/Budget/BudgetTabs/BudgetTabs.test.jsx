import { fireEvent, render, screen } from "@testing-library/react";
import BudgetTabs from "./BudgetTabs";
import { Provider } from "react-redux";

import store from "../../../store/store";

describe("Test BudgetTabs", () => {
  test("it should render tabs correctly", () => {
    render(
      <Provider store={store}>
        <BudgetTabs />
      </Provider>,
    );

    const needsTab = screen.getByText("Needs");
    const wantsTab = screen.getByText("Wants");
    const savingsTab = screen.getByText("Savings and debt repayment");
    const totalTab = screen.getByText("Total");

    expect(needsTab).toHaveClass("active");

    fireEvent.click(wantsTab);

    expect(wantsTab).toHaveClass("active");

    fireEvent.click(savingsTab);

    expect(savingsTab).toHaveClass("active");

    fireEvent.click(totalTab);

    expect(totalTab).toHaveClass("active");
  });
});
