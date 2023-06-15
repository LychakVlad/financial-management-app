import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { incomeReducer } from './reducers/IncomeReducer';
import { taxReducer } from './reducers/taxReducer';
import { errorReducer } from './reducers/errorReducer';
import { expenseReducer } from './reducers/expenseReducer';

const rootReducer = combineReducers({
  incomes: incomeReducer,
  taxes: taxReducer,
  errors: errorReducer,
  expenses: expenseReducer,
});

export default configureStore({
  reducer: rootReducer,
  devTools: true,
});
