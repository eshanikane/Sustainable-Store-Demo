## Sustainable Lifestyle Store

A frontend-only demo ecommerce website showcasing a modern, eco-friendly product catalogue. Built as a fully static site that runs with **no build tools** and can be deployed directly to **GitHub Pages**.

### Tech Stack

- **HTML5**: Static pages (`index.html`, `about.html`, `contact.html`, `cart.html`)
- **CSS3**: Centralized styles in `css/styles.css` (eco-inspired design system)
- **Vanilla JavaScript**:
  - `js/script.js` – Navbar, modal, contact form behavior, and UI enhancements
  - `js/cart.js` – LocalStorage-backed cart shared across all pages

No frameworks, bundlers, or backend are used.

### Features

- **Product catalogue** with 8 sustainable items
- **Product details modal** (no extra pages) with “Add to Cart”
- **Persistent cart** using `localStorage` (`ecoCart` key)
  - Add to cart from product cards and modal
  - Global cart count in the navbar on every page
  - Full cart page with quantity controls, remove item, and subtotal
- **Static content pages**:
  - `about.html`: Sustainable mission and principle cards
  - `contact.html`: Feedback form with client-side “Thank you” alert and form reset
- **Responsive layout**:
  - Sticky navbar with hamburger menu on mobile
  - Responsive product grid and scrollable modal on small screens

### Project Structure

```text
/index.html
/about.html
/contact.html
/cart.html
/css/styles.css
/js/script.js
/js/cart.js
/images/        # product images and assets
```

All assets are referenced with **relative paths**, so the site works when opened directly via `index.html` and when served from GitHub Pages.

### Running Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/eshanikane/Sustainable-Store-Demo.git
   cd Sustainable-Store-Demo
   ```

2. Open `index.html` in your browser (double-click it or use “Open with Live Server” / similar).

3. Navigate using the navbar and test:
   - Adding products to the cart
   - Viewing and updating the cart on `cart.html`
   - Submitting the contact form on `contact.html` (shows a “Thank you for your feedback!” alert and clears fields)

### Deploying to GitHub Pages

1. **Push to GitHub** (if you haven’t already):

   ```bash
   git add .
   git commit -m "Initial Sustainable Lifestyle Store demo"
   git push origin main
   ```

2. In your GitHub repo (`eshanikane/Sustainable-Store-Demo`), go to:

   - **Settings → Pages**
   - Under **Source**, choose:
     - **Deploy from a branch**
     - **Branch**: `main`
     - **Folder**: `/` (root)
   - Click **Save**.

3. After GitHub Pages finishes deploying, your live site will be available at:

   `https://eshanikane.github.io/Sustainable-Store-Demo/`

You can then share this URL directly in your portfolio or resume as a live demo of the Sustainable Lifestyle Store.

