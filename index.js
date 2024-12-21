function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
  
  function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  
  if (document.title === "Mini E-commerce") {
    const loadProductsBtn = document.getElementById("loadProductsBtn");
    const productGrid = document.getElementById("productGrid");
  
    loadProductsBtn.addEventListener("click", () => {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((products) => {
          productGrid.innerHTML = products
            .map(
              (product) => `
            <div class="card">
              <img src="${product.image}" alt="${product.title}">
              <h3>${product.title}</h3>
              <p>Price: $${product.price}</p>
              <p>Rating: ${product.rating.rate}</p>
              <button onclick='addToWishlist(${JSON.stringify(product)})'>Add to Wishlist</button>
            </div>`
            )
            .join("");
        });
    });
  }
  
  function addToWishlist(product) {
    const wishlist = getFromStorage("wishlistedProducts");
    wishlist.push(product);
    saveToStorage("wishlistedProducts", wishlist);
    alert("Product added to wishlist!");
  }
  
  // Wishlist Page
  if (document.title === "Wishlist") {
    const wishlistGrid = document.getElementById("wishlistGrid");
    const wishlist = getFromStorage("wishlistedProducts");
  
    wishlistGrid.innerHTML = wishlist
      .map(
        (product) => `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <p>Description: ${product.description}</p>
        <p>Rating: ${product.rating.rate}</p>
        <button onclick='removeFromWishlist("${product.id}")'>Remove from Wishlist</button>
      </div>`
      )
      .join("");
  }
  
  function removeFromWishlist(productId) {
    const wishlist = getFromStorage("wishlistedProducts");
    const updatedWishlist = wishlist.filter((item) => item.id !== parseInt(productId));
    saveToStorage("wishlistedProducts", updatedWishlist);
    location.reload();
  }
  
  // Cart Page
  if (document.title === "Cart") {
    const cartGrid = document.getElementById("cartGrid");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const totalPriceEl = document.getElementById("totalPrice");
  
    const cart = getFromStorage("cartProducts");
  
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    totalPriceEl.textContent = total.toFixed(2);
  
    cartGrid.innerHTML = cart
      .map(
        (product) => `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <p>Description: ${product.description}</p>
        <p>Rating: ${product.rating.rate}</p>
        <button onclick='removeFromCart("${product.id}")'>Remove from Cart</button>
      </div>`
      )
      .join("");
  
    checkoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure to checkout?")) {
        setTimeout(() => {
          alert("Thanks for shopping!");
          localStorage.removeItem("cartProducts");
          location.reload();
        }, 2000);
      }
    });
  }
  
  function removeFromCart(productId) {
    const cart = getFromStorage("cartProducts");
    const updatedCart = cart.filter((item) => item.id !== parseInt(productId));
    saveToStorage("cartProducts", updatedCart);
    location.reload();
  }