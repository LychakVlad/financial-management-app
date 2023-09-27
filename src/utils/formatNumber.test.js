import { formatNumber } from "./formatNumber";

describe("formatNumber function", () => {
  describe("formatNumber function", () => {
    it("formats a positive integer", () => {
      expect(formatNumber(12345)).toBe("12,345");
    });

    it("formats a positive floating-point number", () => {
      expect(formatNumber(12345.67)).toBe("12,345.67");
    });

    it("formats a negative number", () => {
      expect(formatNumber(-9876.54)).toBe("-9,876.54");
    });

    it("formats a zero", () => {
      expect(formatNumber(0)).toBe("0");
    });
  });
});
