// Deals page functionality
document.addEventListener('DOMContentLoaded', () => {
    initDealsProducts();
    initDealCountdown();
});

function initDealsProducts() {
    const dealsGrid = document.getElementById('dealsProducts');
    if (!dealsGrid || typeof products === 'undefined' || typeof createProductCard !== 'function') {
        return;
    }

    const deals = products.filter(product =>
        product.badge === 'sale' || (product.originalPrice && product.originalPrice > product.price)
    );

    dealsGrid.innerHTML = deals.map(product => createProductCard(product)).join('');

    if (typeof updateWishlistUI === 'function') {
        updateWishlistUI();
    }
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
}

function initDealCountdown() {
    const countdown = document.getElementById('dealCountdown');
    if (!countdown) return;

    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 3);
    endTime.setHours(23, 59, 59, 0);

    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minutesEl = document.getElementById('cdMinutes');
    const secondsEl = document.getElementById('cdSeconds');

    const pad = value => String(value).padStart(2, '0');

    function update() {
        const now = Date.now();
        let diff = Math.max(0, endTime.getTime() - now);
        const totalSeconds = Math.floor(diff / 1000);

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (daysEl) daysEl.textContent = pad(days);
        if (hoursEl) hoursEl.textContent = pad(hours);
        if (minutesEl) minutesEl.textContent = pad(minutes);
        if (secondsEl) secondsEl.textContent = pad(seconds);
    }

    update();
    setInterval(update, 1000);
}
