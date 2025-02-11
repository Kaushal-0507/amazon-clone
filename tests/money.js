import { formatCurrency } from "../scripts folder/utils/money.js";

console.log("Test Suite: formatCurrency");
console.log("Converts Cents into Dollars");
if (formatCurrency(2050) === "20.50") {
  console.log("passed");
} else {
  console.log("Failed");
}

console.log("Works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("Failed");
}

console.log("Rounds up to the nearest integers .i.e. .5 to 1");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("Failed");
}

console.log("Rounds up to the nearest integers .i.e. .4 to 0");
if (formatCurrency(2000.4) === "20.00") {
  console.log("passed");
} else {
  console.log("Failed");
}
