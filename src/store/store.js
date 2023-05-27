import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { incomeReducer } from './reducers/IncomeReducer';
import { taxReducer } from './reducers/taxReducer';

const rootReducer = combineReducers({
  incomes: incomeReducer,
  taxes: taxReducer,
});

export default configureStore({
  reducer: rootReducer,
  devTools: true,
});
