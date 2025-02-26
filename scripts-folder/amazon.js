const slider = document.querySelector(".hero-section-img");
const slides = document.querySelectorAll(".hero-imgs");
let currentIndex = 0;

function updateCartOnLoad() {
  const cartTotalQuantity = JSON.parse(localStorage.getItem("cart"));
  console.log(cartTotalQuantity, typeof cartTotalQuantity);
  console.log(cartTotalQuantity.length);
  document.querySelector(".js-cart-quantity").innerHTML =
    cartTotalQuantity.length;
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

updateCartOnLoad();

setInterval(nextSlide, 5000);

showSlide(currentIndex);
