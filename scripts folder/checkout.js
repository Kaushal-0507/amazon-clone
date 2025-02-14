import { renderOderSummary } from "./js_checkout/summaryOrder.js";
import { renderPaymentSummary } from "./js_checkout/summaryPayment.js";
import "./cart-oop.js";

function updateCartOnLoad() {
  const cartTotalQuantity = JSON.parse(localStorage.getItem("cart"));
  document.querySelector(".js-cart-quantity").innerHTML =
    cartTotalQuantity.length;
}
updateCartOnLoad();
renderOderSummary();
renderPaymentSummary();
