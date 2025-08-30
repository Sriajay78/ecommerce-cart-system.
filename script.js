const products = [
    { id: 1, name: "T-Shirt", price: 20 },
    { id: 2, name: "Jeans", price: 40 },
    { id: 3, name: "Sneakers", price: 60 },
    { id: 4, name: "Hat", price: 15 }
];

let cart = [];

const productsDiv = document.querySelector(".products");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");
const clearCartBtn = document.getElementById("clear-cart");

// Render products
function renderProducts() {
    productsDiv.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

// Add product to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
            <button onclick="removeFromCart(${item.id})">Remove</button>`;
        cartItems.appendChild(li);
    });
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice.textContent = total;
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Clear cart
clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
});

// Initial render
renderProducts();
updateCart();
