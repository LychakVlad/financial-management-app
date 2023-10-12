import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for additional matching options
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useAuth } from '../../../contexts/AuthContext';
import { doc } from 'firebase/firestore'; //
import ExpenseGraph from './ExpenseGraph';
import { formatDate } from '../../../utils/dateFormat';
import { act } from 'react-dom/test-utils';

const currentDate = new Date();
const formattedDate = formatDate(currentDate);

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('firebase/firestore', () => {
  const originalModule = jest.requireActual('firebase/firestore');
  return {
    ...originalModule,
    doc: jest.fn(),
    getDoc: jest.fn(),
  };
});

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

let store;
let currentUser;

beforeEach(() => {
  currentUser = {
    currentUser: {
      uid: 'testUserId',
    },
  };
  useAuth.mockReturnValue(currentUser);
  store = mockStore(initialState);

  const getDocMock = jest.fn().mockResolvedValue({
    data: () => ({
      expenses: initialState.expenses.expenses,
    }),
  });
  doc.mockReturnValue({ get: getDocMock });
});

afterEach(() => {
  cleanup();
});

describe('ExpenseGraph', () => {
  it('renders ExpenseGraph correctly', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <ExpenseGraph dates={{ from: new Date(), to: new Date() }} />
        </Provider>
      );
    });

    expect(screen.getByText('Expenses:')).toBeInTheDocument();
  });

  it('displays the total expense correctly', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <ExpenseGraph dates={{ from: new Date(), to: new Date() }} />
        </Provider>
      );
    });

    expect(screen.getByTestId('total-expense-test')).toHaveTextContent(
      '300 $ Total expense'
    );
  });

  it('displays expense categories correctly', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <ExpenseGraph dates={{ from: new Date(), to: new Date() }} />
        </Provider>
      );
    });

    expect(screen.getByTestId('total-expense-test-Housing')).toHaveTextContent(
      '100 $'
    );
    expect(
      screen.getByTestId('total-expense-test-Groceries')
    ).toHaveTextContent('200 $');
  });
});
