// Search and Filter functionality
let currentFilters = {
    category: 'all',
    search: '',
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
    sortBy: 'default'
};

function initializeFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const ratingFilters = document.querySelectorAll('.rating-filter input');
    const sortSelect = document.getElementById('sortSelect');
    const resetBtn = document.getElementById('resetFilters');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value.toLowerCase();
            filterAndRenderProducts();
        });
    }
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.category = e.target.value;
                // Uncheck others
                categoryFilters.forEach(f => {
                    if (f !== e.target) f.checked = false;
                });
                filterAndRenderProducts();
            }
        });
    });
    
    if (priceMin) {
        priceMin.addEventListener('input', (e) => {
            currentFilters.minPrice = parseFloat(e.target.value) || 0;
            filterAndRenderProducts();
        });
    }
    
    if (priceMax) {
        priceMax.addEventListener('input', (e) => {
            currentFilters.maxPrice = parseFloat(e.target.value) || 1000;
            filterAndRenderProducts();
        });
    }
    
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.rating = parseInt(e.target.value);
                ratingFilters.forEach(f => {
                    if (f !== e.target) f.checked = false;
                });
                filterAndRenderProducts();
            }
        });
    });
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sortBy = e.target.value;
            filterAndRenderProducts();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentFilters = {
                category: 'all',
                search: '',
                minPrice: 0,
                maxPrice: 1000,
                rating: 0,
                sortBy: 'default'
            };
            // Reset form elements
            if (searchInput) searchInput.value = '';
            categoryFilters.forEach(f => f.checked = f.value === 'all');
            if (priceMin) priceMin.value = '';
            if (priceMax) priceMax.value = '';
            ratingFilters.forEach(f => f.checked = false);
            if (sortSelect) sortSelect.value = 'default';
            filterAndRenderProducts();
        });
    }
}

function filterAndRenderProducts() {
    let filtered = [...products];
    
    // Filter by search
    if (currentFilters.search) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(currentFilters.search)
        );
    }
    
    // Filter by category
    if (currentFilters.category !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilters.category);
    }
    
    // Filter by price
    filtered = filtered.filter(p => 
        p.price >= currentFilters.minPrice && p.price <= currentFilters.maxPrice
    );
    
    // Filter by rating
    if (currentFilters.rating > 0) {
        filtered = filtered.filter(p => p.rating >= currentFilters.rating);
    }
    
    // Sort
    if (currentFilters.sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentFilters.sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentFilters.sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (currentFilters.sortBy === 'newest') {
        filtered.sort((a, b) => b.id - a.id);
    }
    
    renderFilteredProducts(filtered);
}

function renderFilteredProducts(filteredProducts) {
    const productsGrid = document.getElementById('productsGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!productsGrid) return;
    
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`;
    }
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button class="btn btn-primary" onclick="resetAllFilters()">Reset Filters</button>
            </div>
        `;
        return;
    }
    
    let html = '';
    filteredProducts.forEach(product => {
        const badgeHTML = product.badge ? 
            `<div class="product-badge badge-${product.badge}">${product.badge === 'sale' ? 'Sale' : product.badge === 'new' ? 'New' : 'Best Seller'}</div>` : '';
        
        const originalPriceHTML = product.originalPrice ? 
            `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : '';
        
        html += `
            <div class="product-card">
                <div class="product-img-container">
                    <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.src='images/fallback.webp'">
                    ${badgeHTML}
                    <button class="wishlist-btn" data-product-id="${product.id}" onclick="toggleWishlist(${product.id})" title="Add to wishlist">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span class="rating-text">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${originalPriceHTML}
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.66 17h8.66a2 2 0 0 0 1.97-1.61L23 6H6"></path>
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
    
    productsGrid.innerHTML = html;
    updateWishlistUI();
}

function resetAllFilters() {
    currentFilters = {
        category: 'all',
        search: '',
        minPrice: 0,
        maxPrice: 1000,
        rating: 0,
        sortBy: 'default'
    };
    
    const searchInput = document.getElementById('searchInput');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const ratingFilters = document.querySelectorAll('.rating-filter input');
    const sortSelect = document.getElementById('sortSelect');
    
    if (searchInput) searchInput.value = '';
    categoryFilters.forEach(f => f.checked = f.value === 'all');
    if (priceMin) priceMin.value = '';
    if (priceMax) priceMax.value = '';
    ratingFilters.forEach(f => f.checked = false);
    if (sortSelect) sortSelect.value = 'default';
    
    filterAndRenderProducts();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    if (document.getElementById('productsGrid')) {
        filterAndRenderProducts();
    }
});
