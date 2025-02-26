import { formatCurrency } from "../../scripts-folder/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("Converts Cents into Dollars", () => {
    expect(formatCurrency(2050)).toEqual("20.50");
  });
  it("Works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("Rounds up to the nearest integers .i.e. .5 to 1", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
  it("Rounds up to the nearest integers .i.e. .4 to 0", () => {
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });
});
