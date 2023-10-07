import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Radio from './Radio';

test('renders Radio component with correct label and state', () => {
  const testId = 'radio-test';
  const label = 'Option 1';
  const name = 'radioGroup';
  const id = 'radioOption1';
  const selectedOption = true;
  const onChange = jest.fn();

  const { getByTestId, getByLabelText } = render(
    <Radio
      value={label}
      name={name}
      id={id}
      selectedOption={selectedOption}
      onChange={onChange}
      test={testId}
    />
  );

  const radioInput = getByTestId(testId).querySelector('input[type="radio"]');
  expect(radioInput).toBeChecked();

  const labelElement = getByLabelText(label);
  expect(labelElement).toBeInTheDocument();
});

test('calls the onChange function when the radio is clicked', () => {
  const testId = 'radio-test';
  const label = 'Option 1';
  const name = 'radioGroup';
  const id = 'radioOption1';
  const selectedOption = false;
  const onChange = jest.fn();

  const { getByTestId } = render(
    <Radio
      value={label}
      name={name}
      id={id}
      selectedOption={selectedOption}
      onChange={onChange}
      test={testId}
    />
  );

  const radioInput = getByTestId(testId).querySelector('input[type="radio"]');
  fireEvent.click(radioInput);

  expect(onChange).toHaveBeenCalledWith(label);
});
