import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExpenseTracker from './ExpenseTracker';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { cleanup } from '@testing-library/react';
import { useAuth } from '../../../contexts/AuthContext';
import { doc } from 'firebase/firestore'; // Import the functions

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
        amount: '1000',
        date: '10/04/2023',
        description: 'Rent',
        id: 2,
        pay: 'Card',
        type: 'Housing',
      },
    ],
    totalExpense: 1000,
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
});

afterEach(() => {
  cleanup();
});

describe('Expense Tracker', () => {
  it('renders the Expense Tracker component', async () => {
    const getDocMock = jest.fn().mockResolvedValue({
      data: () => ({
        expenses: initialState.expenses.expenses,
      }),
    });
    doc.mockReturnValue({ get: getDocMock });

    await act(async () => {
      render(
        <Provider store={store}>
          <ExpenseTracker />
        </Provider>
      );
    });

    expect(screen.getByText('Write down your expense')).toBeInTheDocument();
  });
});
