import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cashReducer } from './reducers/cashReducer';
import { incomeReducer } from './reducers/IncomeReducer';

const rootReducer = combineReducers({
  incomes: incomeReducer,
});

export default configureStore({
  reducer: rootReducer,
  devTools: true,
});
