// Cart functionality
let cart = JSON.parse(localStorage.getItem('stackly_cart')) || [];

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('stackly_cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Show feedback
    showCartFeedback(product.name);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('stackly_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

// Update cart quantity
function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        localStorage.setItem('stackly_cart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
    }
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart count
function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Show cart feedback animation
function showCartFeedback(productName) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.textContent = `✓ Added ${productName.substring(0, 20)}... to cart`;
    feedback.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--success-color);
        color: white;
        padding: 12px 24px;
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2s forwards;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2300);
}

// Render cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet</p>
                <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        if (cartSummary) {
            cartSummary.innerHTML = `
                <h3 class="cart-summary-title">Order Summary</h3>
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>$0.00</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>$0.00</span>
                </div>
                <button class="checkout-btn" disabled style="opacity: 0.5; cursor: not-allowed;">Proceed to Checkout</button>
            `;
        }
        return;
    }
    
    // Render cart items
    let itemsHTML = `
        <div class="cart-header">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
            <div></div>
        </div>
    `;
    
    cart.forEach(item => {
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='images/fallback.webp'">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>SKU: STK-${item.id.toString().padStart(6, '0')}</p>
                    </div>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
    
    // Render summary
    if (cartSummary) {
        const subtotal = getCartTotal();
        const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
        const total = subtotal + shipping;
        
        cartSummary.innerHTML = `
            <h3 class="cart-summary-title">Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal (${getCartCount()} items)</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
            </div>
            ${subtotal > 0 && subtotal < 100 ? '<div style="color: var(--primary-color); font-size: 12px; margin-bottom: 12px;">Add $' + (100 - subtotal).toFixed(2) + ' more for free shipping</div>' : ''}
            <div class="summary-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
            <a href="shop.html" class="btn btn-secondary" style="width: 100%; margin-top: 12px;">Continue Shopping</a>
        `;
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Checkout functionality is a demo. In a real application, this would integrate with a payment gateway.');
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    
    // If on cart page, render cart
    if (document.getElementById('cartItems')) {
        renderCart();
    }
});

// Add CSS for fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
