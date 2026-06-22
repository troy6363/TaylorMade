// Taylor Made Accessories - Custom Logic Layer

// Global State
let cart = [];
let activeCategory = "all";
let activeView = "home";
let currentProductDetailId = null;
let detailsSlideshowTimer = null;

// GoHighLevel Webhook URL — set via Netlify environment variable GHL_WEBHOOK_URL, dispatched server-side
const GHL_WEBHOOK_URL = "";

// Initialize app when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Load cart from localStorage
  const storedCart = localStorage.getItem("taylor_made_cart");
  if (storedCart) {
    try {
      cart = JSON.parse(storedCart);
      updateCartUI();
    } catch (e) {
      console.error("Failed to parse stored cart", e);
      cart = [];
    }
  }

  // Setup UI components
  initHeroCarousel();
  renderHomeBestsellers();
  renderShopProducts();

  // Bind event listeners
  setupNavigation();
  setupCartDrawer();
  setupSearchOverlay();
  setupCheckoutFlow();

  // Default view routing based on URL path
  const pathname = window.location.pathname.replace(/^\//, '');
  if (pathname.startsWith("product-")) {
    const productId = pathname.replace("product-", "");
    openProductDetails(productId, true);
  } else if (["home", "shop", "about", "contact", "terms", "privacy", "faq", "thanks"].includes(pathname)) {
    navigateToView(pathname, true);
  } else {
    navigateToView("home", true);
  }

  // Handle browser back/forward via popstate
  window.addEventListener("popstate", (e) => {
    const view = (e.state && e.state.view) ? e.state.view : 'home';
    const prodId = (e.state && e.state.productId) ? e.state.productId : null;

    if (view === "product-detail" && prodId) {
      openProductDetails(prodId, true);
    } else {
      navigateToView(view, true);
    }
  });

  // Update footer copyright year dynamically
  const footerYear = document.getElementById("footerYear");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Prevent href="#" from scrolling the page — all navigation is handled by onclick/pushState
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#"]');
    if (link) e.preventDefault();
  });

  // Glass header on scroll
  const mainHeader = document.querySelector(".main-header");
  if (mainHeader) {
    window.addEventListener("scroll", () => {
      mainHeader.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });
  }

  setupPhoneFormatting();
});

// ==========================================================================
// SPA ROUTER
// ==========================================================================

