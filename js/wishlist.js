// Wishlist functionality
let wishlist = JSON.parse(localStorage.getItem('stackly_wishlist')) || [];

// Toggle wishlist
function toggleWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index > -1) {
        // Remove from wishlist
        wishlist.splice(index, 1);
        showWishlistFeedback(`Removed from wishlist`);
    } else {
        // Add to wishlist
        wishlist.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
        });
        showWishlistFeedback(`Added to wishlist`);
    }
    
    localStorage.setItem('stackly_wishlist', JSON.stringify(wishlist));
    if (document.getElementById('wishlistItems')) renderWishlist();
    updateWishlistUI();
    updateWishlistBadge();
}

// Update wishlist UI - toggle button states
function updateWishlistUI() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        const productId = parseInt(btn.getAttribute('data-product-id'));
        if (wishlist.find(item => item.id === productId)) {
            btn.classList.add('active');
            btn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            `;
        } else {
            btn.classList.remove('active');
            btn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            `;
        }
    });
}

// Update wishlist badge
function updateWishlistBadge() {
    const count = wishlist.length;
    const badges = document.querySelectorAll('#sidebarWishlistCount, [data-wishlist-count]');
    badges.forEach(badge => {
        badge.textContent = count;
    });

    const statWishlist = document.getElementById('statWishlist');
    if (statWishlist) statWishlist.textContent = count;

    const statWishlistAvailable = document.getElementById('statWishlistAvailable');
    if (statWishlistAvailable) statWishlistAvailable.textContent = count;

    const statWishlistDrops = document.getElementById('statWishlistDrops');
    if (statWishlistDrops) {
        const drops = wishlist.filter(item => {
            const product = getProductById(item.id);
            return product && product.originalPrice && product.originalPrice > product.price;
        }).length;
        statWishlistDrops.textContent = drops;
    }
}

// Show wishlist feedback
function showWishlistFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color);
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

// Render wishlist page
function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlistItems');
    if (!wishlistContainer) return;
    
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">❤️</div>
                <h3>Your wishlist is empty</h3>
                <p>Save items you love to your wishlist</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    let html = '<div class="products-grid">';
    wishlist.forEach(item => {
        const product = getProductById(item.id);
        html += `
            <div class="product-card">
                <div class="product-img-container">
                    <img src="${item.image}" alt="${item.name}" class="product-img" onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop'">
                    <button class="wishlist-btn active" data-product-id="${item.id}" onclick="toggleWishlist(${item.id})" title="Remove from wishlist">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-category">${item.category}</div>
                    <h3 class="product-name">${item.name}</h3>
                    <div class="product-price">
                        <span class="current-price">$${item.price.toFixed(2)}</span>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${item.id}); setTimeout(() => renderWishlist(), 100);">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.66 17h8.66a2 2 0 0 0 1.97-1.61L23 6H6"></path>
                        </svg>
                        Move to Cart
                    </button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    wishlistContainer.innerHTML = html;
}

// Initialize wishlist
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistUI();
    updateWishlistBadge();
    if (document.getElementById('wishlistItems')) {
        renderWishlist();
    }
});
