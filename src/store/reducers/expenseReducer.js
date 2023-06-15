import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  UPDATE_EXPENSE,
} from '../actions/expenseActions';

const defaultState = {
  expenses: [],
  totalExpenses: 0,
};

export const expenseReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      return {
        ...state,
        expenses: updatedExpenses,
        totalExpenses: updatedExpenses.reduce(
          (total, expense) => total + Number(expense.amount),
          0
        ),
      };
    case REMOVE_EXPENSE:
      return {
        ...state,
        expenses: action.payload,
        totalExpenses: action.payload.reduce(
          (total, expense) => total + Number(expense.amount),
          0
        ),
      };

    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: action.payload,
        totalExpenses: action.payload.reduce(
          (total, expense) => total + Number(expense.amount),
          0
        ),
      };
    default:
      return state;
  }
};