function navigateToView(viewId, replace = false, productId = null) {
  activeView = viewId;

  // Clear details slideshow timer immediately when leaving product details view
  if (viewId !== "product-detail" && detailsSlideshowTimer) {
    clearInterval(detailsSlideshowTimer);
    detailsSlideshowTimer = null;
  }

  // Hide all views
  const views = document.querySelectorAll(".content-view");
  views.forEach(view => view.classList.remove("active"));

  // Show selected view
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.classList.add("active");
  }

  if (viewId === "thanks") {
    renderThanksRecap();
  }

  // Update URL path
  let path = '/';
  if (viewId === 'product-detail' && productId) {
    path = `/product-${productId}`;
  } else if (viewId !== 'home') {
    path = `/${viewId}`;
  }

  if (window.location.pathname !== path) {
    if (replace) {
      history.replaceState({ view: viewId, productId: productId }, '', path);
    } else {
      history.pushState({ view: viewId, productId: productId }, '', path);
    }
  }

  // Update navigation active states
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .footer-nav-link");
  navLinks.forEach(link => {
    const linkTarget = link.getAttribute("data-target");
    if (linkTarget === viewId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Scroll to top (disable smooth scroll on mobile to prevent Safari rendering/reflow crashes)
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Close mobile navigation drawer if open
  closeMobileNav();
}

function renderThanksRecap() {
  const recapContainer = document.getElementById("thanksOrderRecap");
  if (!recapContainer) return;

  // Try to read from localStorage (first landing)
  let orderDataStr = localStorage.getItem("taylor_made_pending_order");
  let fromPending = true;

  // Fall back to sessionStorage if they refreshed the page
  if (!orderDataStr) {
    orderDataStr = sessionStorage.getItem("taylor_made_last_order");
    fromPending = false;
  }

  if (!orderDataStr) {
    recapContainer.style.display = "none";
    return;
  }

  try {
    const order = JSON.parse(orderDataStr);
    
    // Save to sessionStorage for persistency across refreshes
    if (fromPending) {
      sessionStorage.setItem("taylor_made_last_order", orderDataStr);
      // Clear cart & pending order from localStorage immediately
      localStorage.removeItem("taylor_made_pending_order");
      cart = [];
      saveCart();
      updateCartUI();
    }

    // Build the recap HTML
    let itemsHtml = "";
    order.items.forEach(item => {
      itemsHtml += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px dashed var(--border); font-size: 13px;">
          <div>
            <span style="font-weight: 700; color: var(--foreground);">${item.name}</span>
            ${item.size ? `<span style="font-size: 10px; color: var(--primary); font-weight: 600; margin-left: 0.5rem;">Size: ${item.size}</span>` : ""}
          </div>
          <span style="font-weight: 500; color: var(--muted-foreground);">Qty: ${item.quantity} &nbsp;&bull;&nbsp; $${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `;
    });

    const isPickup = order.deliveryMethod === "pickup";
    const deliveryLabel = isPickup ? "Local Pickup (Memphis, TN)" : `Shipping (${order.shippingCarrier})`;

    recapContainer.innerHTML = `
      <h3 style="font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; margin-top: 0; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; color: var(--primary);">Order Details</h3>
      <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 0.75rem;">
        <span style="color: var(--muted-foreground); font-weight: 500;">Order Reference:</span>
        <strong style="color: var(--foreground); font-weight: 700;">${order.orderId}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 0.75rem;">
        <span style="color: var(--muted-foreground); font-weight: 500;">Delivery Method:</span>
        <span style="color: var(--foreground); font-weight: 600;">${deliveryLabel}</span>
      </div>
      
      <div style="margin: 1rem 0; border-top: 1px solid var(--border); padding-top: 0.5rem;">
        ${itemsHtml}
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 0.5rem; margin-top: 1rem;">
        <span style="color: var(--muted-foreground); font-weight: 500;">Subtotal:</span>
        <span style="color: var(--foreground); font-weight: 600;">$${order.subtotal.toFixed(2)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 0.5rem;">
        <span style="color: var(--muted-foreground); font-weight: 500;">Shipping Cost:</span>
        <span style="color: var(--foreground); font-weight: 600;">${order.shippingCost > 0 ? `$${order.shippingCost.toFixed(2)}` : "FREE"}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: 700; border-top: 1px solid var(--border); padding-top: 0.75rem; margin-top: 0.75rem; color: var(--foreground);">
        <span>Total Paid:</span>
        <span style="color: var(--primary);">$${order.grandTotal.toFixed(2)}</span>
      </div>
    `;

    recapContainer.style.display = "block";
  } catch (e) {
    console.error("Failed to render thanks order recap", e);
    recapContainer.style.display = "none";
  }
}

function setupNavigation() {
  // Navigation links click
  const links = document.querySelectorAll(".nav-link, .mobile-nav-link, #logoHomeLink, .footer-nav-link");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      // Check if it's a normal left click without modifier keys (so users can still Ctrl+Click to open in new tab!)
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      e.preventDefault();
      const target = link.getAttribute("data-target") || "home";
      const cat = link.getAttribute("data-category");

      if (target === "shop" && cat) {
        selectShopCategory(cat);
      } else {
        navigateToView(target);
      }
    });
  });

  // Mobile drawer controls
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const closeDrawer = document.getElementById("closeMobileDrawerBtn");
  const overlay = document.getElementById("mobileMenuOverlay");

  if (mobileToggle) mobileToggle.addEventListener("click", openMobileNav);
  if (closeDrawer) closeDrawer.addEventListener("click", closeMobileNav);
  if (overlay) overlay.addEventListener("click", closeMobileNav);
}

function openMobileNav() {
  document.getElementById("mobileNavDrawer").classList.add("open");
  document.getElementById("mobileMenuOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMobileNav() {
  document.getElementById("mobileNavDrawer").classList.remove("open");
  document.getElementById("mobileMenuOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ==========================================================================
// DYNAMIC VIEW GENERATORS
// ==========================================================================

// Render best sellers on homepage
function renderHomeBestsellers() {
  const grid = document.getElementById("homeBestsellersGrid");
  if (!grid) return;

  grid.innerHTML = "";

  // Best sellers: pick 6 representative products across all categories
  const list = PRODUCTS.filter(p => ["p1", "p6", "p9", "p18", "p21", "p23"].includes(p.id));

  list.forEach(p => {
    const item = document.createElement("a");
    item.href = "#";
    item.className = "bestseller-item-card group";
    item.addEventListener("click", (e) => {
      e.preventDefault();
      openProductDetails(p.id);
    });

    item.innerHTML = `
      <div class="bestseller-img-wrap">
        <img src="${p.image}" alt="${p.name}" class="${p.category === 'pajamas' || ['p1', 'p18', 'p24', 'p26', 'p27', 'p28', 'p30', 'p38', 'p40'].includes(p.id) ? 'object-contain' : ''}">
      </div>
      <h3 class="bestseller-title">${p.name}</h3>
      <p class="bestseller-price">$${p.price.toFixed(2)}</p>
    `;
    grid.appendChild(item);
  });
}

// Render shop catalog list
function renderShopProducts(filterCategory = "all", query = "") {
  const grid = document.getElementById("shopCatalogGrid");
  const resultsCount = document.getElementById("shopResultsCount");
  if (!grid) return;

  grid.innerHTML = "";

  let list = [...PRODUCTS];

  // Category filter
  if (filterCategory !== "all") {
    list = list.filter(p => p.category === filterCategory);
  }

  // Search keyword filter
  if (query.trim() !== "") {
    const search = query.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search)
    );
  }

  // Update count
  if (resultsCount) {
    resultsCount.textContent = `${list.length} result${list.length !== 1 ? 's' : ''}`;
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--muted-foreground);">
        No products found in this category.
      </div>
    `;
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "catalog-product-card";

    card.innerHTML = `
      <div class="catalog-img-wrap" onclick="openProductDetails('${p.id}')">
        <img src="${p.image}" alt="${p.name}" class="catalog-img ${p.category === 'pajamas' || ['p1', 'p13', 'p14', 'p18', 'p24', 'p26', 'p27', 'p28', 'p30', 'p38', 'p40'].includes(p.id) ? 'object-contain' : ''}">
        <div class="catalog-hover-overlay">
          <button class="catalog-view-btn">View Details</button>
        </div>
      </div>
      <div class="catalog-info-box">
        <div class="catalog-stars-row">
          ${[1, 2, 3, 4, 5].map(() => `<i data-lucide="star" class="star-icon"></i>`).join('')}
        </div>
        <h3 class="catalog-title" onclick="openProductDetails('${p.id}')">${p.name}</h3>
        <p class="catalog-desc-short">${p.description}</p>
        <span class="catalog-price">$${p.price.toFixed(2)}</span>
      </div>
    `;
    grid.appendChild(card);
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons({
      root: grid
    });
  }
}

// Programmatic category click
function selectShopCategory(catId) {
  activeCategory = catId;

  // Update active sidebar styles
  const buttons = document.querySelectorAll(".side-cat-btn");
  buttons.forEach(btn => {
    if (btn.getAttribute("data-category") === catId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Update header text
  const title = document.getElementById("shopCategoryTitle");
  if (title) {
    // Map ID to label
    const labels = {
      all: "All Products",
      jewelry: "Jewelry",
      blankets: "Blankets",
      tshirts: "T-Shirts",
      coasters: "Coasters",
      pajamas: "Pajamas",
      socks: "Socks",
      bags: "Bags",
      accessories: "Accessories"
    };
    title.textContent = labels[catId] || "Products";
  }

  renderShopProducts(catId);
  navigateToView("shop");
}

// Programmatic category click from homepage cards
function filterByCategory(categoryName) {
  selectShopCategory(categoryName);
}

// ==========================================================================
// SEARCH TRIGGER OVERLAY
// ==========================================================================

function setupSearchOverlay() {
  const searchToggle = document.getElementById("searchToggleBtn");
  const closeSearch = document.getElementById("closeSearchBtn");
  const overlay = document.getElementById("searchOverlayBar");
  const searchInput = document.getElementById("searchInput");

  if (searchToggle && overlay && searchInput) {
    searchToggle.addEventListener("click", () => {
      overlay.classList.add("open");
      searchInput.focus();
    });
  }

  if (closeSearch && overlay) {
    closeSearch.addEventListener("click", () => {
      overlay.classList.remove("open");
      searchInput.value = "";
      renderShopProducts(activeCategory, "");
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value;
      renderShopProducts(activeCategory, val);
      if (activeView !== "shop" && val.trim() !== "") {
        navigateToView("shop");
      }
    });
  }
}

// ==========================================================================
// DEDICATED PRODUCT DETAILS PAGE
// ==========================================================================

function openProductDetails(productId, replace = false) {
  if (currentProductDetailId === productId && activeView === "product-detail") {
    return;
  }
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  if (detailsSlideshowTimer) {
    clearInterval(detailsSlideshowTimer);
    detailsSlideshowTimer = null;
  }

  currentProductDetailId = productId;
  const contentPanel = document.getElementById("productDetailsContent");
  if (!contentPanel) return;

  // Generate thumbnail buttons HTML
  let thumbsHTML = "";
  if (product.images && product.images.length > 0) {
    product.images.forEach((imgSrc, idx) => {
      thumbsHTML += `
        <button type="button" class="thumb-btn ${idx === 0 ? 'selected' : ''}" onclick="swapDetailsImage(this, '${imgSrc}')">
          <img src="${imgSrc}" alt="${product.name} view ${idx + 1}">
        </button>
      `;
    });
  }

  // Check if product supports sizes (clothing categories: tshirts, pajamas - excluding accessories like Celtics set p16)
  let sizeSelectorHTML = "";
  const isClothing = ["tshirts", "pajamas"].includes(product.category) && product.id !== "p16";
  if (isClothing) {
    sizeSelectorHTML = `
      <div class="details-size-selection" style="margin-top: 1.5rem; margin-bottom: 1rem;">
        <label for="productSizeSelect" style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: var(--foreground); font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Select Size</label>
        <select id="productSizeSelect" onchange="updateProductDetailPrice('${product.id}')" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 0.375rem; background-color: var(--background); color: var(--foreground); font-family: inherit; font-size: 0.95rem; cursor: pointer; transition: border-color 0.2s;">
          <option value="S">Small (S)</option>
          <option value="M">Medium (M)</option>
          <option value="L">Large (L)</option>
          <option value="XL">X-Large (XL)</option>
          <option value="2XL">2X-Large (2XL) (+$20.00)</option>
          <option value="3XL">3X-Large (3XL) (+$20.00)</option>
        </select>
      </div>
    `;
  }

  // Check if product supports team selection
  const NFL_TEAMS = [
    "Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills",
    "Carolina Panthers", "Chicago Bears", "Cincinnati Bengals", "Cleveland Browns",
    "Dallas Cowboys", "Denver Broncos", "Detroit Lions", "Green Bay Packers",
    "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Kansas City Chiefs",
    "Las Vegas Raiders", "Los Angeles Chargers", "Los Angeles Rams", "Miami Dolphins",
    "Minnesota Vikings", "New England Patriots", "New Orleans Saints", "New York Giants",
    "New York Jets", "Philadelphia Eagles", "Pittsburgh Steelers", "San Francisco 49ers",
    "Seattle Seahawks", "Tampa Bay Buccaneers", "Tennessee Titans", "Washington Commanders"
  ];

  let teamSelectorHTML = "";
  if (product.teamOptions) {
    const teamOptionsHTML = NFL_TEAMS.map(t => `<option value="${t}">${t}</option>`).join('');
    teamSelectorHTML = `
      <div class="details-team-selection">
        <label for="productTeamSelect" class="details-option-label">Select NFL Team</label>
        <select id="productTeamSelect" class="details-team-select">
          <option value="" disabled selected>— Choose your team —</option>
          ${teamOptionsHTML}
        </select>
      </div>
    `;
  }

  contentPanel.innerHTML = `
    <!-- Product Images -->
    <div class="details-images-panel">
      <div class="details-main-img-wrap" style="position: relative; overflow: hidden;">
        <img src="${product.image}" alt="${product.name}" id="detailsMainImg" style="transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;">
      </div>
    </div>

    <!-- Product Metadata -->
    <div class="details-info-panel">
      <h1 class="details-title">${product.name}</h1>
      
      <div class="details-stars-block">
        <div class="details-stars-list">
          ${[1, 2, 3, 4, 5].map(() => `<i data-lucide="star" class="star-icon"></i>`).join('')}
        </div>
        <span class="details-reviews-count">(${product.reviewsCount} reviews)</span>
      </div>

      <div class="details-price" id="detailsProductPrice">$${product.price.toFixed(2)}</div>
      
      <!-- Product thumbnails placed above description -->
      <div class="details-thumbnails-row" style="margin-bottom: 1.5rem;">
        ${thumbsHTML}
      </div>
      
      <p class="details-desc-paragraph">${product.description}</p>
      
      ${teamSelectorHTML}
      ${sizeSelectorHTML}
      
      <button class="details-add-cart-btn" onclick="addActiveProductToCart()">
        <i data-lucide="shopping-bag" style="width: 18px; height: 18px;"></i>
        <span>Add to Cart</span>
      </button>
    </div>
  `;

  // Navigate to view (this will handle updating URL to /product-productId)
  navigateToView("product-detail", replace, productId);

  // Dynamic Image slideshow loop (every 5 seconds)
  if (product.images && product.images.length > 1) {
    let currentSlideIdx = 0;

    detailsSlideshowTimer = setInterval(() => {
      const detailView = document.getElementById("view-product-detail");
      if (currentProductDetailId !== product.id || !detailView || !detailView.classList.contains("active")) {
        clearInterval(detailsSlideshowTimer);
        detailsSlideshowTimer = null;
        return;
      }

      currentSlideIdx = (currentSlideIdx + 1) % product.images.length;

      const currentMainImg = document.getElementById("detailsMainImg");
      const currentThumbButtons = document.querySelectorAll(".thumb-btn");

      if (currentMainImg) {
        currentMainImg.style.opacity = "0";
        currentMainImg.style.transform = "translateX(15px)";

        setTimeout(() => {
          const freshMainImg = document.getElementById("detailsMainImg");
          if (!freshMainImg) return;

          freshMainImg.src = product.images[currentSlideIdx];
          freshMainImg.style.transform = "translateX(-15px)";

          freshMainImg.offsetWidth;

          freshMainImg.style.opacity = "1";
          freshMainImg.style.transform = "translateX(0)";

          if (currentThumbButtons.length > currentSlideIdx) {
            currentThumbButtons.forEach(btn => btn.classList.remove("selected"));
            currentThumbButtons[currentSlideIdx].classList.add("selected");
          }
        }, 500);
      }
    }, 5000);
  }

  // Call price update immediately to set correct starting price
  if (isClothing) {
    updateProductDetailPrice(productId);
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons({
      root: contentPanel
    });
  }
}

// Update detail price based on size
function updateProductDetailPrice(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const select = document.getElementById("productSizeSelect");
  const priceDisplay = document.getElementById("detailsProductPrice");
  if (!select || !priceDisplay) return;

  const size = select.value;
  let price = product.price;

  // Add $20 surcharge for 2XL and 3XL sizes on clothing items
  const isClothing = ["tshirts", "pajamas"].includes(product.category) && product.id !== "p16";
  if (isClothing && (size === "2XL" || size === "3XL")) {
    price += 20.00;
  }

  priceDisplay.textContent = `$${price.toFixed(2)}`;
}

// Swap active image from thumbnail click
function swapDetailsImage(btn, imgSrc) {
  // Clear details slideshow timer if user manually interacts
  if (detailsSlideshowTimer) {
    clearInterval(detailsSlideshowTimer);
    detailsSlideshowTimer = null;
  }

  const main = document.getElementById("detailsMainImg");
  if (main) {
    main.src = imgSrc;
  }

  // Highlight border
  const thumbs = document.querySelectorAll(".thumb-btn");
  thumbs.forEach(t => t.classList.remove("selected"));
  btn.classList.add("selected");
}

// Add cart trigger from active details page
function addActiveProductToCart() {
  if (currentProductDetailId) {
    const sizeSelect = document.getElementById("productSizeSelect");
    const teamSelect = document.getElementById("productTeamSelect");
    const size = sizeSelect ? sizeSelect.value : null;
    const team = teamSelect ? teamSelect.value : null;

    // Validate team required
    if (teamSelect && !team) {
      teamSelect.style.borderColor = "#c0392b";
      teamSelect.focus();
      return;
    }

    addToCart(currentProductDetailId, 1, size, team);
  }
}

// ==========================================================================
// CART BASKET STATE MANAGEMENT
// ==========================================================================

function setupCartDrawer() {
  const toggle = document.getElementById("cartToggleBtn");
  const closeBtn = document.getElementById("closeCartDrawerBtn");
  const overlay = document.getElementById("cartOverlay");
  const checkoutBtn = document.getElementById("cartCheckoutBtn");

  if (toggle) toggle.addEventListener("click", openCart);
  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (overlay) overlay.addEventListener("click", closeCart);

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      closeCart();
      openCheckoutModal();
    });
  }
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function closeCartAndShop() {
  closeCart();
  navigateToView("shop");
}

function addToCart(productId, quantity = 1, size = null, team = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Determine item price based on product and selected size
  let price = product.price;
  const isClothing = ["tshirts", "pajamas"].includes(product.category) && product.id !== "p16";
  if (isClothing && (size === "2XL" || size === "3XL")) {
    price += 20.00;
  }

  // Check if item with same ID, size, and team is already in cart
  const index = cart.findIndex(item =>
    item.product.id === productId && item.size === size && item.team === team
  );
  if (index > -1) {
    cart[index].quantity += quantity;
  } else {
    const cartProduct = { ...product, price };
    cart.push({ product: cartProduct, quantity, size, team });
  }

  saveCart();
  updateCartUI();
  openCart();
}

function updateCartQty(index, qty) {
  if (qty <= 0) {
    removeFromCart(index);
    return;
  }
  cart[index].quantity = qty;
  saveCart();
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("taylor_made_cart", JSON.stringify(cart));
}

// Clear cart utility function if needed
function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

function getCartCount() {
  return cart.reduce((tot, item) => tot + item.quantity, 0);
}

function getCartSubtotal() {
  return cart.reduce((tot, item) => tot + (item.product.price * item.quantity), 0);
}

function updateCartUI() {
  const badge = document.getElementById("cartCountBadge");
  const itemsContainer = document.getElementById("cartDrawerItems");
  const emptyView = document.getElementById("cartEmptyView");
  const footer = document.getElementById("cartDrawerFooter");
  const subtotalDisplay = document.getElementById("cartDrawerSubtotal");

  const count = getCartCount();
  if (badge) {
    badge.textContent = count;
    badge.style.display = count === 0 ? "none" : "flex";
  }

  if (!itemsContainer) return;
  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyView.style.display = "flex";
    footer.style.display = "none";
  } else {
    emptyView.style.display = "none";
    footer.style.display = "block";

    cart.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "drawer-item-row";
      const sizeTag = item.size ? `<span class="drawer-item-meta">Size: ${item.size}</span>` : '';
      const teamTag = item.team ? `<span class="drawer-item-meta">Team: ${item.team}</span>` : '';
      row.innerHTML = `
        <div class="drawer-item-img">
          <img src="${item.product.image}" alt="${item.product.name}">
        </div>
        <div class="drawer-item-info">
          <h4 class="drawer-item-title">${item.product.name}</h4>
          ${teamTag}
          ${sizeTag}
          <span class="drawer-item-price">$${item.product.price.toFixed(2)}</span>
          <div class="drawer-qty-row">
            <button class="drawer-qty-btn" onclick="updateCartQty(${index}, ${item.quantity - 1})">-</button>
            <span class="drawer-qty-val">${item.quantity}</span>
            <button class="drawer-qty-btn" onclick="updateCartQty(${index}, ${item.quantity + 1})">+</button>
          </div>
          <button class="drawer-item-remove-btn" onclick="removeFromCart(${index})" aria-label="Remove item">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      `;
      itemsContainer.appendChild(row);
    });

    const subtotal = getCartSubtotal();
    subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons({
      root: itemsContainer
    });
  }
}

// ==========================================================================
// CHECKOUT GATEWAY FLOW
// ==========================================================================

function setupCheckoutFlow() {
  const closeBtn = document.getElementById("closeCheckoutBtn");
  const backdrop = document.getElementById("checkoutBackdrop");

  if (closeBtn) closeBtn.addEventListener("click", () => closeModal("checkoutBackdrop"));
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal("checkoutBackdrop");
    });
  }
}

// ==========================================================================
// SHIPPING CALCULATIONS (USPS, UPS, FEDEX)
// ==========================================================================
// Estimates aggregate package weight and dimensions based on product category rules
function getCartShippingDetails() {
  let totalWeight = 0;
  let maxDimLength = 0;
  let maxDimWidth = 0;
  let maxDimHeight = 0;
  let totalVolume = 0;
  let totalItems = 0;

  cart.forEach(item => {
    let weight = 0.5; // default weight in lbs
    let dims = { l: 6, w: 6, h: 2 }; // default dimensions in inches

    const cat = (item.product.category || "").toLowerCase();
    const name = (item.product.name || "").toLowerCase();

    if (cat === "accessories") {
      if (name.includes("glass") || name.includes("plaque")) {
        weight = 1.5;
        dims = { l: 8, w: 10, h: 1 };
      } else if (name.includes("crossbody") || name.includes("bag")) {
        weight = 0.5;
        dims = { l: 6, w: 8, h: 2 };
      } else if (name.includes("scarf") || name.includes("beanie")) {
        weight = 0.8; // Knit scarf & beanie set
        dims = { l: 10, w: 8, h: 3 };
      } else {
        weight = 0.2;
        dims = { l: 4, w: 4, h: 1 };
      }
    } else if (cat === "blankets") {
      weight = 3.0;
      dims = { l: 12, w: 12, h: 6 };
    } else if (cat === "jewelry" || cat === "bracelets") {
      weight = 0.1;
      dims = { l: 3, w: 3, h: 1 };
    } else if (cat === "tshirts" || cat === "clothing") {
      weight = 0.8;
      dims = { l: 10, w: 8, h: 2 };
    }

    const qty = item.quantity;
    totalWeight += weight * qty;
    totalItems += qty;

    // Stack heights, keep max width and length
    maxDimLength = Math.max(maxDimLength, dims.l);
    maxDimWidth = Math.max(maxDimWidth, dims.w);
    maxDimHeight += dims.h * qty;
    totalVolume += (dims.l * dims.w * dims.h) * qty;
  });

  return {
    weight: parseFloat(totalWeight.toFixed(2)), // in lbs
    itemsCount: totalItems,
    volume: totalVolume, // cubic inches
    height: Math.min(maxDimHeight, 24),
    width: Math.max(maxDimWidth, 8),
    length: Math.max(maxDimLength, 10)
  };
}

// Calculates distance surcharge based on Customer Zip Code (Shipping origin: Memphis, TN - Zone 3)
function getDistanceSurcharge(zip) {
  if (!zip || typeof zip !== "string") return 1.50; // default standard zone surcharge

  const cleanZip = zip.trim();
  if (cleanZip.length === 0) return 1.50;

  const firstDigit = cleanZip.charAt(0);

  // Memphis, TN is in Zone 3 (zip starts with 3)
  if (firstDigit === '3') {
    // Local / Regional (TN, MS, AL, GA, FL, etc.)
    return 0.00;
  } else if (['4', '5', '6', '7'].includes(firstDigit)) {
    // Mid-Distance (Midwest, South Central)
    return 1.50;
  } else if (['0', '1', '2'].includes(firstDigit)) {
    // Long-Distance (East Coast, North East)
    return 2.50;
  } else if (['8', '9'].includes(firstDigit)) {
    // Very Long Distance (West Coast, Rockies, Northwest, HI, AK)
    return 4.00;
  }

  return 1.50; // Default standard zone surcharge
}

// Calculates dynamic shipping cost for USPS, UPS, or FedEx based on weight, size, and destination zip code
function getShippingRate(carrier) {
  if (selectedDeliveryMethod !== "shipping") return 0;

  // If the cart only contains the test item, shipping is free ($0.00)
  const isTestOnly = cart.length > 0 && cart.every(item => item.product.id === "ptest");
  if (isTestOnly) return 0;

  const pkg = getCartShippingDetails();
  const zipInput = document.getElementById("checkoutZip");
  const zipValue = zipInput ? zipInput.value : "";
  const distanceSurcharge = getDistanceSurcharge(zipValue);

  let rate = 0;

  // Compute a scaling volume surcharge
  // For every 300 cubic inches over 300, add a surcharge depending on carrier
  let volumeSurcharge = 0;
  if (pkg.volume > 300) {
    const extraVolume = pkg.volume - 300;
    const intervals = Math.floor(extraVolume / 300);
    if (intervals > 0) {
      if (carrier === "usps") {
        volumeSurcharge = intervals * 1.50;
      } else if (carrier === "ups") {
        volumeSurcharge = intervals * 2.50;
      } else if (carrier === "fedex") {
        volumeSurcharge = intervals * 3.50;
      }
    }
  }

  // Add a heavy package surcharge if total weight is over 5 lbs
  let weightSurcharge = 0;
  if (pkg.weight > 5) {
    if (carrier === "usps") {
      weightSurcharge = 3.00;
    } else if (carrier === "ups") {
      weightSurcharge = 5.00;
    } else if (carrier === "fedex") {
      weightSurcharge = 8.00;
    }
  }

  if (carrier === "usps") {
    // USPS Base rate: $4.99 + $1.25 per lb + distance surcharge + weight/volume surcharges
    rate = 4.99 + (pkg.weight * 1.25) + distanceSurcharge + weightSurcharge + volumeSurcharge;
  } else if (carrier === "ups") {
    // UPS Base rate: $7.99 + $1.75 per lb + scaled distance surcharge + weight/volume surcharges
    rate = 7.99 + (pkg.weight * 1.75) + (distanceSurcharge * 1.25) + weightSurcharge + volumeSurcharge;
  } else if (carrier === "fedex") {
    // FedEx Base rate: $11.99 + $2.25 per lb + scaled distance surcharge + weight/volume surcharges
    rate = 11.99 + (pkg.weight * 2.25) + (distanceSurcharge * 1.5) + weightSurcharge + volumeSurcharge;
  }

  return parseFloat(rate.toFixed(2));
}

// Triggered dynamically as the user types/updates their Zip Code in the checkout form
function updateShippingRatesOnZipChange() {
  if (selectedDeliveryMethod !== "shipping") return;

  const carrierSelect = document.getElementById("checkoutCarrier");
  if (carrierSelect) {
    const uspsRate = getShippingRate("usps");
    const upsRate = getShippingRate("ups");
    const fedexRate = getShippingRate("fedex");

    carrierSelect.options[0].textContent = `USPS (Fast & Affordable) - $${uspsRate.toFixed(2)}`;
    carrierSelect.options[1].textContent = `UPS (Reliable Ground) - $${upsRate.toFixed(2)}`;
    carrierSelect.options[2].textContent = `FedEx (Express) - $${fedexRate.toFixed(2)}`;
  }

  // Update currently displayed shipping totals
  updateCarrierSelection(selectedCarrier);
}

let selectedDeliveryMethod = "shipping";
let selectedCarrier = "usps"; // Default carrier

// Rebuilds the checkout order details list, dynamic shipping rates, and grand total in real-time
function refreshCheckoutInvoice() {
  const list = document.getElementById("checkoutInvoiceItems");
  const subDisplay = document.getElementById("checkoutSubtotal");
  const grandDisplay = document.getElementById("checkoutGrandTotal");

  if (!list || !subDisplay) return;

  // Load summary list
  list.innerHTML = "";
  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "checkout-item-row";
    row.style.cssText = "display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; position: relative;";

    const sizeText = item.size ? `<span style="font-size: 10px; color: var(--primary); font-weight: 600;">Size: ${item.size}</span>` : '';
    const teamText = item.team ? `<span style="font-size: 10px; color: var(--primary); font-weight: 600;">Team: ${item.team}</span>` : '';

    row.innerHTML = `
      <img src="${item.product.image}" style="width: 48px; height: 48px; border-radius: var(--radius-md); object-fit: cover; background-color: var(--muted);">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
        <span style="font-size: 11px; font-weight: 700; color: var(--foreground); line-height: 1.3;">${item.product.name}</span>
        ${teamText}
        ${sizeText}
        
        <!-- Qty controls inside checkout -->
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
          <button type="button" onclick="updateCheckoutQty(${index}, ${item.quantity - 1})" style="width: 20px; height: 20px; border: 1px solid var(--border); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; background: var(--background); cursor: pointer;">-</button>
          <span style="font-size: 11px; font-weight: 700; min-width: 12px; text-align: center;">${item.quantity}</span>
          <button type="button" onclick="updateCheckoutQty(${index}, ${item.quantity + 1})" style="width: 20px; height: 20px; border: 1px solid var(--border); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; background: var(--background); cursor: pointer;">+</button>
        </div>
      </div>
      <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
        <span style="font-size: 12px; font-weight: 600;">$${(item.product.price * item.quantity).toFixed(2)}</span>
        <button type="button" onclick="removeCheckoutItem(${index})" style="color: var(--muted-foreground); background: none; border: none; cursor: pointer; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 2px; transition: color 0.15s ease;" onmouseover="this.style.color='#c0392b'" onmouseout="this.style.color='var(--muted-foreground)'">
          Remove
        </button>
      </div>
    `;
    list.appendChild(row);
  });

  const subtotal = getCartSubtotal();
  subDisplay.textContent = `$${subtotal.toFixed(2)}`;

  // Calculate carrier rates dynamically and populate select options
  const carrierSelect = document.getElementById("checkoutCarrier");
  if (carrierSelect) {
    const uspsRate = getShippingRate("usps");
    const upsRate = getShippingRate("ups");
    const fedexRate = getShippingRate("fedex");

    carrierSelect.options[0].textContent = `USPS (Fast & Affordable) - $${uspsRate.toFixed(2)}`;
    carrierSelect.options[1].textContent = `UPS (Reliable Ground) - $${upsRate.toFixed(2)}`;
    carrierSelect.options[2].textContent = `FedEx (Express) - $${fedexRate.toFixed(2)}`;
  }

  // Re-calculate the delivery method totals
  updateDeliveryMethod(selectedDeliveryMethod);
}

