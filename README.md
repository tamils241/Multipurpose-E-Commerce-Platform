# Stackly - Multipurpose E-Commerce Platform

A modern, premium, fully responsive multipurpose e-commerce website theme built with only HTML5, CSS3, and vanilla JavaScript.

## Features

- **Responsive Design** - Works seamlessly on desktop, laptop, tablet, and mobile devices
- **Modern UI/UX** - Clean design with orange and charcoal color scheme
- **Product Catalog** - Browse products by categories with search and filtering
- **Shopping Cart** - Add to cart, update quantities, persistent cart with localStorage
- **Wishlist** - Save favorite products for later
- **Product Filtering** - Filter by category, price range, and rating
- **Product Sorting** - Sort by price, rating, and newest
- **Mobile Navigation** - Slide-out menu for mobile devices
- **Animations** - Smooth transitions and scroll-reveal effects
- **Form Validation** - Client-side validation for contact, login, and register forms
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation support

## Technology Stack

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)

## Project Structure

```
stackly-ecommerce/
├── index.html          # Home page
├── shop.html           # Shop/Product listing page
├── cart.html           # Shopping cart page
├── wishlist.html       # Wishlist page
├── about.html          # About us page
├── contact.html        # Contact page
├── login.html          # Login page
├── register.html       # Registration page
├── 404.html            # 404 error page
├── css/
│   ├── style.css       # Main styles
│   ├── responsive.css  # Responsive design
│   ├── animations.css  # Animations and effects
│   └── components.css  # Component styles
├── js/
│   ├── main.js         # Main functionality
│   ├── products.js     # Product data
│   ├── cart.js         # Shopping cart logic
│   ├── wishlist.js     # Wishlist logic
│   ├── search-filter.js # Search and filtering
│   └── validation.js   # Form validation
└── images/             # Image assets
```

## Getting Started

1. Clone or download the project
2. Open `index.html` in your web browser
3. No build process or dependencies required

## Pages

- **Home** - Hero section, categories, featured products, features
- **Shop** - Product grid with filters, search, and sorting
- **Cart** - Cart items, order summary, checkout (demo)
- **Wishlist** - Saved products
- **About** - Company information
- **Contact** - Contact form
- **Login/Register** - User authentication pages
- **404** - Error page

## Features in Detail

### Shopping Cart
- Add/remove products
- Update quantities
- Calculate totals
- Persist in localStorage
- Cart badge in header

### Product Filtering
- Search by product name
- Filter by category
- Filter by price range
- Filter by rating
- Sort by price, rating, newest
- Reset filters

### Wishlist
- Add/remove from wishlist
- Persist in localStorage
- Move to cart from wishlist

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Color Scheme

- Primary: `#F39C12` (Orange)
- Secondary: `#202124` (Dark Charcoal)
- Background: `#FFFFFF`, `#F7F8FA`
- Text: `#202124`, `#5f6368`

## Notes

- This is a front-end only implementation
- Checkout is for demonstration purposes only
- No backend or real payment processing
- All product data is in `js/products.js`

## License

This project is open source and available for educational purposes.
