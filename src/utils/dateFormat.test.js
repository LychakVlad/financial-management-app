import { formatDate } from "./dateFormat"; // Import the function from your actual file

describe("formatDate function", () => {
  it('formats a date in "MM/DD/YYYY" format', () => {
    const testDate = new Date(2023, 8, 22);

    expect(formatDate(testDate)).toBe("09/22/2023");
  });

  it("formats a date with single-digit month and day", () => {
    const testDate = new Date(2023, 0, 5);

    expect(formatDate(testDate)).toBe("01/05/2023");
  });

  it("formats a date with a different year", () => {
    const testDate = new Date(2022, 11, 31);

    expect(formatDate(testDate)).toBe("12/31/2022");
  });
});
