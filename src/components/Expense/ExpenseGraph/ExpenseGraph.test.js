import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for additional matching options
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ExpenseGraph from './ExpenseGraph';
import ExpenseList from '../ExpenseList/ExpenseList';
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
        type: 'Housing',
        pay: 'Card',
        date: '10/04/2023',
      },
      {
        id: 2,
        amount: 200,
        description: 'Expense 2',
        type: 'Groceries',
        pay: 'Cash',
        date: '10/04/2023',
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

describe('ExpenseGraph', () => {
  it('renders ExpenseGraph correctly', () => {
    render(
      <Provider store={store}>
        <ExpenseGraph dates={{ from: new Date(), to: new Date() }} />
      </Provider>
    );

    expect(screen.getByText('Expenses:')).toBeInTheDocument();
  });

  it('displays the total expense correctly', () => {
    render(
      <Provider store={store}>
        <ExpenseGraph dates={{ from: new Date(), to: new Date() }} />
      </Provider>
    );

    expect(screen.getByTestId('total-expense-test')).toHaveTextContent(
      '300 $ Total expense'
    );
  });

  it('displays expense categories correctly', () => {
    render(
      <Provider store={store}>
        <ExpenseGraph dates={{ from: new Date(), to: new Date() }} />
      </Provider>
    );

    expect(screen.getByTestId('total-expense-test-Housing')).toHaveTextContent(
      '100 $'
    );
    expect(
      screen.getByTestId('total-expense-test-Groceries')
    ).toHaveTextContent('200 $');
  });
});
