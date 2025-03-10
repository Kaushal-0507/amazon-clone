import { cart, addToCart } from "./cart.js";
import { products } from "./products.js";
import { formatCurrency } from "./utils/money.js";

function updateCartOnLoad() {
  const cartTotalQuantity = JSON.parse(localStorage.getItem("cart"));
  document.querySelector(".js-cart-quantity").innerHTML =
    cartTotalQuantity?.length ?? 0;
}
updateCartOnLoad();
let productHTML = "";
products.forEach((product) => {
  productHTML += `<div class="product-container">
        <div class="product-image-container">
          <img
            class="product-image"
            src="${product.image}"
          />
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img
            class="product-rating-stars"
            src="${product.getStarUrl()}"
          />
          <div class="product-rating-count link-primary">${
            product.rating.count
          }</div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-container">
          <select class="js-dropdown-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-cart-added-msg-${product.id}" >
          <img src="./images/icons/checkmark.png" />
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
          product.id
        }">Add to Cart</button>
      </div>`;
});
document.querySelector(".js-product-grid").innerHTML = productHTML;

function updateCart() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function cartMsgAdded(productId) {
  const cartAddedMsg = document.querySelector(
    `.js-cart-added-msg-${productId}`
  );
  cartAddedMsg.style.opacity = 1;
  setTimeout(() => {
    cartAddedMsg.style.opacity = 0;
  }, 2000);
}
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const selectedQuantity = document.querySelector(
      `.js-dropdown-selector-${productId}`
    );
    const quantity = Number(selectedQuantity.value);
    addToCart(productId, quantity);
    updateCart();
    cartMsgAdded(productId);
    updateCartOnLoad();
  });
});
updateCartOnLoad();
