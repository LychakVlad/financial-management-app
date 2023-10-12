import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import configureMockStore from 'redux-mock-store';
import { useAuth } from '../../../contexts/AuthContext';
import { doc } from 'firebase/firestore';
import { act } from 'react-dom/test-utils';

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
let currentUser;

beforeEach(() => {
  currentUser = {
    currentUser: {
      uid: 'testUserId',
    },
  };
  useAuth.mockReturnValue(currentUser);

  const mockFirestoreDocument = {
    expenses: [],
    totalExpense: 0,
    money: {
      totalCard: 0,
      totalCash: 0,
      totalSavings: 0,
    },
  };

  const getDocMock = jest.fn().mockResolvedValue({
    data: () => mockFirestoreDocument,
  });

  doc.mockReturnValue({ get: getDocMock });

  store = mockStore(initialState);
});

afterEach(() => {
  cleanup();
});

describe('ExpenseForm', () => {
  it('renders ExpenseForm correctly', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <ExpenseForm />
        </Provider>
      );
    });
  });
});
