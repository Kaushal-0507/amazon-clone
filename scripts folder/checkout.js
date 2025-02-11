import { renderOderSummary } from "./js_checkout/summaryOrder.js";

function updateCartOnLoad() {
  const cartTotalQuantity = JSON.parse(localStorage.getItem("cart"));
  document.querySelector(".js-cart-quantity").innerHTML =
    cartTotalQuantity.length;
}
updateCartOnLoad();
renderOderSummary();
