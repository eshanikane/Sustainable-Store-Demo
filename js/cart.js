// ============================================================
// Cart utilities - localStorage-backed cart for demo store
// Key: "ecoCart"
// Shared across all pages (navbar count + cart page)
// ============================================================

const CART_STORAGE_KEY = 'ecoCart';

/**
 * Safely parse JSON from localStorage.
 * Returns [] if nothing is stored or parsing fails.
 */
function getCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.warn('Unable to read cart from localStorage', err);
    return [];
  }
}

/**
 * Save cart array back to localStorage.
 * @param {Array} cart
 */
function saveCart(cart) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.warn('Unable to save cart to localStorage', err);
  }
}

/**
 * Recalculate and display the cart count in the navbar.
 * Sums quantity across all cart items.
 */
function updateCartCount() {
  const cartCountEl = document.getElementById('cart-count');
  if (!cartCountEl) return; // allow script on pages without badge

  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  cartCountEl.textContent = totalItems.toString();
}

/**
 * Add or increment a product in the cart.
 * @param {{id:string, name:string, price:number, image:string}} product
 */
function addToCart(product) {
  if (!product || !product.id) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity = (existing.quantity || 0) + 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image || '',
      quantity: 1,
    });
  }

  saveCart(cart);
  updateCartCount();
}

/**
 * Change the quantity of an item by delta (+1 or -1).
 * Removes item if quantity drops below 1.
 * @param {string} id
 * @param {number} delta
 */
function changeQuantity(id, delta) {
  if (!id || !delta) return;
  const cart = getCart();
  const item = cart.find((it) => it.id === id);
  if (!item) return;

  const newQty = (item.quantity || 0) + delta;
  if (newQty <= 0) {
    const filtered = cart.filter((it) => it.id !== id);
    saveCart(filtered);
  } else {
    item.quantity = newQty;
    saveCart(cart);
  }

  updateCartCount();
  renderCart(); // safe: no-op on non-cart pages
}

/**
 * Remove item completely from cart by id.
 * @param {string} id
 */
function removeItem(id) {
  if (!id) return;
  const cart = getCart();
  const filtered = cart.filter((it) => it.id !== id);
  saveCart(filtered);
  updateCartCount();
  renderCart();
}

/**
 * Render cart items on cart.html.
 * If cart is empty, show empty state instead.
 */
function renderCart() {
  const itemsContainer = document.getElementById('cart-items');
  const emptyState = document.getElementById('cart-empty');
  const cartContent = document.getElementById('cart-content');
  const subtotalEl = document.getElementById('cart-subtotal');

  // If we're not on cart page, silently exit.
  if (!itemsContainer || !emptyState || !cartContent || !subtotalEl) {
    return;
  }

  const cart = getCart();

  if (!cart.length) {
    emptyState.style.display = 'block';
    cartContent.style.display = 'none';
    subtotalEl.textContent = '$0.00';
    itemsContainer.innerHTML = '';
    return;
  }

  emptyState.style.display = 'none';
  cartContent.style.display = 'grid';

  let subtotal = 0;
  itemsContainer.innerHTML = '';

  cart.forEach((item) => {
    const quantity = item.quantity || 0;
    const price = Number(item.price) || 0;
    const lineTotal = quantity * price;
    subtotal += lineTotal;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image || ''}" alt="${item.name || 'Cart item'}" />
      </div>
      <div class="cart-item-info">
        <h3>${item.name || ''}</h3>
        <p class="cart-item-price">$${price.toFixed(2)}</p>
        <p class="cart-item-meta">Line total: $${lineTotal.toFixed(2)}</p>
      </div>
      <div class="cart-item-actions">
        <div class="quantity-controls" aria-label="Change quantity">
          <button class="quantity-button" data-action="decrement" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span class="quantity-value">${quantity}</span>
          <button class="quantity-button" data-action="increment" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-item-btn" data-action="remove" data-id="${item.id}">Remove</button>
      </div>
    `;

    itemsContainer.appendChild(row);
  });

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

// Initialize navbar count and cart rendering on load
document.addEventListener('DOMContentLoaded', function () {
  updateCartCount();
  renderCart();

  // Delegate quantity / remove actions inside cart
  const itemsContainer = document.getElementById('cart-items');
  if (itemsContainer) {
    itemsContainer.addEventListener('click', function (event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const action = target.getAttribute('data-action');
      const id = target.getAttribute('data-id');
      if (!action || !id) return;

      if (action === 'increment') {
        changeQuantity(id, 1);
      } else if (action === 'decrement') {
        changeQuantity(id, -1);
      } else if (action === 'remove') {
        removeItem(id);
      }
    });
  }

  // Simple fake checkout behaviour (demo only)
  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', function () {
      alert('This is a demo store. No real checkout is processed.');
    });
  }
});

