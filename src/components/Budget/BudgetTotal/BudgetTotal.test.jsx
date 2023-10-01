import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import BudgetTotal from './BudgetTotal';

describe('Test Budget Planner', () => {
  test('Render successfully', () => {
    render(
      <Provider store={store}>
        <BudgetTotal />
      </Provider>
    );
  });
});
