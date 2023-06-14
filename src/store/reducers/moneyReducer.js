import {
  ADD_MONEY,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
} from '../actions/moneyActions';

const defaultState = {
  totalMoney: 0,
  expenses: [],
};

export const moneyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_MONEY:
      return {
        ...state,
        incomes: [...state.incomes, action.payload],
        totalIncome: state.incomes.reduce(
          (total, income) => total + Number(income.amount),
          Number(action.payload.amount)
        ),
      };
    case ADD_EXPENSE:
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
    case REMOVE_EXPENSE:
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
