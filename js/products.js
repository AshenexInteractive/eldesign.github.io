/* ============================================
   ELDESIGN - Products Page JavaScript
   Renders product cards from PRODUCTS array
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    renderProductsGrid();
    renderOtherProducts();
});

// ---- Render Products Grid (listing page) ----
function renderProductsGrid() {
    const grid = document.getElementById('products-grid');
    if (!grid || typeof PRODUCTS === 'undefined') return;

    grid.innerHTML = PRODUCTS.map(product => createProductCard(product)).join('');

    // Add reveal animations
    grid.querySelectorAll('.product-card').forEach((card, i) => {
        card.classList.add('reveal');
        setTimeout(() => card.classList.add('reveal--visible'), 100 + i * 150);
    });
}

// ---- Render "Other Products" on detail pages ----
function renderOtherProducts() {
    const grid = document.getElementById('other-products-grid');
    if (!grid || typeof PRODUCTS === 'undefined') return;

    // Get current product slug from URL
    const currentSlug = window.location.pathname.split('/').pop().replace('.html', '');

    // Filter out current product
    const otherProducts = PRODUCTS.filter(p => p.slug !== currentSlug);

    grid.innerHTML = otherProducts.map(product => createProductCard(product)).join('');

    // Add reveal animations
    grid.querySelectorAll('.product-card').forEach((card, i) => {
        card.classList.add('reveal');
        setTimeout(() => card.classList.add('reveal--visible'), 100 + i * 150);
    });
}

// ---- Create Product Card HTML ----
function createProductCard(product) {
    const featuresHTML = product.features.slice(0, 3).map(f =>
        `<div class="product-card__feature">${f}</div>`
    ).join('');

    return `
        <a href="${product.slug}.html" class="product-card">
            <div class="product-card__icon">
                ${product.icon}
            </div>
            <span class="product-card__category">${product.category}</span>
            <h3 class="product-card__name">${product.name}</h3>
            <span class="product-card__model">${product.model}</span>
            <p class="product-card__desc">${product.tagline}</p>
            <div class="product-card__features">
                ${featuresHTML}
            </div>
            <div class="product-card__footer">
                <span class="product-card__discount">${product.discount} RABATT</span>
                <span class="product-card__link">Les mer <span>→</span></span>
            </div>
        </a>
    `;
}
