import { render, screen } from '@testing-library/react';
import TaxSummary from './TaxSummary';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const initialState = {
  incomes: {
    incomes: [
      { tax: 'Taxable', amount: 1000 },
      { tax: 'NonTaxable', amount: 500 },
    ],
  },
  taxes: {
    stateTax: 5,
    federalTax: 10,
    totalTaxLiability: 150,
  },
};

let store;

beforeEach(() => {
  store = mockStore(initialState);
});

describe('Test Tax Summary ', () => {
  it('renders federal tax correctly', () => {
    render(
      <Provider store={store}>
        <TaxSummary />
      </Provider>
    );

    const federalTaxElement = screen.getByTestId('federal-tax-test');
    expect(federalTaxElement).toHaveTextContent('10%');
  });

  it('renders income before taxes correctly', () => {
    render(
      <Provider store={store}>
        <TaxSummary />
      </Provider>
    );

    const incomeBeforeTaxElement = screen.getByTestId('total-tax-test');
    expect(incomeBeforeTaxElement).toHaveTextContent('1,000 $');
  });

  it('renders total tax liability correctly', () => {
    render(
      <Provider store={store}>
        <TaxSummary />
      </Provider>
    );

    const totalTaxLiabilityElement = screen.getByTestId('total-pay-test');
    expect(totalTaxLiabilityElement).toHaveTextContent('150 $');
  });
});
