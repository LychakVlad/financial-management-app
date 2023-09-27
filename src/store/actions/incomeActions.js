export const ADD_INCOME = "ADD_INCOME";
export const REMOVE_INCOME = "REMOVE_INCOME";
export const UPDATE_INCOME = "UPDATE_INCOME";
export const UPDATE_CARD = "UPDATE_CARD";
export const UPDATE_CASH = "UPDATE_CASH";
export const UPDATE_SAVINGS = "UPDATE_SAVINGS";

export const addIncomeAction = (payload) => ({ type: ADD_INCOME, payload });
export const updateIncomeAction = (payload) => ({
  type: UPDATE_INCOME,
  payload,
});
export const removeIncomeAction = (payload) => ({
  type: REMOVE_INCOME,
  payload,
});
export const updateCardAction = (payload) => ({
  type: UPDATE_CARD,
  payload,
});
export const updateCashAction = (payload) => ({
  type: UPDATE_CASH,
  payload,
});
export const updateSavingsAction = (payload) => ({
  type: UPDATE_SAVINGS,
  payload,
});
