import { orders } from "./orders.js";
import { getProduct } from "./products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// Function to get query parameters from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to update the tracking page with product details
function updateTrackingPage(productId) {
  // Find the order that contains the product
  const order = orders.find((order) =>
    order.products.some((product) => product.productId === productId)
  );

  if (order) {
    // Find the specific product in the order
    const ordersProduct = order.products.find(
      (product) => product.productId === productId
    );

    if (ordersProduct) {
      const matchingItem = getProduct(ordersProduct.productId);

      if (matchingItem) {
        // Format the delivery date
        const deliveryDate = dayjs(ordersProduct.estimatedDeliveryTime).format(
          "dddd, MMMM DD"
        );

        // Generate the HTML for the tracking page
        const trackPageHTML = `
          <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>

          <div class="delivery-date">Arriving on ${deliveryDate}</div>

          <div class="product-info">
            ${matchingItem.name}
          </div>

          <div class="product-info">Quantity: ${ordersProduct.quantity}</div>

          <img class="product-image" src="${matchingItem.image}" />

          <div class="progress-labels-container">
            <div class="progress-label">Preparing</div>
            <div class="progress-label current-status">Shipped</div>
            <div class="progress-label">Delivered</div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar"></div>
          </div>
        `;

        // Update the DOM with the generated HTML
        document.querySelector(".js-order-tracking").innerHTML = trackPageHTML;
      } else {
        showError("Product not found.");
      }
    } else {
      showError("Product not found in the order.");
    }
  } else {
    showError("Order not found.");
  }
}

// Function to show an error message
function showError(message) {
  document.querySelector(".js-order-tracking").innerHTML = `
    <p>${message}</p>
    <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
  `;
}

// Main function to initialize the tracking page
function initializeTrackingPage() {
  // Get the product ID from the URL query parameters
  const productId = getQueryParam("productId");

  if (productId) {
    updateTrackingPage(productId);
  } else {
    showError("Invalid tracking details. Please check the URL.");
  }
}

// Run the initialization function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeTrackingPage);
