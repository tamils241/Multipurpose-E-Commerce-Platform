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

    // Table pagination
    const PAGE_SIZE = 6;

    document.querySelectorAll('.table-pagination').forEach((pagination) => {
        const pagesWrap = pagination.querySelector('.pagination-pages');
        if (!pagesWrap) return;

        const buttons = Array.from(pagesWrap.querySelectorAll('.page-btn'));
        const prevBtn = buttons.find((btn) => btn.getAttribute('aria-label') === 'Previous page');
        const nextBtn = buttons.find((btn) => btn.getAttribute('aria-label') === 'Next page');
        const pageButtons = buttons.filter((btn) => /^\d+$/.test(btn.textContent.trim()));
        const gapButtons = buttons.filter((btn) => !/^\d+$/.test(btn.textContent.trim()) && btn !== prevBtn && btn !== nextBtn);

        if (!pageButtons.length) return;

        // The "..." separator is not a real page link
        gapButtons.forEach((btn) => {
            btn.setAttribute('aria-hidden', 'true');
            btn.addEventListener('click', (event) => event.preventDefault());
        });

        const section = pagination.closest('section');
        const table = section ? section.querySelector('[data-admin-table]') : null;
        const rows = table ? Array.from(table.querySelectorAll('tbody tr')) : [];
        const countEl = pagination.querySelector('[data-admin-count]');
        const canPaginate = rows.length > PAGE_SIZE;

        let activeIndex = Math.max(0, pageButtons.findIndex((btn) => btn.classList.contains('active')));

        function updateControls() {
            pageButtons.forEach((btn, index) => {
                const isActive = index === activeIndex;
                btn.classList.toggle('active', isActive);

                if (isActive) {
                    btn.setAttribute('aria-current', 'page');
                } else {
                    btn.removeAttribute('aria-current');
                }
            });

            if (prevBtn) {
                const isDisabled = activeIndex === 0;
                prevBtn.classList.toggle('disabled', isDisabled);
                prevBtn.setAttribute('aria-disabled', isDisabled ? 'true' : 'false');
            }

            if (nextBtn) {
                const isDisabled = activeIndex === pageButtons.length - 1;
                nextBtn.classList.toggle('disabled', isDisabled);
                nextBtn.setAttribute('aria-disabled', isDisabled ? 'true' : 'false');
            }
        }

        function showPage(index) {
            activeIndex = Math.min(Math.max(index, 0), pageButtons.length - 1);
            updateControls();

            if (!canPaginate) return;

            const start = activeIndex * PAGE_SIZE;
            const end = start + PAGE_SIZE;

            rows.forEach((row, rowIndex) => {
                row.style.display = rowIndex >= start && rowIndex < end ? '' : 'none';
            });

            if (countEl) {
                countEl.textContent = Math.max(0, Math.min(PAGE_SIZE, rows.length - start));
            }
        }

        pageButtons.forEach((btn, index) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                showPage(index);
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', (event) => {
                event.preventDefault();
                showPage(activeIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (event) => {
                event.preventDefault();
                showPage(activeIndex + 1);
            });
        }

        updateControls();
    });

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
