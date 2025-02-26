import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProduct } from "./products.js";
import { getDeliveryOption } from "./deliveryOptions.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrders(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function updateCartOnLoad() {
  const cartTotalQuantity = JSON.parse(localStorage.getItem("cart"));
  document.querySelector(".js-cart-quantity").innerHTML =
    cartTotalQuantity.length;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartOnLoad();

  if (orders.length > 0) {
    let orderPageHTML = "";
    const ordersObject = orders[0];
    const dateString = dayjs(ordersObject.orderTime).format("MMMM DD");

    orderPageHTML = `<div class="order-container js-order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dateString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(ordersObject.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${ordersObject.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${createOrderProducts()}
        </div>
      </div>`;
    document.querySelector(".js-order-grid").innerHTML = orderPageHTML;
  } else {
    document.querySelector(".js-order-grid").innerHTML =
      "<p>No orders found.</p>";
  }

  function createOrderProducts() {
    let ordersProductsHTML = "";
    const ordersObject = orders[0];
    const ordersProducts = ordersObject.products;

    ordersProducts.forEach((ordersProduct) => {
      const productId = ordersProduct.productId;
      const matchingItem = getProduct(productId);

      const quantity = ordersProduct.quantity;

      const deliveryOption = getDeliveryOption(ordersProduct.deliveryOptionId);

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      ordersProductsHTML += `<div class="product-image-container">
            <img src="${matchingItem.image}" />
          </div>

          <div class="product-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-delivery-date">Arriving on: ${dateString}</div>
            <div class="product-quantity">Quantity: ${quantity}</div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png" />
              <span class="buy-again-message"><a href="product.html">Buy it again</a></span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?productId=${productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>`;
    });

    return ordersProductsHTML;
  }
});
