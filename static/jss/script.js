// Highlight active nav item
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const currentPath = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  updateCartCount();
});

// Add to cart functionality
function addToCart(itemName, itemWeight, itemPrice, imageUrl) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name: itemName, weight: itemWeight, price: itemPrice, image: imageUrl });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${itemName} added to cart!`);
}

// Update cart count on nav
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

// Show cart items in cart.html
function showCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");

  if (!container) return;

  container.innerHTML = "";

  if (cartItems.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  cartItems.forEach((item, index) => {
    total += parseFloat(item.price);
    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" width="100">
        <p><strong>${item.name}</strong> (${item.weight})</p>
        <p>Price: ₹${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  container.innerHTML += `<h3>Total: ₹${total.toFixed(2)}</h3>`;
}

// Remove item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCartItems();
  updateCartCount();
}

// Clear cart on successful checkout
function clearCart() {
  localStorage.removeItem("cart");
  updateCartCount();
}

// Validate login/signup
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  const email = form.querySelector("input[type='email']").value;
  const password = form.querySelector("input[type='password']").value;

  if (!email || !password) {
    alert("Please fill all fields.");
    return false;
  }

  return true;
}

// Smooth scroll (if needed)
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
