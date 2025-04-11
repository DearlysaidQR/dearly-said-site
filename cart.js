// Display all products
function renderProducts(productsToRender) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';

  productsToRender.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}" style="width:200px; height:auto;">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>$${p.price.toFixed(2)}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Filtering
function filterProducts(category) {
  if (category === 'All') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// Cart Logic
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = products.find(p => p.id === id);
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  cartList.innerHTML = '';
  let sum = 0;

  cart.forEach((item, index) => {
    cartList.innerHTML += `
      <li>
        ${item.name} - $${item.price.toFixed(2)}
        <button onclick="removeFromCart(${index})">Remove</button>
      </li>
    `;
    sum += item.price;
  });

  total.innerText = `Total: $${sum.toFixed(2)}`;
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  displayCart();
});
