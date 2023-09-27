import {
  ADD_INCOME,
  REMOVE_INCOME,
  UPDATE_CARD,
  UPDATE_CASH,
  UPDATE_INCOME,
  UPDATE_SAVINGS,
} from "../actions/incomeActions";

const defaultState = {
  incomes: [],
  totalIncome: 0,
  totalAmount: 0,
  totalCash: 0,
  totalCard: 0,
  totalSavings: 0,
};

export const incomeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_INCOME:
      const newIncomes = [...state.incomes, action.payload];
      const newTotalAmount = state.totalAmount + Number(action.payload.amount);

      return {
        ...state,
        incomes: newIncomes,
        totalIncome: newIncomes.reduce(
          (total, income) => total + Number(income.amount),
          0,
        ),
        totalAmount: newTotalAmount,
      };

    case REMOVE_INCOME:
      const updatedIncomes = state.incomes.filter(
        (income) => income.id !== action.payload,
      );
      const newTotalAmountAfterRemove = updatedIncomes.reduce(
        (total, income) => total + Number(income.amount),
        0,
      );

      return {
        ...state,
        incomes: updatedIncomes,
        totalIncome: updatedIncomes.reduce(
          (total, income) => total + Number(income.amount),
          0,
        ),
        totalAmount: newTotalAmountAfterRemove,
      };

    case UPDATE_INCOME:
      if (!Array.isArray(action.payload)) {
        return state;
      }

      return {
        ...state,
        incomes: action.payload,
        totalIncome: action.payload.reduce(
          (total, income) => total + Number(income.amount),
          0,
        ),
        totalAmount: action.payload.reduce(
          (total, income) => total + Number(income.amount),
          0,
        ),
      };
    case UPDATE_CARD:
      return {
        ...state,
        totalCard: action.payload,
      };
    case UPDATE_CASH:
      return {
        ...state,
        totalCash: action.payload,
      };
    case UPDATE_SAVINGS:
      return {
        ...state,
        totalSavings: action.payload,
      };

    default:
      return state;
  }
};
