export const ADD_INCOME = 'ADD_INCOME';
export const REMOVE_INCOME = 'REMOVE_INCOME';
export const UPDATE_INCOME = 'UPDATE_INCOME';

export const addIncomeAction = (payload) => ({ type: ADD_INCOME, payload });
export const updateIncomeAction = (payload) => ({
  type: UPDATE_INCOME,
  payload,
});
export const removeIncomeAction = (payload) => ({
  type: REMOVE_INCOME,
  payload,
});
