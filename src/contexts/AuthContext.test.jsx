import React from 'react';
import { render } from '@testing-library/react';
import Login from '../components/Main/Login/Login';
import { Provider } from 'react-redux';
import store from '../store/store';
import BudgetPlanner from '../components/Budget/BudgetPlanner/BudgetPlanner';
import BudgetTotal from '../components/Budget/BudgetTotal/BudgetTotal';
import BudgetWants from '../components/Budget/BudgetWants/BudgetWants';

const firebase = require('@firebase/testing');

describe('AuthProvider', () => {
  it('can shit', () => {
    render(
      <Provider store={store}>
        <BudgetWants />
      </Provider>
    );
  });
});
