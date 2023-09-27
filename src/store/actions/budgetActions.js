export const ADD_NEEDS = "ADD_NEEDS";
export const ADD_WANTS = "ADD_WANTS";
export const ADD_SAVINGS = "ADD_SAVINGS";

export const addWantsAction = (payload) => ({
  type: ADD_WANTS,
  payload,
});

export const addNeedsAction = (payload) => ({
  type: ADD_NEEDS,
  payload,
});

export const addSavingsAction = (payload) => ({
  type: ADD_SAVINGS,
  payload,
});
