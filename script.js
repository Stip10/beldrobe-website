let cartCount = 0;
let cartItemsData = []; // Array untuk menyimpan data produk
const cartLink = document.getElementById('cart-link');
const cartCountSpan = document.getElementById('cart-count');
const cartDropdown = document.querySelector('.cart-dropdown');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout-button');
const clearCartButton = document.getElementById('clear-cart-button'); // Clear cart button

// Function to load cart from localStorage
function loadCart() {
    const storedCartCount = localStorage.getItem('cartCount');
    const storedCartItems = localStorage.getItem('cartItems');
    cartCount = storedCartCount ? parseInt(storedCartCount) : 0;
    cartItemsData = storedCartItems ? JSON.parse(storedCartItems) : [];
    updateCart();
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItemsData)); // Simpan ke 'cartItems'
    localStorage.setItem('cartCount', cartCount); // Menyimpan jumlah item
}

// Logout button action
document.getElementById('logout-button').addEventListener('click', function() {
    window.location.href = 'login.html';  // Redirect to login page
});

// Function to update cart count and display items
function updateCart() {
    cartCountSpan.textContent = cartCount;
    if (cartCount > 0) {
        cartItems.textContent = `Anda memiliki ${cartCount} item di keranjang`;
        checkoutButton.disabled = false;
    } else {
        cartItems.textContent = 'Keranjang kosong';
        checkoutButton.disabled = true; // Disable checkout if cart is empty
    }
}

// Add items to cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('img').src;

        // Create product object
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
        };

        // Add to cart array and save
        cartItemsData.push(product);
        cartCount++;
        saveCart();
        updateCart();
    });
});

// Handle checkout button
checkoutButton.addEventListener('click', () => {
    if (cartCount > 0) {
        window.location.href = 'checkout.html'; // Redirect to checkout page
    } else {
        alert('Keranjang Anda kosong. Tambahkan item terlebih dahulu.');
    }
});

// Handle clear cart button
clearCartButton.addEventListener('click', () => {
    cartCount = 0;
    cartItemsData = [];
    saveCart();
    updateCart();
});

// Dropdown hover logic with animation
function toggleDropdown(show) {
    cartDropdown.style.display = show ? 'block' : 'none';
    cartDropdown.style.opacity = show ? '1' : '0';
    cartDropdown.style.transition = 'opacity 0.3s';
}

cartLink.addEventListener('mouseenter', () => toggleDropdown(true));
cartLink.addEventListener('mouseleave', () => toggleDropdown(false));
cartDropdown.addEventListener('mouseenter', () => toggleDropdown(true));
cartDropdown.addEventListener('mouseleave', () => toggleDropdown(false));

// Load initial cart state from localStorage
loadCart();
