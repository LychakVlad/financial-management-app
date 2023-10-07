import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for additional matching options
import DateChange from './DateChange';

describe('DateChange', () => {
  it("renders with a default 'Choose date' value", () => {
    const { getByText } = render(<DateChange />);
    expect(getByText('Choose date')).toBeInTheDocument();
  });

  it('displays a description when provided', () => {
    const { getByText } = render(<DateChange desc="Select a date" />);
    expect(getByText('Select a date')).toBeInTheDocument();
  });

  it('opens and closes the calendar on click', () => {
    const { getByText, getByTestId } = render(<DateChange />);

    const calendarElement = getByTestId('test-calendar');

    expect(calendarElement).not.toHaveClass('dropActive');

    fireEvent.click(getByText('Choose date'));

    expect(calendarElement).toHaveClass('dropActive');

    fireEvent.click(getByText('Choose date'));

    expect(calendarElement).not.toHaveClass('dropActive');
  });
});
