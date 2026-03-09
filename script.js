
// Carousel functions
let currentSlide = 0;

function goToSlide(n) {
  currentSlide = n;
  const track = document.getElementById('carousel-track');
  track.style.transform = `translateX(-${n * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.style.opacity = i === n ? '1' : '0.5';
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % 3;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + 3) % 3;
  goToSlide(currentSlide);
}

// Auto-advance carousel every 5 seconds
setInterval(nextSlide, 5000);

// Translations
const translations = {
  en: {
    add_to_cart: "Add to Cart",
    remove: "Remove",
    empty_cart: "Your cart is empty",
    thanks: "Added to cart successfully!",
    demo_checkout: "Demo checkout completed!"
  },
  es: {
    add_to_cart: "Agregar al carrito",
    remove: "Eliminar",
    empty_cart: "Tu carrito está vacío",
    thanks: "¡Agregado al carrito exitosamente!",
    demo_checkout: "¡Demo de pago completado!"
  },
  fr: {
    add_to_cart: "Ajouter au panier",
    remove: "Supprimer",
    empty_cart: "Votre panier est vide",
    thanks: "Ajouté au panier avec succès!",
    demo_checkout: "Démo de paiement terminée!"
  },
  de: {
    add_to_cart: "In den Warenkorb",
    remove: "Entfernen",
    empty_cart: "Ihr Warenkorb ist leer",
    thanks: "Erfolgreich in den Warenkorb gelegt!",
    demo_checkout: "Demo-Checkout abgeschlossen!"
  }
};

let currentLanguage = 'en';

// Book data
const books = [
  { id: 1, title: "The Silent Echo", author: "Maya Rivers", price: 24.99, rating: 4.8, gradient: "from-rose-400 to-rose-600" },
  { id: 2, title: "Whispers of Time", author: "James Morton", price: 19.99, rating: 4.6, gradient: "from-blue-400 to-indigo-600" },
  { id: 3, title: "Garden of Dreams", author: "Elena Santos", price: 22.99, rating: 4.9, gradient: "from-emerald-400 to-teal-600" },
  { id: 4, title: "The Last Chapter", author: "Robert Chen", price: 27.99, rating: 4.7, gradient: "from-purple-400 to-violet-600" },
  { id: 5, title: "Health & Wellness Guide", author: "Dr. Sarah Johnson", price: 29.99, rating: 4.9, gradient: "from-green-400 to-teal-600" },
  { id: 6, title: "Nutrition Essentials", author: "Michael Brown", price: 24.99, rating: 4.7, gradient: "from-orange-400 to-red-600" },
  { id: 7, title: "Mindful Living", author: "Lisa Chen", price: 21.99, rating: 4.8, gradient: "from-purple-400 to-pink-600" },
  { id: 8, title: "Fitness Fundamentals", author: "David Wilson", price: 26.99, rating: 4.6, gradient: "from-blue-500 to-indigo-700" }
];

let cart = [];

const defaultConfig = {
  store_name: "Home Health Education Service",
  tagline: "Your Literary Journey Starts Here",
  hero_title: "Discover Stories That Move You",
  hero_subtitle: "Explore our curated collection of bestsellers, hidden gems, and timeless classics. Find your next favorite read today.",
  cta_button: "Browse Collection",
  carousel_slide_1: "Summer Collection",
  carousel_slide_2: "New Arrivals",
  carousel_slide_3: "Member Exclusive",
  background_color: "#fffbeb",
  surface_color: "#ffffff",
  text_color: "#1e293b",
  primary_action_color: "#d97706",
  secondary_action_color: "#b45309",
  font_family: "Playfair Display",
  font_size: 16
};

// Render books
function renderBooks() {
  const grid = document.getElementById('books-grid');
  const t = translations[currentLanguage];
  grid.innerHTML = books.map((book, index) => `
    <div class="book-card animate-fade-in animate-delay-${index + 1}">
      <div class="book-shadow bg-white rounded-2xl overflow-hidden border border-slate-100">
        <div class="aspect-[3/4] bg-gradient-to-br ${book.gradient} flex items-center justify-center p-6">
          <h3 class="font-display text-white text-xl font-bold text-center">${book.title}</h3>
        </div>
        <div class="p-5">
          <p class="text-slate-500 text-sm mb-1">${book.author}</p>
          <div class="flex items-center gap-1 mb-3">
            <span class="text-amber-400">★</span>
            <span class="text-sm font-medium">${book.rating}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-slate-800">₹${book.price.toFixed(2)}</span>
            <button onclick="addToCart(${book.id})" class="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              ${t.add_to_cart}
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Cart functions
function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  const existingItem = cart.find(item => item.id === bookId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...book, quantity: 1 });
  }
  
  updateCartUI();
  const t = translations[currentLanguage];
  showToast(`"${book.title}" ${t.thanks.split('!')[0]}!`);
}

