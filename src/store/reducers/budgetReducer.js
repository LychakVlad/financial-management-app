import { ADD_NEEDS } from '../actions/budgetActions';

const initialState = {
  needs: [],
  wants: [],
  savings: [],
  totalPlan: 0,
};

export const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEEDS:
      let newNeeds = Array.isArray(action.payload)
        ? [...state.needs, ...action.payload]
        : [...state.needs, action.payload];
      return {
        ...state,
        needs: newNeeds,
        totalPlan: newNeeds.reduce(
          (total, plan) => total + parseFloat(plan),
          0
        ),
      };
    default:
      return state;
  }
};
