export const cart = JSON.parse(localStorage.getItem("cart")) || [];

export function loadFromStorage() {
  const cartFromStorage = JSON.parse(localStorage.getItem("cart"));
  if (cartFromStorage) {
    cart.length = 0;
    cart.push(...cartFromStorage);
  }
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function deleteFromCart(productId) {
  const newCart = cart.filter((cartItem) => cartItem.productId !== productId);
  cart.length = 0; // Clear the cart array
  cart.push(...newCart); // Add the filtered items back to the cart
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }
}
