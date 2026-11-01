// Admin list page interactions
document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('[data-admin-table]');

    if (table) {
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const searchInput = document.querySelector('[data-admin-search]');
        const categorySelect = document.querySelector('[data-admin-category]');
        const tabs = Array.from(document.querySelectorAll('[data-admin-tab]'));
        const countEl = document.querySelector('[data-admin-count]');
        const emptyEl = document.querySelector('[data-admin-empty]');
        let activeTab = 'all';

        function applyFilters() {
            const term = (searchInput ? searchInput.value : '').toLowerCase().trim();
            const category = categorySelect ? categorySelect.value : 'all';
            let visible = 0;

            rows.forEach((row) => {
                const matchesTerm = !term || row.textContent.toLowerCase().includes(term);
                const matchesCategory = category === 'all' || row.dataset.category === category;
                const matchesTab = activeTab === 'all' || row.dataset.status === activeTab;
                const show = matchesTerm && matchesCategory && matchesTab;

                row.style.display = show ? '' : 'none';
                if (show) visible += 1;
            });

            if (countEl) countEl.textContent = visible;
            if (emptyEl) emptyEl.hidden = visible !== 0;
        }

        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }

        if (categorySelect) {
            categorySelect.addEventListener('change', applyFilters);
        }

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                tabs.forEach((item) => item.classList.remove('active'));
                tab.classList.add('active');
                activeTab = tab.dataset.adminTab || 'all';
                applyFilters();
            });
        });
    }

    // Settings forms
    document.querySelectorAll('[data-save-form]').forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const button = form.querySelector('[type="submit"]');

            if (!button) return;

            const original = button.textContent;
            button.textContent = 'Saved';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = original;
                button.disabled = false;
            }, 1800);
        });
    });

    // Settings side navigation
    const settingsLinks = Array.from(document.querySelectorAll('[data-settings-link]'));

    settingsLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(link.getAttribute('href'));

            if (!target) return;

            event.preventDefault();
            settingsLinks.forEach((item) => item.classList.remove('active'));
            link.classList.add('active');
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
