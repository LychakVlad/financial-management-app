import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  UPDATE_EXPENSE,
} from "../actions/expenseActions";

const initialState = {
  expenses: [],
  totalExpense: 0,
};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
        totalExpense: state.totalExpense + parseFloat(action.payload.amount),
      };
    case REMOVE_EXPENSE:
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload,
      );
      const updatedTotalExpense = updatedExpenses.reduce(
        (total, expense) => total + parseFloat(expense.amount),
        0,
      );
      return {
        ...state,
        expenses: updatedExpenses,
        totalExpense: updatedTotalExpense,
      };
    case UPDATE_EXPENSE:
      if (!Array.isArray(action.payload)) {
        return state;
      }

      return {
        ...state,
        expenses: action.payload,
        totalExpense: action.payload.reduce(
          (total, expense) => total + parseFloat(expense.amount),
          0,
        ),
      };
    default:
      return state;
  }
};