function removeFromCart(bookId) {
  cart = cart.filter(item => item.id !== bookId);
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (totalItems > 0) {
    countEl.textContent = totalItems;
    countEl.classList.remove('hidden');
  } else {
    countEl.classList.add('hidden');
  }

  const cartItemsEl = document.getElementById('cart-items');
  const t = translations[currentLanguage];
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="text-slate-500 text-center py-12">${t.empty_cart}</p>`;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="flex gap-4 mb-4 pb-4 border-b border-slate-100">
        <div class="w-16 h-20 bg-gradient-to-br ${item.gradient} rounded-lg flex-shrink-0"></div>
        <div class="flex-1">
          <h4 class="font-semibold text-slate-800">${item.title}</h4>
          <p class="text-sm text-slate-500">${item.author}</p>
          <div class="flex items-center justify-between mt-2">
            <span class="font-bold text-amber-700">₹${(item.price * item.quantity).toFixed(2)}</span>
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-500">Qty: ${item.quantity}</span>
              <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-600 text-sm">${t.remove}</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('cart-total').textContent = `₹${total.toFixed(2)}`;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3000);
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
  });
}

// Cart modal
document.getElementById('cart-btn').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.remove('hidden');
});

document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.add('hidden');
});

document.getElementById('cart-overlay').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.add('hidden');
});

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length > 0) {
    const t = translations[currentLanguage];
    showToast(t.demo_checkout);
    cart = [];
    updateCartUI();
    document.getElementById('cart-modal').classList.add('hidden');
  }
});

// Newsletter form
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('newsletter-message').classList.remove('hidden');
  e.target.reset();
});

// Element SDK
async function onConfigChange(config) {
  const c = { ...defaultConfig, ...config };
  
  document.getElementById('nav-store-name').textContent = c.store_name;
  document.getElementById('footer-store-name').textContent = c.store_name;
  document.getElementById('tagline').textContent = c.tagline;
  document.getElementById('hero-title').textContent = c.hero_title;
  document.getElementById('hero-subtitle').textContent = c.hero_subtitle;
  document.getElementById('cta-btn').textContent = c.cta_button;
  document.getElementById('slide-1-title').textContent = c.carousel_slide_1;
  document.getElementById('slide-2-title').textContent = c.carousel_slide_2;
  document.getElementById('slide-3-title').textContent = c.carousel_slide_3;

  // Apply colors
  document.body.style.backgroundColor = c.background_color;
  document.querySelectorAll('.bg-white').forEach(el => el.style.backgroundColor = c.surface_color);
  
  // Apply fonts
  const fontStack = `${c.font_family}, Georgia, serif`;
  document.querySelectorAll('.font-display').forEach(el => el.style.fontFamily = fontStack);
  
  // Apply font size scaling
  document.body.style.fontSize = `${c.font_size}px`;
}

function mapToCapabilities(config) {
  const c = { ...defaultConfig, ...config };
  return {
    recolorables: [
      {
        get: () => c.background_color,
        set: (value) => { c.background_color = value; window.elementSdk.setConfig({ background_color: value }); }
      },
      {
        get: () => c.surface_color,
        set: (value) => { c.surface_color = value; window.elementSdk.setConfig({ surface_color: value }); }
      },
      {
        get: () => c.text_color,
        set: (value) => { c.text_color = value; window.elementSdk.setConfig({ text_color: value }); }
      },
      {
        get: () => c.primary_action_color,
        set: (value) => { c.primary_action_color = value; window.elementSdk.setConfig({ primary_action_color: value }); }
      },
      {
        get: () => c.secondary_action_color,
        set: (value) => { c.secondary_action_color = value; window.elementSdk.setConfig({ secondary_action_color: value }); }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => c.font_family,
      set: (value) => { c.font_family = value; window.elementSdk.setConfig({ font_family: value }); }
    },
    fontSizeable: {
      get: () => c.font_size,
      set: (value) => { c.font_size = value; window.elementSdk.setConfig({ font_size: value }); }
    }
  };
}

function mapToEditPanelValues(config) {
  const c = { ...defaultConfig, ...config };
  return new Map([
    ["store_name", c.store_name],
    ["tagline", c.tagline],
    ["carousel_slide_1", c.carousel_slide_1],
    ["carousel_slide_2", c.carousel_slide_2],
    ["carousel_slide_3", c.carousel_slide_3],
    ["hero_title", c.hero_title],
    ["hero_subtitle", c.hero_subtitle],
    ["cta_button", c.cta_button]
  ]);
}

// Initialize
renderBooks();

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}
