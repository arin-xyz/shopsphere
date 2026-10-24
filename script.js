
"use strict";

// =====================================
// ShopSphere — Product Catalogue
// =====================================

const products = [
    {
        id: 1,
        name: "Ceramic Table Lamp",
        category: "Home",
        price: 2499,
        oldPrice: 3199,
        rating: 4.8,
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "Everyday Canvas Tote",
        category: "Fashion",
        price: 899,
        oldPrice: 1199,
        rating: 4.6,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Wireless Headphones",
        category: "Tech",
        price: 3499,
        oldPrice: 4299,
        rating: 4.9,
        badge: "Top Rated",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Minimal Ceramic Vase",
        category: "Home",
        price: 1299,
        oldPrice: 1599,
        rating: 4.7,
        badge: "",
        image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        name: "Classic Wrist Watch",
        category: "Fashion",
        price: 2799,
        oldPrice: 3499,
        rating: 4.5,
        badge: "New",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        name: "Everyday Water Bottle",
        category: "Lifestyle",
        price: 699,
        oldPrice: 899,
        rating: 4.4,
        badge: "",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        name: "Modern Desk Chair",
        category: "Home",
        price: 5999,
        oldPrice: 7499,
        rating: 4.8,
        badge: "Editor's Pick",
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        name: "Premium Sunglasses",
        category: "Fashion",
        price: 1599,
        oldPrice: 1999,
        rating: 4.6,
        badge: "",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 9,
        name: "Portable Bluetooth Speaker",
        category: "Tech",
        price: 2299,
        oldPrice: 2999,
        rating: 4.7,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 10,
        name: "Soft Cotton Cushion",
        category: "Home",
        price: 799,
        oldPrice: 999,
        rating: 4.5,
        badge: "",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 11,
        name: "Everyday Backpack",
        category: "Lifestyle",
        price: 1899,
        oldPrice: 2399,
        rating: 4.8,
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 12,
        name: "Smart Fitness Watch",
        category: "Tech",
        price: 4299,
        oldPrice: 5499,
        rating: 4.6,
        badge: "New",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    }
];

// =====================================
// DOM references
// =====================================

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const categoryFilters = document.getElementById("categoryFilters");
const resultsCount = document.getElementById("resultsCount");

// =====================================
// Product display and formatting
// =====================================

let activeCategory = "All";

const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);

function renderProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    let filteredProducts = products.filter((product) => {
        const matchesCategory =
            activeCategory === "All" ||
            product.category === activeCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    switch (sortSelect.value) {
        case "price-low":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case "rating":
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }

    resultsCount.textContent =
        `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} found`;

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="empty-state">
                <h3>No products found</h3>
                <p>Try another search or choose a different category.</p>
            </div>
        `;
        return;
    }

    productGrid.innerHTML = filteredProducts.map((product) => `
        <article class="product-card">
            <div class="product-image-wrap">
                ${product.badge
                    ? `<span class="product-badge">${product.badge}</span>`
                    : ""}
                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >
            </div>

            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-rating">
                    ★★★★★ <span>${product.rating}</span>
                </p>

                <div class="product-bottom">
                    <div>
                        <span class="product-price">${formatPrice(product.price)}</span>
                        <span class="old-price">${formatPrice(product.oldPrice)}</span>
                    </div>

                    <button
                        class="add-button"
                        type="button"
                        data-add="${product.id}"
                        aria-label="Add ${product.name} to cart"
                    >+</button>
                </div>
            </div>
        </article>
    `).join("");
}

// =====================================
// Search, category filters and sorting
// =====================================

searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

categoryFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");

    if (!button) return;

    activeCategory = button.dataset.category;

    categoryFilters.querySelectorAll(".filter-button").forEach((item) => {
        item.classList.toggle("active", item === button);
    });

    renderProducts();
    });
/* =====================================
   ShopSphere — Shopping Cart
   ===================================== */

const cartOverlay = document.getElementById("cartOverlay");
const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const toast = document.getElementById("toast");

let cart = [];

try {
    const savedCart = JSON.parse(localStorage.getItem("shopsphere-cart") || "[]");

    if (Array.isArray(savedCart)) {
        cart = savedCart.filter((item) =>
            products.some((product) =>
                product.id === item.id
                && Number.isInteger(item.quantity)
                && item.quantity > 0
            )
        );
    }
} catch {
    cart = [];
}

function saveCart() {
    localStorage.setItem("shopsphere-cart", JSON.stringify(cart));
}

function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;

    // Automatically hide the message after 2 seconds.
    setTimeout(() => {
        toast.hidden = true;
    }, 2000);
}

function addToCart(productId) {
    const product = products.find((item) => item.id === productId);

    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveCart();
    renderCart();
    showToast(`${product.name} added to your bag`);
}

function changeQuantity(productId, change) {
    const item = cart.find((entry) => entry.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter((entry) => entry.id !== productId);
    }

    saveCart();
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);

    saveCart();
    renderCart();
    showToast("Item removed from your bag");
}

function renderCart() {
    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce((total, item) => {
        const product = products.find((p) => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = formatPrice(totalPrice);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-state">
                <h3>Your bag is empty</h3>
                <p>Discover something you love and add it here.</p>
            </div>
        `;

        checkoutButton.disabled = true;
        checkoutButton.style.opacity = "0.5";
        return;
    }

    checkoutButton.disabled = false;
    checkoutButton.style.opacity = "1";

    cartItemsContainer.innerHTML = cart.map((item) => {
        const product = products.find((p) => p.id === item.id);

        if (!product) return "";

        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">

                <div class="cart-item-info">
                    <strong>${product.name}</strong>
                    <p>${formatPrice(product.price)}</p>

                    <div class="quantity-controls">
                        <button
                            type="button"
                            data-quantity="${product.id}"
                            data-change="-1"
                            aria-label="Decrease ${product.name} quantity"
                        >−</button>

                        <span>${item.quantity}</span>

                        <button
                            type="button"
                            data-quantity="${product.id}"
                            data-change="1"
                            aria-label="Increase ${product.name} quantity"
                        >+</button>
                    </div>
                </div>

                <button
                    class="remove-button"
                    type="button"
                    data-remove="${product.id}"
                >Remove</button>
            </div>
        `;
    }).join("");
}

// Handle clicks on product cards and the cart's quantity/removal buttons.
document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");

    if (addButton) {
        addToCart(Number(addButton.dataset.add));
        return;
    }

    const quantityButton = event.target.closest("[data-quantity]");

    if (quantityButton) {
        changeQuantity(
            Number(quantityButton.dataset.quantity),
            Number(quantityButton.dataset.change)
        );
        return;
    }

    const removeButton = event.target.closest("[data-remove]");

    if (removeButton) {
        removeFromCart(Number(removeButton.dataset.remove));
    }
});

// Open and close the shopping bag.
openCartButton.addEventListener("click", () => {
    cartOverlay.hidden = false;
});

closeCartButton.addEventListener("click", () => {
    cartOverlay.hidden = true;
});

cartOverlay.addEventListener("click", (event) => {
    if (event.target === cartOverlay) {
        cartOverlay.hidden = true;
    }
});

// Close the cart with the Escape key.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        cartOverlay.hidden = true;
    }
});

// Render any cart saved from an earlier visit.
renderCart();


// Display the initial product catalogue.
renderProducts();

/* =====================================
   ShopSphere — Demo Checkout
   ===================================== */

const checkoutFormContainer = document.getElementById("checkoutFormContainer");
const checkoutForm = document.getElementById("checkoutForm");
const orderConfirmation = document.getElementById("orderConfirmation");
const confirmationMessage = document.getElementById("confirmationMessage");
const checkoutOrderSummary = document.getElementById("checkoutOrderSummary");
const continueShoppingButton = document.getElementById("continueShopping");

checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your bag is empty");
        return;
    }

    checkoutFormContainer.hidden = false;
    orderConfirmation.hidden = true;

    const total = cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    checkoutOrderSummary.textContent =
        `Order summary: ${itemCount} item(s) — ${formatPrice(total)}`;

    checkoutFormContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (cart.length === 0) {
        showToast("Your bag is empty");
        checkoutFormContainer.hidden = true;
        return;
    }

    const customerName = document.getElementById("customerName").value.trim();
    const customerEmail = document.getElementById("customerEmail").value.trim();

    if (!customerName || !customerEmail) {
        showToast("Please complete the required details");
        return;
    }

    const orderNumber = "SS-" + Date.now().toString().slice(-8);

    confirmationMessage.textContent =
        `Thank you, ${customerName}! Your demo order ${orderNumber} has been placed. ` +
        `A confirmation would be sent to ${customerEmail} in a real store. ` +
        `No payment was collected.`;

    // Clear the cart after the demo order is placed.
    cart = [];
    saveCart();
    renderCart();

    checkoutFormContainer.hidden = true;
    orderConfirmation.hidden = false;
    checkoutButton.hidden = true;

    checkoutForm.reset();
});

continueShoppingButton.addEventListener("click", () => {
    orderConfirmation.hidden = true;
    checkoutButton.hidden = false;
    cartOverlay.hidden = true;

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});
