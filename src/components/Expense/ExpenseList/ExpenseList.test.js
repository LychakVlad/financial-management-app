import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for additional matching options
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ExpenseList from './ExpenseList';

const mockStore = configureMockStore();
const initialStateWithExpenses = {
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

const initialStateWithoutExpenses = {
  expenses: {
    expenses: [],
    totalExpense: 0,
  },
};

let store;

beforeEach(() => {
  store = mockStore(initialStateWithExpenses);
});

describe('ExpenseList', () => {
  it('renders ExpenseList correctly', () => {
    render(
      <Provider store={store}>
        <ExpenseList dates={{ from: new Date(), to: new Date() }} />
      </Provider>
    );
    expect(screen.getByText('Expense 1')).toBeInTheDocument();
    expect(screen.getByText('Expense 2')).toBeInTheDocument();
  });

  it('displays a message when there are no expenses', () => {
    store = mockStore(initialStateWithoutExpenses);
    render(
      <Provider store={store}>
        <ExpenseList dates={{ from: new Date(), to: new Date() }} />
      </Provider>
    );
    expect(screen.getByText('No expense yet...')).toBeInTheDocument();
  });

  it('displays expense items correctly when there are expenses', () => {
    render(
      <Provider store={store}>
        <ExpenseList dates={{ from: new Date(), to: new Date() }} />
      </Provider>
    );
    expect(screen.getByText('Expense 1')).toBeInTheDocument();
    expect(screen.getByText('Type 1')).toBeInTheDocument();
    expect(screen.getByText('Card')).toBeInTheDocument();
    expect(screen.getByText('10/04/2023')).toBeInTheDocument();
  });
});
