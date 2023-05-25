import { ADD_INCOME, REMOVE_INCOME } from '../actions/incomeActions';

const defaultState = {
  incomes: [],
};

export const incomeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_INCOME:
      return { ...state, incomes: [...state.incomes, action.payload] };
    case REMOVE_INCOME:
      return {
        ...state,
        incomes: state.incomes.filter((income) => income.id !== action.payload),
      };

    default:
      return state;
  }
};
