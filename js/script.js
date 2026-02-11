// ============================================================
// Global UI behaviour for Sustainable Lifestyle Store
// - Navbar / hamburger menu
// - Product modal
// - Contact form handling
// - Small page enhancements & animations
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  setupNavbar();
  setupFooterYear();
  setupProductModal();
  setupAddToCartButtons();
  setupContactForm();
});

// ------------------------------------------------------------ 
// Navbar behaviour (hamburger for mobile)
// ------------------------------------------------------------ 

function setupNavbar() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
  });

  // Close menu when clicking a link (mobile UX)
  navLinks.addEventListener('click', function (event) {
    const target = event.target;
    if (target instanceof HTMLElement && target.matches('a.nav-link')) {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
    }
  });
}

// ------------------------------------------------------------ 
// Footer year (simple quality-of-life detail)
// ------------------------------------------------------------ 

function setupFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (!yearEl) return;
  yearEl.textContent = String(new Date().getFullYear());
}

// ------------------------------------------------------------ 
// Product modal on index.html
// ------------------------------------------------------------ 

function setupProductModal() {
  const modalOverlay = document.getElementById('product-modal');
  if (!modalOverlay) return; // Not on index page

  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalDescription = document.getElementById('modal-description');
  const modalBenefit = document.getElementById('modal-benefit');
  const modalAddToCart = document.getElementById('modal-add-to-cart');

  let activeProductData = null;

  function openModal(productData) {
    activeProductData = productData;

    if (modalImage) modalImage.src = productData.image || '';
    if (modalImage) modalImage.alt = productData.name || 'Product image';
    if (modalTitle) modalTitle.textContent = productData.name || '';
    if (modalPrice) modalPrice.textContent = `$${Number(productData.price).toFixed(2)}`;
    if (modalDescription) modalDescription.textContent = productData.description || '';
    if (modalBenefit) modalBenefit.textContent = productData.benefit || '';

    modalOverlay.classList.add('is-visible');
    modalOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modalOverlay.classList.remove('is-visible');
    modalOverlay.setAttribute('aria-hidden', 'true');
    activeProductData = null;
  }

  // Attach click handler to "View Details" buttons and product images
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(function (card) {
    const viewBtn = card.querySelector('.view-details-btn');
    const imageContainer = card.querySelector('.product-image');

    if (!viewBtn && !imageContainer) return;

    const handleOpen = function () {
      const el = card;
      const productData = {
        id: el.getAttribute('data-id'),
        name: el.getAttribute('data-name'),
        price: parseFloat(el.getAttribute('data-price') || '0'),
        image: el.getAttribute('data-image'),
        description: el.getAttribute('data-description'),
        benefit: el.getAttribute('data-benefit'),
      };

      openModal(productData);
    };

    if (viewBtn) {
      viewBtn.addEventListener('click', handleOpen);
    }

    if (imageContainer) {
      imageContainer.style.cursor = 'pointer';
      imageContainer.addEventListener('click', handleOpen);
    }
  });

  // Close modal interactions
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', function (event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modalOverlay.classList.contains('is-visible')) {
      closeModal();
    }
  });

  // "Add to Cart" from within modal
  if (modalAddToCart) {
    modalAddToCart.addEventListener('click', function () {
      if (!activeProductData || typeof addToCart !== 'function') return;
      addToCart({
        id: activeProductData.id,
        name: activeProductData.name,
        price: activeProductData.price,
        image: activeProductData.image,
      });
      alert('Added to cart!');
    });
  }
}

// ------------------------------------------------------------ 
// Add-to-cart buttons on product cards (index.html)
// ------------------------------------------------------------ 

function setupAddToCartButtons() {
  if (typeof addToCart !== 'function') return;

  const productCards = document.querySelectorAll('.product-card');
  if (!productCards.length) return;

  productCards.forEach(function (card) {
    const addBtn = card.querySelector('.add-to-cart-btn');
    if (!addBtn) return;

    addBtn.addEventListener('click', function () {
      const el = card;
      const product = {
        id: el.getAttribute('data-id'),
        name: el.getAttribute('data-name'),
        price: parseFloat(el.getAttribute('data-price') || '0'),
        image: el.getAttribute('data-image'),
      };
      addToCart(product);
      alert('Added to cart!');
    });
  });
}

// ------------------------------------------------------------ 
// Contact form handling (contact.html)
// ------------------------------------------------------------ 

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return; // Not on contact page

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // As a simple UX detail, we could check that required fields are non-empty
    // before showing confirmation, but skipping explicit validation as the
    // browser will already handle "required" attributes.

    alert('Thank you for your feedback!');
    form.reset();
  });
}

