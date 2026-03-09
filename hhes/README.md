# Book Haven - Bookstore Web Application

A modern, responsive bookstore website built with Tailwind CSS, featuring a product catalog, shopping cart, and multi-language support.

## 📁 Project Structure

```
book-haven/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css        # Custom CSS styles and animations
│   └── js/
│       └── script.js         # All JavaScript functionality
└── README.md                 # This file
```

## ✨ Features

- **Responsive Design** - Mobile-first layout that works on all devices
- **Product Showcase** - Featured books with ratings and pricing
- **Shopping Cart** - Add/remove books with quantity management
- **Multi-language Support** - English, Spanish, French, and German
- **Carousel Section** - Auto-rotating banner with manual controls
- **Newsletter Signup** - Email subscription form
- **Smooth Animations** - Fade-in effects and hover transitions
- **Element SDK Integration** - Dynamic configuration support

## 🎨 Key Sections

1. **Navigation Bar** - Sticky header with cart indicator
2. **Carousel** - Featured promotions with auto-advance
3. **Hero Section** - Main call-to-action with floating book graphics
4. **Categories** - Browse books by genre
5. **Featured Books** - Product grid with add-to-cart functionality
6. **Newsletter** - Email subscription section
7. **Footer** - Links and social media

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **JavaScript** - Vanilla JS (no frameworks)
- **Google Fonts** - Playfair Display & Source Sans 3

## 🚀 Getting Started

1. Open `index.html` in a web browser
2. The page will load with default configuration
3. Use the shopping cart to add books
4. Subscribe to the newsletter
5. Customize content through the Element SDK (if configured)

## 📝 Configuration

The `defaultConfig` object in `script.js` contains customizable settings:

- `store_name` - Store branding
- `hero_title` - Main headline
- `carousel_slide_*` - Carousel text
- `background_color` - Page background
- `primary_action_color` - Button colors
- `font_family` - Display font

## 🌍 Languages Supported

- English (en)
- Spanish (es)
- French (fr)
- German (de)

Use `changeLanguage(lang)` to switch languages dynamically.

## 📚 Book Data

Books are defined in the `books` array in `script.js`. Each book includes:
- Title and author
- Price and rating
- Gradient colors for styling

## 💳 Shopping Cart

The cart system supports:
- Add/remove items
- Quantity management
- Real-time total calculation
- Demo checkout functionality

## 📱 Responsive Breakpoints

- **Mobile** - < 640px
- **Tablet** - 640px - 1024px
- **Desktop** - 1024px+
