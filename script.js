
const products = [
  { id: "bread", name: "Artisan Bread" },
  { id: "loaf", name: "Signature Loaf" },
  { id: "cookies", name: "Cookies and Sweet Treats" }
];

let favorites = JSON.parse(
  localStorage.getItem("bakeryFavorites") || "[]"
);

function saveFavorites() {
  localStorage.setItem(
    "bakeryFavorites",
    JSON.stringify(favorites)
  );
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }

  saveFavorites();
  displayProducts();
}

function displayProducts() {
  const container = document.getElementById("favorite-products");
  const message = document.getElementById("favorites-message");

  if (!container || !message) return;

  container.innerHTML = "";

  products.forEach(product => {
    const button = document.createElement("button");
    const saved = favorites.includes(product.id);

    button.textContent = saved
      ? "Remove " + product.name + " from Favorites"
      : "Save " + product.name + " to Favorites";

    button.type = "button";
    button.addEventListener("click", () => {
      toggleFavorite(product.id);
    });

    container.appendChild(button);
    container.appendChild(document.createElement("br"));
  });

  const savedNames = products
    .filter(product => favorites.includes(product.id))
    .map(product => product.name);

  message.textContent = savedNames.length
    ? "Your favorites: " + savedNames.join(", ")
    : "You haven't saved any favorites yet.";
}

document.addEventListener("DOMContentLoaded", displayProducts);

function validateContactForm(event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const request = document.getElementById("request");
  const details = document.getElementById("details");

  const errors = {
    fullname: document.getElementById("fullname-error"),
    email: document.getElementById("email-error"),
    request: document.getElementById("request-error"),
    details: document.getElementById("details-error")
  };

  const success = document.getElementById("form-success");

  // Clear previous messages
  Object.values(errors).forEach(error => {
    error.textContent = "";
  });

  success.textContent = "";

  let valid = true;

  // Check full name
  if (fullname.value.trim().length < 2) {
    errors.fullname.textContent =
      "Please enter at least 2 characters for your name.";
    valid = false;
  }

  // Check email address
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value.trim())) {
    errors.email.textContent =
      "Please enter a valid email address.";
    valid = false;
  }

  // Check request type
  if (request.value === "") {
    errors.request.textContent =
      "Please select a request type.";
    valid = false;
  }

  // Check item details
  if (details.value.trim().length < 10) {
    errors.details.textContent =
      "Please enter at least 10 characters.";
    valid = false;
  }

  // Show success message
  if (valid) {
    success.textContent =
      "Your request looks good! This is a demonstration form. No information was sent.";
  }
}

// Connect validation to the contact form
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", validateContactForm);
  }
});
