import {
  ADD_INCOME,
  REMOVE_INCOME,
  UPDATE_INCOME,
} from '../actions/incomeActions';

const defaultState = {
  incomes: [],
  totalIncome: 0,
};

export const incomeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_INCOME:
      return {
        ...state,
        incomes: [...state.incomes, action.payload],
        totalIncome: state.incomes.reduce(
          (total, income) => total + Number(income.amount),
          Number(action.payload.amount)
        ),
      };
    case REMOVE_INCOME:
      const updatedIncomes = state.incomes.filter(
        (income) => income.id !== action.payload
      );
      return {
        ...state,
        incomes: updatedIncomes,
        totalIncome: updatedIncomes.reduce(
          (total, income) => total + Number(income.amount),
          0
        ),
      };
    case UPDATE_INCOME:
      return {
        ...state,
        incomes: action.payload,
        totalIncome: action.payload.reduce(
          (total, income) => total + Number(income.amount),
          0
        ),
      };
    default:
      return state;
  }
};
