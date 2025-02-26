import {
  cart,
  deleteFromCart,
  updateDeliveryOption,
  updateQuantity,
} from "../cart.js";
import { getProduct } from "../products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../deliveryOptions.js";
import { renderPaymentSummary } from "./summaryPayment.js";

function updateCartOnLoad() {
  const cartTotalQuantity = JSON.parse(localStorage.getItem("cart"));
  document.querySelector(".js-cart-quantity").innerHTML =
    cartTotalQuantity?.length ?? 0;
}

export function renderOderSummary() {
  let cartSummary = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummary += `
      <div class="cart-item-container js-cart-item-container js-cart-item-${
        matchingProduct.id
      }">
              <div class="delivery-date">Delivery date: ${dateString}</div>
  
              <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${matchingProduct.image}"
                />
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity js-product-quantity-${
                    matchingProduct.id
                  }">
                    <span> Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span> 
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                      matchingProduct.id
                    }">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${
                      matchingProduct.id
                    }" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                 ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummary;

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const quantityContainer = document.querySelector(
        `.js-product-quantity-${productId}`
      );

      quantityContainer.innerHTML = `
        <span> Quantity: </span>
        <input type="number" class="quantity-input js-quantity-input-${productId}" value="${
        cart.find((item) => item.productId === productId).quantity
      }" min="1" />
        <button class="save-quantity-link link-primary js-save-link" data-product-id="${productId}">
          Save
        </button>
      `;

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      quantityInput.focus();

      const saveButton = document.querySelector(
        `.js-save-link[data-product-id="${productId}"]`
      );
      saveButton.addEventListener("click", () => {
        saveQuantity(productId);
      });

      quantityInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          saveQuantity(productId);
        }
      });
    });
  });

  function saveQuantity(productId) {
    const newQuantity = parseInt(
      document.querySelector(`.js-quantity-input-${productId}`).value
    );

    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);

      const quantityContainer = document.querySelector(
        `.js-product-quantity-${productId}`
      );
      quantityContainer.innerHTML = `
        <span> Quantity: <span class="quantity-label">${newQuantity}</span> 
        <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">
          Update
        </span>
        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${productId}" data-product-id="${productId}">
          Delete
        </span>
      `;

      renderOderSummary();
      renderPaymentSummary();
    } else {
      alert("Please enter a valid quantity.");
    }
  }

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      deleteFromCart(productId);

      const deleteContainer = document.querySelector(
        `.js-cart-item-${productId}`
      );
      deleteContainer.remove();
      renderPaymentSummary();
      updateCartOnLoad();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOderSummary();
      renderPaymentSummary();
    });
  });
}

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? `FREE`
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `<div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input 
                      type="radio"
                      ${isChecked ? "checked" : ""}
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                  <div>  
                      <div class="delivery-option-date">${dateString}</div>
                      <div class="delivery-option-price">${priceString} Shipping</div>
                  </div> 
                </div>`;
  });
  return html;
}