// Adjust quantity of a product directly from the checkout modal
function updateCheckoutQty(index, qty) {
  if (qty <= 0) {
    removeCheckoutItem(index);
    return;
  }
  cart[index].quantity = qty;
  saveCart();
  updateCartUI();
  refreshCheckoutInvoice();
}

// Remove an item directly from the checkout modal
function removeCheckoutItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();

  if (cart.length === 0) {
    closeModal("checkoutBackdrop");
    alert("Your cart is empty!");
  } else {
    refreshCheckoutInvoice();
  }
}

function openCheckoutModal() {
  if (cart.length === 0) return;

  const backdrop = document.getElementById("checkoutBackdrop");
  if (!backdrop) return;

  // Reset checkout dialog screens
  document.getElementById("checkoutForm").style.display = "block";
  document.getElementById("checkoutSuccessPanel").classList.remove("active");
  document.getElementById("checkoutForm").reset();

  // Reset default selection states
  selectedDeliveryMethod = "shipping";
  selectedCarrier = "usps";

  const carrierSelect = document.getElementById("checkoutCarrier");
  if (carrierSelect) {
    carrierSelect.value = "usps";
  }

  const shippingRadio = document.querySelector('input[name="deliveryMethod"][value="shipping"]');
  if (shippingRadio) {
    shippingRadio.checked = true;
  }

  // Load summary list and calculate initial totals
  refreshCheckoutInvoice();

  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function updateDeliveryMethod(method) {
  selectedDeliveryMethod = method;
  const shippingFields = document.getElementById("shippingFieldsGroup");
  const pickupFields = document.getElementById("pickupFieldsGroup");
  const shippingDisplay = document.getElementById("checkoutShipping");
  const grandDisplay = document.getElementById("checkoutGrandTotal");

  const firstInput = document.getElementById("checkoutFirst");
  const lastInput = document.getElementById("checkoutLast");
  const addressInput = document.getElementById("checkoutAddress");
  const cityInput = document.getElementById("checkoutCity");
  const stateInput = document.getElementById("checkoutState");
  const zipInput = document.getElementById("checkoutZip");

  const pickupFirst = document.getElementById("pickupFirst");
  const pickupLast = document.getElementById("pickupLast");

  const subtotal = getCartSubtotal();

  if (method === "shipping") {
    if (shippingFields) shippingFields.style.display = "block";
    if (pickupFields) pickupFields.style.display = "none";

    // Make shipping fields required
    if (firstInput) firstInput.required = true;
    if (lastInput) lastInput.required = true;
    if (addressInput) addressInput.required = true;
    if (cityInput) cityInput.required = true;
    if (stateInput) stateInput.required = true;
    if (zipInput) zipInput.required = true;

    // Remove pickup required
    if (pickupFirst) pickupFirst.required = false;
    if (pickupLast) pickupLast.required = false;

    const carrierRate = getShippingRate(selectedCarrier);
    if (shippingDisplay) shippingDisplay.textContent = `$${carrierRate.toFixed(2)}`;
    if (grandDisplay) grandDisplay.textContent = `$${(subtotal + carrierRate).toFixed(2)}`;
  } else {
    if (shippingFields) shippingFields.style.display = "none";
    if (pickupFields) pickupFields.style.display = "block";

    // Remove shipping required
    if (firstInput) firstInput.required = false;
    if (lastInput) lastInput.required = false;
    if (addressInput) addressInput.required = false;
    if (cityInput) cityInput.required = false;
    if (stateInput) stateInput.required = false;
    if (zipInput) zipInput.required = false;

    // Make pickup fields required
    if (pickupFirst) pickupFirst.required = true;
    if (pickupLast) pickupLast.required = true;

    if (shippingDisplay) shippingDisplay.textContent = "FREE";
    if (grandDisplay) grandDisplay.textContent = `$${subtotal.toFixed(2)}`;
  }
}

function updateCarrierSelection(carrier) {
  selectedCarrier = carrier;
  const shippingDisplay = document.getElementById("checkoutShipping");
  const grandDisplay = document.getElementById("checkoutGrandTotal");
  const subtotal = getCartSubtotal();

  const rate = getShippingRate(carrier);
  if (shippingDisplay) shippingDisplay.textContent = `$${rate.toFixed(2)}`;
  if (grandDisplay) grandDisplay.textContent = `$${(subtotal + rate).toFixed(2)}`;
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const payBtn = document.getElementById("payNowBtn");
  const successPane = document.getElementById("checkoutSuccessPanel");
  const loadingPane = document.getElementById("checkoutLoadingPanel");
  const form = document.getElementById("checkoutForm");

  if (payBtn) {
    payBtn.disabled = true;
    payBtn.textContent = "Redirecting to secure payment...";
  }

  // Show the loader overlay
  if (loadingPane) {
    loadingPane.classList.add("active");
  }

  const subtotal = getCartSubtotal();
  const shippingCost = selectedDeliveryMethod === "shipping" ? getShippingRate(selectedCarrier) : 0;
  const finalTotal = subtotal + shippingCost;
  const orderId = `#TM-${Math.floor(100000 + Math.random() * 900000)}`;

  // Populate checkout complete state
  document.getElementById("receiptOrderId").textContent = orderId;
  document.getElementById("receiptGrandTotal").textContent = `$${finalTotal.toFixed(2)}`;

  const carrierDisplay = document.getElementById("receiptCarrier");
  if (carrierDisplay) {
    if (selectedDeliveryMethod === "shipping") {
      carrierDisplay.textContent = selectedCarrier.toUpperCase();
    } else {
      carrierDisplay.textContent = "Local Pickup (Memphis, TN)";
    }
  }

  const isPickup = selectedDeliveryMethod === "pickup";
  const orderPayload = {
    orderId: orderId,
    email: document.getElementById("checkoutEmail") ? document.getElementById("checkoutEmail").value : "",
    firstName: isPickup
      ? (document.getElementById("pickupFirst") ? document.getElementById("pickupFirst").value : "")
      : (document.getElementById("checkoutFirst") ? document.getElementById("checkoutFirst").value : ""),
    lastName: isPickup
      ? (document.getElementById("pickupLast") ? document.getElementById("pickupLast").value : "")
      : (document.getElementById("checkoutLast") ? document.getElementById("checkoutLast").value : ""),
    phone: document.getElementById("checkoutPhone") ? document.getElementById("checkoutPhone").value : "",
    deliveryMethod: selectedDeliveryMethod,
    shippingCarrier: selectedDeliveryMethod === "shipping" ? selectedCarrier.toUpperCase() : "None (Local Pickup)",
    shippingCost: shippingCost,
    subtotal: subtotal,
    grandTotal: finalTotal,
    shippingAddress: isPickup ? {} : {
      address: document.getElementById("checkoutAddress") ? document.getElementById("checkoutAddress").value : "",
      city: document.getElementById("checkoutCity") ? document.getElementById("checkoutCity").value : "",
      state: document.getElementById("checkoutState") ? document.getElementById("checkoutState").value : "",
      zip: document.getElementById("checkoutZip") ? document.getElementById("checkoutZip").value : ""
    },
    items: cart.map(item => ({
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      size: item.size || ""
    }))
  };

  // Log payload to developer console for easy offline testing
  console.log("🛒 checkout submit payload (for GHL Webhook):", orderPayload);

  // GoHighLevel Inbound Webhook Dispatch (one-way background webhook trigger)
  if (GHL_WEBHOOK_URL) {
    fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderPayload)
    })
      .then(response => {
        console.log("Successfully forwarded checkout to GoHighLevel:", response);
      })
      .catch(err => {
        console.error("GHL integration dispatch error:", err);
      });
  }

  // Synchronous redirect flow via Netlify Functions
  fetch("/.netlify/functions/create-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderPayload)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Netlify function returned status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.paymentUrl) {
        console.log("Redirecting customer to secure payment link:", data.paymentUrl);
        // Save pending order details in localStorage so we can display the recap on /thanks
        localStorage.setItem("taylor_made_pending_order", JSON.stringify(orderPayload));
        // Clean redirect immediately once Square link is generated
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("No paymentUrl returned from Netlify function");
      }
    })
    .catch(err => {
      console.warn("Netlify function check failed (expected in local dev/pre-deploy). Falling back to mock complete screen.", err);

      // Fallback: hide loader, show local complete page after delay (simulating successful redirect)
      setTimeout(() => {
        if (loadingPane) {
          loadingPane.classList.remove("active");
        }
        // Save pending order details in localStorage so we can display the recap on /thanks
        localStorage.setItem("taylor_made_pending_order", JSON.stringify(orderPayload));
        
        // Close modal
        closeModal("checkoutBackdrop");

        // Navigate to thanks view
        navigateToView("thanks");

        if (payBtn) {
          payBtn.disabled = false;
          payBtn.textContent = "Proceed to Payment";
        }
      }, 1500);
    });
}

