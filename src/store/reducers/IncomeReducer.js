import {
  ADD_INCOME,
  REMOVE_INCOME,
  UPDATE_INCOME,
} from '../actions/incomeActions';

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
    case UPDATE_INCOME:
      return {
        ...state,
        incomes: action.payload,
      };

    default:
      return state;
  }
};
