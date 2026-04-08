# 🍽️ Spoon & Flame — Food Delivery App

A responsive, single-page food delivery web app built with **React** and **Vite**. Users can browse a curated menu, filter by category, choose item sizes, manage a shopping cart, and complete an order — all within a smooth dark/light themed interface.

---

## ✨ Features

- **Menu Browsing** — Browse food items across 7 categories: All, Pizza, Burger, Drinks, Desserts, Sushi, and Pasta
- **Size Selection** — Choose Small, Medium, or Large with dynamic price multipliers
- **Cart Management** — Add items, update quantities, remove individual items, or clear the entire cart
- **Order Flow** — Checkout leads to an order success confirmation screen
- **Dark / Light Theme** — Toggle between themes via the navbar button
- **Toast Notifications** — Real-time feedback for cart add, remove, and clear actions
- **Back to Top** — Smooth scroll-to-top button for easy navigation
- **Branded Splash Screen** — "Spoon & Flame" loading screen on app startup
- **Free Delivery** — Automatically applied when cart total exceeds $30
- **Responsive Design** — Hamburger menu for mobile viewports
- **Sign In Button** — Navbar UI stub ready for future authentication

---

## 🗂️ Project Structure

```
food-app/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets/                  # Local images (food photos, icons, logos)
    │   └── assets.js            # Central export file for all assets
    ├── data/
    │   └── foods.js             # Menu items, categories, size pricing
    └── components/
        ├── Navbar/              # Top nav with logo, links, theme toggle, cart
        ├── Hero/                # Landing banner with order CTA
        ├── ExploreMenu/         # Filterable food grid
        ├── FoodCard/            # Individual food item card
        ├── Cart/                # Slide-in cart drawer
        ├── OrderSuccess/        # Post-checkout confirmation modal
        ├── Footer/              # Site footer with contact section
        ├── Toast/               # Auto-dismissing notifications
        └── BackToTop/           # Scroll-to-top button
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm (bundled with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/spoon-and-flame.git
cd spoon-and-flame/food-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [Vite 4](https://vitejs.dev/) | Build tool & dev server |
| CSS (component-scoped) | Styling per component |
| CSS Custom Properties | Theme switching (dark / light) |

No external UI libraries or routing — intentionally minimal and dependency-light.

---

## 🧩 Key Implementation Details

### Cart Logic
Cart state is managed in `App.jsx` and passed down as props. Items are uniquely keyed by `id + size`, so the same dish in different sizes appears as separate cart entries.

### Pricing
Each food item has a `basePrice`. A size multiplier is applied when the item is added to the cart:

```js
// src/data/foods.js
export const sizePrices = {
  small:  1.0,   // 1.0× base price
  medium: 1.3,   // 1.3× base price
  large:  1.6,   // 1.6× base price
};
```

### Delivery Fee

| Cart Total | Delivery Fee |
|---|---|
| $0 (empty) | $0.00 |
| $0.01 – $30.00 | $4.99 |
| Over $30.00 | Free |

### Theming
The active theme (`dark` or `light`) is written as a `data-theme` attribute on `<html>` and consumed via CSS custom properties across all components.

### Toast System
A custom `useToast` hook in `App.jsx` manages a queue of notifications. Each toast auto-dismisses after **2.8 seconds**.

### Local Assets
All food images and UI icons are stored locally in `src/assets/` and exported centrally through `src/assets/assets.js` for easy import across components.

---

## 📦 Adding Menu Items

Edit `src/data/foods.js` to add new dishes:

```js
{
  id: 99,
  category: 'pasta',            // must match an existing category id
  name: 'Truffle Tagliatelle',
  description: 'Fresh pasta, black truffle, parmesan, butter sauce',
  basePrice: 19.99,
  rating: 4.8,
  reviews: 95,
  badge: 'New',                 // optional: 'Best Seller', 'Popular', 'New', or null
  image: assets.food_33,        // import from assets.js, or use an external URL
}
```

To add a new food category, append to the `categories` array:

```js
{ id: 'tacos', label: 'Tacos', emoji: '🌮' }
```

---

## 🌐 Deployment

Build for production:

```bash
npm run build
```

Deploy the generated `dist/` folder to any static host:

- **Vercel** — connect your GitHub repo for automatic deploys
- **Netlify** — drag and drop the `dist/` folder
- **GitHub Pages** — use the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package

---

## 🔮 Potential Enhancements

- Add React Router for dedicated pages (menu, checkout, profile)
- Connect a backend (Node/Express or Firebase) for real orders and auth
- Implement the Sign In flow stubbed in the Navbar
- Re-enable the Reviews section (component already exists, currently unused)
- Add search or filter by name / price range
- Persist cart to `localStorage` so it survives page refreshes

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
