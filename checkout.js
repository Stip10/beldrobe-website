// Retrieve cart data from localStorage
const cartData = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items-container');
const totalPriceElement = document.getElementById('total-price');
let totalPrice = 0;

// Render cart items
cartData.forEach(item => {
    // Create cart item container
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // Product image
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;

    // Product details
    const details = document.createElement('div');
    details.classList.add('cart-item-details');

    const name = document.createElement('h4');
    name.textContent = item.name;

    const description = document.createElement('p');
    description.textContent = item.description || '';  // Use empty string if no description

    const price = document.createElement('span');
    price.classList.add('cart-item-price');
    price.textContent = `Rp ${item.price}`;

    details.appendChild(name);
    details.appendChild(description);
    details.appendChild(price);

    // Append to cart item
    cartItem.appendChild(img);
    cartItem.appendChild(details);

    // Add to container
    cartItemsContainer.appendChild(cartItem);

    // Convert price to numeric value, remove 'Rp' and commas for thousands
    const priceValue = item.price.replace('Rp ', '').replace(/\./g, '');  // Remove 'Rp' and dot (thousands separator)
    
    // Ensure it's a valid number before adding it
    const numericPrice = parseInt(priceValue.replace(/\D/g, ''), 10);
    if (!isNaN(numericPrice)) {
        totalPrice += numericPrice;
    }
});

// Update total price
totalPriceElement.textContent = `Total: Rp ${totalPrice.toLocaleString('id-ID')}`;

// Finalize checkout
document.getElementById('finalize-checkout').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart'); // Clear cart
    window.location.href = 'home.html'; // Redirect to home
});
