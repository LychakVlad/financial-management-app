import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for additional matching options
import { Provider } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import configureMockStore from 'redux-mock-store';
import { useAuth } from '../../../contexts/AuthContext'; // Mock the AuthContext if needed

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockStore = configureMockStore();
const initialState = {
  expenses: {
    expenses: [
      {
        id: 1,
        amount: 100,
        description: 'Expense 1',
        type: 'Type 1',
        pay: 'Card',
        date: '10/04/2023',
      },
      {
        id: 2,
        amount: 200,
        description: 'Expense 2',
        type: 'Type 2',
        pay: 'Cash',
        date: '10/05/2023',
      },
    ],
    totalExpense: 300,
  },
};

let store;

beforeEach(() => {
  useAuth.mockReturnValue({ currentUser: { uid: 'testUserId' } });

  store = mockStore(initialState);
});

describe('ExpenseForm', () => {
  it('renders ExpenseForm correctly', () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
  });

  it('submits the form with valid data', () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    fireEvent.change(screen.getByTestId('input-number-test'), {
      target: { value: '50' },
    });
    fireEvent.change(screen.getByTestId('input-desc-test'), {
      target: { value: 'Test Expense' },
    });
    fireEvent.click(screen.getByTestId('dropdown-category-test'));
    fireEvent.click(screen.getByText('Groceries'));
    fireEvent.click(screen.getByTestId('dropdown-type-test'));
    fireEvent.click(screen.getByText('Card'));

    fireEvent.submit(screen.getByTestId('btn-add-test'));
  });
});
