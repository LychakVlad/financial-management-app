import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for additional matching options
import { Provider } from 'react-redux';
import TaxForm from './TaxForm';
import configureMockStore from 'redux-mock-store';
import TaxSummary from '../TaxSummary/TaxSummary';
import { setFilingStatusAction } from '../../../store/actions/taxActions';

const mockStore = configureMockStore();
const initialState = {
  incomes: {
    incomes: [{ tax: 'Taxable', amount: 100000 }],
  },
  taxes: {
    filingStatus: '',
    deductions: 12500,
    totalTaxLiability: 26395,
    stateTax: 5.75,
    federalTax: 22,
  },
};

let store;

beforeEach(() => {
  store = mockStore(initialState);
});

describe('TaxForm', () => {
  it('renders TaxForm correctly', () => {
    render(
      <Provider store={store}>
        <TaxForm />
      </Provider>
    );
    expect(screen.getByText('2022 VA State tax rates')).toBeInTheDocument();
  });

  it('displays an error message when no filing status is selected', () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <TaxForm />
      </Provider>
    );

    const calculateButton = getByTestId('btn-tax-calc-test');
    fireEvent.click(calculateButton);

    const errorMessage = queryByText('Please choose an option.');

    expect(errorMessage).toBeInTheDocument();
  });

  it('correctly calculates taxes with standard deduction', () => {
    render(
      <Provider store={store}>
        <TaxForm />
        <TaxSummary />
      </Provider>
    );

    const filingStatusDropdown = screen.getByTestId('dropdown-status-test');
    fireEvent.click(filingStatusDropdown);

    const singleStatusOption = screen.getByTestId('dropdown-status-test-1');
    fireEvent.click(singleStatusOption);

    const standardDeductionRadioYes = screen.getByTestId('radio-yes-test');
    fireEvent.click(standardDeductionRadioYes);

    const calculateButton = screen.getByTestId('btn-tax-calc-test');
    fireEvent.click(calculateButton);

    expect(screen.getByText('State tax:')).toBeInTheDocument();
    expect(screen.getByText('Federal tax:')).toBeInTheDocument();
    expect(screen.getByText('You need to pay:')).toBeInTheDocument();

    expect(screen.getByTestId('state-tax-test')).toHaveTextContent('5.75%');
    expect(screen.getByTestId('federal-tax-test')).toHaveTextContent('22%');
    expect(screen.getByTestId('total-pay-test')).toHaveTextContent('26,395 $');
  });
});
