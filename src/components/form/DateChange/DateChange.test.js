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

    // Initially, the calendar should not have the 'dropActive' class
    expect(calendarElement).not.toHaveClass('dropActive');

    // Click on the date display
    fireEvent.click(getByText('Choose date'));

    // Now, the calendar should have the 'dropActive' class
    expect(calendarElement).toHaveClass('dropActive');

    // Click on the date display again to close the calendar
    fireEvent.click(getByText('Choose date'));

    // The calendar should not have the 'dropActive' class again
    expect(calendarElement).not.toHaveClass('dropActive');
  });

  // You can add more test cases for interactions and events as needed
});
