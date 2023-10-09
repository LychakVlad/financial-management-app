import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for additional matching options
import { Provider } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import configureMockStore from 'redux-mock-store'; // Mock the AuthContext if needed
import { formatDate } from '../../../utils/dateFormat';

const currentDate = new Date();
const formattedDate = formatDate(currentDate);

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({ currentUser: { uid: 'testUserId' } }),
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
  },
};

let store;

beforeEach(() => {
  store = mockStore(initialState);
});

afterEach(() => {
  cleanup();
});

describe('ExpenseForm', () => {
  it('renders ExpenseForm correctly', async () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
  });

  it('submits the form with valid data', async () => {
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