function finishCheckoutFlow() {
  closeModal("checkoutBackdrop");
  navigateToView("home");
}

// ==========================================================================
// FORM UTILS
// ==========================================================================

function handleContactSubmit(e) {
  e.preventDefault();

  const submit = document.getElementById("contactSubmitBtn");
  const successScreen = document.getElementById("contactSuccessScreen");
  const form = document.getElementById("contactForm");

  if (submit) {
    submit.disabled = true;
    submit.textContent = "Submitting...";
  }

  const formData = new FormData(form);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
    .then(res => {
      console.log("Netlify contact form submission success:", res);
    })
    .catch(err => {
      console.error("Netlify contact form submission error:", err);
    })
    .finally(() => {
      form.reset();
      successScreen.classList.add("active");
      if (submit) {
        submit.disabled = false;
        submit.textContent = "Submit";
      }
    });
}

function resetContactForm() {
  document.getElementById("contactSuccessScreen").classList.remove("active");
}

function handleCustomOrderSubmit(e) {
  e.preventDefault();

  const submit = document.getElementById("customSubmitBtn");
  const successScreen = document.getElementById("customOrderSuccessScreen");
  const form = document.getElementById("customOrderForm");

  if (submit) {
    submit.disabled = true;
    submit.textContent = "Submitting Request...";
  }

  const payload = {
    name: document.getElementById("customName") ? document.getElementById("customName").value : "",
    email: document.getElementById("customEmail") ? document.getElementById("customEmail").value : "",
    phone: document.getElementById("customPhone") ? document.getElementById("customPhone").value : "",
    category: document.getElementById("customCategory") ? document.getElementById("customCategory").value : "",
    description: document.getElementById("customDesc") ? document.getElementById("customDesc").value : ""
  };

  console.log("🎨 Custom order request submitted payload:", payload);

  // Forward custom order request to GoHighLevel via Netlify function (server-side webhook dispatch)
  const ghlPromise = fetch("/.netlify/functions/submit-custom-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(res => console.log("GHL custom order forward success:", res))
    .catch(err => console.error("GHL custom order forward error:", err));

  // Submit to Netlify forms
  const formData = new FormData(form);
  const netlifyPromise = fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
    .then(res => console.log("Netlify custom order submission success:", res))
    .catch(err => console.error("Netlify custom order submission error:", err));

  Promise.allSettled([ghlPromise, netlifyPromise]).then(() => {
    form.reset();
    successScreen.classList.add("active");
    if (submit) {
      submit.disabled = false;
      submit.textContent = "Send Custom Request";
    }
  });
}

function resetCustomOrderForm() {
  document.getElementById("customOrderSuccessScreen").classList.remove("active");
}

// Initialize Hero Background Slideshow Carousel
function initHeroCarousel() {
  const container = document.getElementById("heroCarousel");
  if (!container) return;

  const isMobile = window.innerWidth <= 768;

  const heroImages = isMobile ? [
    "assets/hero moblie/hero_table_display_mobile_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 05_47_40 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 06_02_59 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 07_13_52 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 07_18_20 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 07_28_52 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 07_29_40 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 07_35_31 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 07_37_06 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 07_41_01 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 07_47_54 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 07_52_00 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 09_16_07 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 09_16_38 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 09_17_42 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 09_25_24 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 09_29_08 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 09_44_43 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 09_50_31 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 09_52_54 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 09_56_57 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 10_01_03 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 10_02_04 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 10_04_25 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 10_07_44 PM_result.webp",
    "assets/hero moblie/ChatGPT Image Jun 8, 2026, 10_10_05 PM_result.webp",
    "assets/hero moblie/dst_elephant_worn_result.webp"
  ] : [
    "assets/hero desktop/hero_table_display_desktop_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 05_47_40 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 05_49_52 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 06_02_59 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 07_13_52 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 07_18_20 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 07_28_52 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 07_29_40 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 07_35_31 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 07_37_06 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 07_41_01 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 07_47_54 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 07_52_00 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_16_07 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_16_38 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_17_42 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_24_17 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_25_24 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_26_22 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_29_08 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_42_40 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_44_43 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_50_31 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_52_54 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 09_56_57 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 10_01_03 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 10_02_04 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 10_03_01 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 10_04_25 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 10_07_44 PM_result.webp",
    "assets/hero desktop/ChatGPT Image Jun 8, 2026, 10_10_05 PM_result.webp",
    "assets/hero desktop/dst_elephant_worn_result.webp"
  ];

  // Randomize all images except the first one (so we always start with the table display)
  if (heroImages.length > 1) {
    const firstImg = heroImages[0];
    const restImgs = heroImages.slice(1);
    for (let i = restImgs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [restImgs[i], restImgs[j]] = [restImgs[j], restImgs[i]];
    }
    heroImages.splice(0, heroImages.length, firstImg, ...restImgs);
  }

  let slideIndex = 0;

  // Create exactly two image elements for recycling
  const img1 = document.createElement("img");
  img1.className = "hero-carousel-img active";
  img1.src = heroImages[0];
  img1.alt = "Taylor Made Background Slide";
  container.appendChild(img1);

  if (heroImages.length <= 1) return;

  const img2 = document.createElement("img");
  img2.className = "hero-carousel-img";
  // Pre-load the second image so the first transition is immediate and cached
  img2.src = heroImages[1] || "";
  img2.alt = "Taylor Made Background Slide";
  container.appendChild(img2);

  let currentImgEl = img1;
  let nextImgEl = img2;

  // Cross-fade every 4.5 seconds, skipping any slides that failed to load
  setInterval(() => {
    // Only run if the user is on the homepage to save mobile memory/CPU/battery
    if (activeView !== "home") return;

    slideIndex = (slideIndex + 1) % heroImages.length;
    const nextSrc = heroImages[slideIndex];

    nextImgEl.onload = () => {
      nextImgEl.classList.add("active");
      currentImgEl.classList.remove("active");

      // Swap element roles
      const temp = currentImgEl;
      currentImgEl = nextImgEl;
      nextImgEl = temp;
    };
    nextImgEl.onerror = () => {
      console.warn("Hero image failed to load: " + nextSrc);
    };
    nextImgEl.src = nextSrc;
  }, 4500);
}

// Interactive FAQ Toggle Accordion helper
function toggleFaqItem(button) {
  const item = button.parentElement;
  if (item) {
    item.classList.toggle("open");
  }
}

// Phone number auto-formatting to XXX-XXX-XXXX format
function setupPhoneFormatting() {
  const customPhone = document.getElementById("customPhone");
  if (customPhone) {
    customPhone.addEventListener("input", (e) => {
      e.target.value = formatPhoneNumber(e.target.value);
    });
  }

  const checkoutPhone = document.getElementById("checkoutPhone");
  if (checkoutPhone) {
    checkoutPhone.addEventListener("input", (e) => {
      e.target.value = formatPhoneNumber(e.target.value);
    });
  }
}

function formatPhoneNumber(value) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const len = phoneNumber.length;
  if (len < 4) return phoneNumber;
  if (len < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

function handleNewsletterSubmit(e) {
  e.preventDefault();

  const submit = document.getElementById("newsletterSubmitBtn");
  const success = document.getElementById("newsletterSuccess");
  const form = document.getElementById("newsletterForm");

  if (submit) {
    submit.disabled = true;
  }

  const formData = new FormData(form);

  // Submit to Netlify Forms only
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
  .then(res => {
    console.log("Netlify newsletter subscription success:", res);
  })
  .catch(err => {
    console.error("Netlify newsletter subscription error:", err);
  })
  .finally(() => {
    if (form) form.style.display = "none";
    if (success) success.style.display = "block";
    if (submit) {
      submit.disabled = false;
    }
  });
}
