export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function deleteFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateCartQuantity(productId) {
  const updateLink = document.querySelector(`.js-update-link-${productId}`);
  updateLink.style.display = "none";
  const quantityTextbox = document.querySelector(".js-quantity-textbox");
  quantityTextbox.style.display = "inline";
  const quantitySaveLink = document.querySelector(".js-save-quantity");
  quantitySaveLink.style.display = "inline";
  quantitySaveLink.addEventListener("click", () => {
    quantityTextbox.style.display = "none";
    quantitySaveLink.style.display = "none";
    updateLink.style.display = "inline";
  });
}
