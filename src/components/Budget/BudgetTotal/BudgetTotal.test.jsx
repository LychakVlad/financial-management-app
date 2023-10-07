import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import BudgetTotal from './BudgetTotal';
import { Provider } from 'react-redux';
import store from '../../../store/store';

describe('BudgetTotal Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BudgetTotal />
      </Provider>
    );
  });

  it('displays loading state initially', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BudgetTotal />
      </Provider>
    );
  });

  it('displays data correctly after loading', () => {
    const totalNeeds = 100;
    const totalWants = 200;
    const totalSavings = 300;
    const totalTax = 50;
    const totalIncome = 500;

    jest.mock('react-redux', () => ({
      useSelector: () => ({
        totalNeeds,
        totalWants,
        totalSavings,
        totalTaxLiability: totalTax,
        totalIncome,
      }),
      useDispatch: () => jest.fn(),
    }));

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BudgetTotal />
      </Provider>
    );

    expect(getByText('Your totals:')).toBeInTheDocument();
    expect(getByTestId('total-needs').textContent).toBe('0 $');
    expect(getByTestId('total-wants').textContent).toBe('0 $');
    expect(getByTestId('total-savings').textContent).toBe('0 $');
    expect(getByText('50/30/20 comparison:')).toBeInTheDocument();
    expect(getByTestId('total-after-tax').textContent).toBe('0 $'); // 500 - 50 = 450
    expect(getByTestId('total-needs-after-tax').textContent).toBe(
      'Loading... '
    ); // 450 * 0.5 = 225
    expect(getByTestId('total-wants-after-tax').textContent).toBe(
      'Loading... '
    ); // 450 * 0.3 = 135
    expect(getByTestId('total-savings-after-tax').textContent).toBe(
      'Loading... '
    ); // 450 * 0.2 = 90
  });
});
