export const ADD_MONEY = 'ADD_MONEY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const addMoneyAction = (payload) => ({ type: ADD_MONEY, payload });
export const addExpenseAction = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});
export const removeExpenseAction = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});
