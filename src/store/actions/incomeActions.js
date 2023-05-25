export const ADD_INCOME = 'ADD_INCOME';
export const REMOVE_INCOME = 'REMOVE_INCOME';

export const addIncomeAction = (payload) => ({ type: ADD_INCOME, payload });
export const removeIncomeAction = (payload) => ({
  type: REMOVE_INCOME,
  payload,
});
