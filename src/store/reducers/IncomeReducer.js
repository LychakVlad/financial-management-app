import {
  ADD_INCOME,
  REMOVE_INCOME,
  UPDATE_INCOME,
} from '../actions/incomeActions';

const defaultState = {
  incomes: [],
  totalIncome: 0,
  totalAmount: 0,
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
          0
        ),
        totalAmount: newTotalAmount,
      };

    case REMOVE_INCOME:
      const updatedIncomes = state.incomes.filter(
        (income) => income.id !== action.payload
      );
      const newTotalAmountAfterRemove = updatedIncomes.reduce(
        (total, income) => total + Number(income.amount),
        0
      );

      return {
        ...state,
        incomes: updatedIncomes,
        totalIncome: updatedIncomes.reduce(
          (total, income) => total + Number(income.amount),
          0
        ),
        totalAmount: newTotalAmountAfterRemove,
      };

    case UPDATE_INCOME:
      return {
        ...state,
        incomes: action.payload,
        totalIncome: action.payload.reduce(
          (total, income) => total + Number(income.amount),
          0
        ),
        totalAmount: action.payload.reduce(
          (total, income) => total + Number(income.amount),
          0
        ),
      };

    default:
      return state;
  }
};
