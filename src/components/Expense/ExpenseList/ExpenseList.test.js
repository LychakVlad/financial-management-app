import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for additional matching options
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ExpenseList from './ExpenseList';
import { formatDate } from '../../../utils/dateFormat';

const currentDate = new Date();
const formattedDate = formatDate(currentDate);

const mockStore = configureMockStore();
const initialStateWithExpenses = {
  expenses: {
    expenses: [
      {
        id: 1,
        amount: 100,
        description: 'Expense 1',
        type: 'Housing',
        pay: 'Card',
        date: formattedDate,
      },
      {
        id: 2,
        amount: 200,
        description: 'Expense 2',
        type: 'Groceries',
        pay: 'Cash',
        date: formattedDate,
      },
    ],
    totalExpense: 300,
    money: {
      totalCard: 100,
      totalCash: 200,
      totalSavings: 0,
    },
  },
};

const initialStateWithoutExpenses = {
  expenses: {
    expenses: [],
    totalExpense: 0,
    money: {
      totalCard: 0,
      totalCash: 0,
      totalSavings: 0,
    },
  },
};

let store;

beforeEach(() => {
  store = mockStore(initialStateWithExpenses);
});
afterEach(() => {
  cleanup();
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
    expect(screen.getByText('Housing')).toBeInTheDocument();
    expect(screen.getByText('Card')).toBeInTheDocument();
  });
});
