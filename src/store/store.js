import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { incomeReducer } from './reducers/IncomeReducer';
import { taxReducer } from './reducers/taxReducer';
import { expenseReducer } from './reducers/expenseReducer';
import { tabsReducer } from './reducers/tabsReducer';

const rootReducer = combineReducers({
  incomes: incomeReducer,
  taxes: taxReducer,
  expenses: expenseReducer,
  tabs: tabsReducer,
});

export default configureStore({
  reducer: rootReducer,
  devTools: true,
});
