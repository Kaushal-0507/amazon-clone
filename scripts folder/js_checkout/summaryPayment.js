import { cart } from "../cart.js";
import { getProduct } from "../products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../deliveryOptions.js";
import { addOrders } from "../orders.js";

function updateCartOnLoad() {
  const cartTotalQuantity = JSON.parse(localStorage.getItem("cart"));
  document.querySelector(".js-cart-quantity").innerHTML =
    cartTotalQuantity.length;
}
updateCartOnLoad();

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax + taxCents;
  const cartTotalQuantity = JSON.parse(localStorage.getItem("cart"));
  const totalQuantity = cartTotalQuantity.length;

  const paymentSummaryHTML = `
        <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-btn">
            Place your order
          </button>
          `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document;
  document
    .querySelector(".js-place-order-btn")
    .addEventListener("click", async () => {
      try {
        const order = {
          cart: cart.map((cartItem) => ({
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            deliveryOptionId: cartItem.deliveryOptionId,
          })),
        };

        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(order),
        });

        const orders = await response.json();
        addOrders(orders);
      } catch (error) {
        console.log("Unexpected Error, try again later!");
      }

      window.location.href = "orders.html";
    });
}
