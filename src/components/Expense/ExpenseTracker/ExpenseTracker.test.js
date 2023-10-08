import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExpenseTracker from './ExpenseTracker';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useAuth } from '../../../contexts/AuthContext';
import { cleanup } from '@testing-library/react';

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockStore = configureMockStore();
const initialState = {
  expenses: [
    {
      amount: '1000',
      date: '10/04/2023',
      description: 'Rent',
      id: 2,
      pay: 'Card',
      type: 'Housing',
    },
  ],
  totalExpense: 0,
};

let store;

beforeEach(() => {
  useAuth.mockReturnValue({ currentUser: { uid: 'testUserId' } });

  store = mockStore(initialState);
});

afterEach(() => {
  cleanup();
});

describe('Expense Tracker', () => {
  it('renders the Expense Tracker component', () => {
    render(
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    );
    expect(screen.getByText('Write down your expense')).toBeInTheDocument();
  });
});
