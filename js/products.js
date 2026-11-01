// Sample Product Data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 89.99,
        originalPrice: 129.99,
        image: "images/products/headphones.webp",
        rating: 4.8,
        reviews: 245,
        badge: "sale",
        description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
        inStock: true
    },
    {
        id: 2,
        name: "Men's Casual Cotton T-Shirt",
        category: "Fashion",
        price: 24.99,
        originalPrice: null,
        image: "images/products/t-shirt.webp",
        rating: 4.5,
        reviews: 128,
        badge: "new",
        description: "Comfortable cotton t-shirt perfect for everyday wear.",
        inStock: true
    },
    {
        id: 3,
        name: "Smart Watch Series 5",
        category: "Watches & Accessories",
        price: 299.99,
        originalPrice: 399.99,
        image: "images/products/smart-watch.webp",
        rating: 4.9,
        reviews: 89,
        badge: "bestseller",
        description: "Advanced smartwatch with fitness tracking and heart rate monitoring.",
        inStock: true
    },
    {
        id: 4,
        name: "Ceramic Vase Set",
        category: "Home & Living",
        price: 45.99,
        originalPrice: null,
        image: "images/products/ceramic-vase.webp",
        rating: 4.7,
        reviews: 67,
        badge: null,
        description: "Elegant ceramic vase set for home decoration.",
        inStock: true
    },
    {
        id: 5,
        name: "Moisturizing Face Cream",
        category: "Beauty & Personal Care",
        price: 32.49,
        originalPrice: 39.99,
        image: "images/products/face-cream.webp",
        rating: 4.6,
        reviews: 156,
        badge: "sale",
        description: "Hydrating face cream with natural ingredients for all skin types.",
        inStock: true
    },
    {
        id: 6,
        name: "Running Shoes",
        category: "Sports & Fitness",
        price: 79.99,
        originalPrice: null,
        image: "images/products/running-shoes.webp",
        rating: 4.8,
        reviews: 203,
        badge: "new",
        description: "Lightweight running shoes with superior cushioning.",
        inStock: true
    },
    {
        id: 7,
        name: "Leather Wallet",
        category: "Watches & Accessories",
        price: 34.99,
        originalPrice: 49.99,
        image: "images/products/leather-wallet.webp",
        rating: 4.9,
        reviews: 78,
        badge: "sale",
        description: "Genuine leather wallet with multiple card slots.",
        inStock: true
    },
    {
        id: 8,
        name: "Desk Lamp with USB",
        category: "Home & Living",
        price: 28.99,
        originalPrice: null,
        image: "images/products/desk-lamp.webp",
        rating: 4.4,
        reviews: 92,
        badge: null,
        description: "Modern desk lamp with adjustable brightness and USB charging port.",
        inStock: true
    },
    {
        id: 9,
        name: "Denim Jacket",
        category: "Fashion",
        price: 65.49,
        originalPrice: 89.99,
        image: "images/products/denim-jacket.webp",
        rating: 4.7,
        reviews: 134,
        badge: "sale",
        description: "Classic denim jacket with a modern fit.",
        inStock: true
    },
    {
        id: 10,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 19.99,
        originalPrice: null,
        image: "images/products/wireless-mouse.webp",
        rating: 4.6,
        reviews: 167,
        badge: null,
        description: "Ergonomic wireless mouse with long battery life.",
        inStock: true
    },
    {
        id: 11,
        name: "Yoga Mat",
        category: "Sports & Fitness",
        price: 24.49,
        originalPrice: null,
        image: "images/products/yoga-mat.webp",
        rating: 4.8,
        reviews: 145,
        badge: "new",
        description: "Non-slip yoga mat for all types of exercises.",
        inStock: true
    },
    {
        id: 12,
        name: "Sunglasses",
        category: "Watches & Accessories",
        price: 42.99,
        originalPrice: 59.99,
        image: "images/products/sunglasses.webp",
        rating: 4.7,
        reviews: 89,
        badge: "sale",
        description: "Stylish sunglasses with UV protection.",
        inStock: true
    }
];

// Get products by category
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(p => p.category === category);
}

// Get product by id
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}
