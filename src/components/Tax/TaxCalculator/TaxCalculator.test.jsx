import { render } from '@testing-library/react';
import TaxCalculator from './TaxCalculator';
import { Provider } from 'react-redux';
import store from '../../../store/store';

describe('Test Tax Calculator', () => {
  test('Render successfully', () => {
    render(
      <Provider store={store}>
        <TaxCalculator />
      </Provider>
    );
  });
});
