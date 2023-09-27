import { render } from '@testing-library/react';
import LoginPage from './LoginPage';
import { Provider } from 'react-redux';

describe('Test Budget Needs', () => {
  test('Render successfully', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
  });
});
