import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { incomeReducer } from './reducers/IncomeReducer';
import { taxReducer } from './reducers/taxReducer';
import { errorReducer } from './reducers/errorReducer';
import { moneyReducer } from './reducers/moneyReducer';

const rootReducer = combineReducers({
  incomes: incomeReducer,
  taxes: taxReducer,
  errors: errorReducer,
  money: moneyReducer,
});

export default configureStore({
  reducer: rootReducer,
  devTools: true,
});
