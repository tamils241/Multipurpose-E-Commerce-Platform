// Dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('dashboardSidebar');
    const toggle = document.getElementById('sidebarToggle');
    const closeBtn = document.getElementById('sidebarClose');
    const overlay = document.getElementById('sidebarOverlay');
    
    function openSidebar() {
        if (!sidebar) return;
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (toggle) {
        toggle.addEventListener('click', openSidebar);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidebar();
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) closeSidebar();
    });
    
    // Notifications dropdown
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationPanel = document.getElementById('notificationPanel');
    
    function closeNotifications() {
        if (!notificationPanel) return;
        notificationPanel.classList.remove('active');
        if (notificationBtn) {
            notificationBtn.classList.remove('active');
            notificationBtn.setAttribute('aria-expanded', 'false');
        }
    }
    
    if (notificationBtn && notificationPanel) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = notificationPanel.classList.toggle('active');
            notificationBtn.classList.toggle('active', isOpen);
            notificationBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        
        notificationPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        document.addEventListener('click', closeNotifications);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeNotifications();
        });
    }
    
    // Live cart and wishlist counts
    const cart = JSON.parse(localStorage.getItem('stackly_cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('stackly_wishlist')) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const statCart = document.getElementById('statCart');
    if (statCart) statCart.textContent = cartCount;
    
    const statWishlist = document.getElementById('statWishlist');
    if (statWishlist) statWishlist.textContent = wishlist.length;
    
    const sidebarWishlistCount = document.getElementById('sidebarWishlistCount');
    if (sidebarWishlistCount) sidebarWishlistCount.textContent = wishlist.length;
    
    // Recommended products on the customer dashboard
    const grid = document.getElementById('dashboardProducts');
    if (grid && typeof products !== 'undefined' && typeof createProductCard === 'function') {
        grid.innerHTML = products.slice(4, 8).map(createProductCard).join('');
        if (typeof updateWishlistUI === 'function') updateWishlistUI();
        if (typeof updateCartBadge === 'function') updateCartBadge();
    }
});
