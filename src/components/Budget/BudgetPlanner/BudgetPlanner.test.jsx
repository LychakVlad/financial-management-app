import { render } from '@testing-library/react';
import BudgetPlanner from './BudgetPlanner';
import { Provider } from 'react-redux';
import store from '../../../store/store';

describe('Test Budget Planner', () => {
  test('Render successfully', () => {
    render(
      <Provider store={store}>
        <BudgetPlanner />
      </Provider>
    );
  });
});
