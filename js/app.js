// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('shopping-cart');
    const cartItems = document.getElementById('cart-items');
    const addToCartButtons = document.querySelectorAll('button[type="submit"]');
    const clearCartButton = document.getElementById('clear-cart');
    const closeCartButton = document.getElementById('close-cart');
    const cartIcon = document.querySelector('.giohang');
    const sizeButtons = document.querySelectorAll('.pick-size');
  
    let selectedSize = '';
  
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    function updateCart() {
      cartItems.innerHTML = '';
      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
          ${item.name} - ${item.price} - Size: ${item.size} - Quantity: ${item.quantity}
          <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(li);
      });
      saveCart();
  
      // Add event listeners to remove buttons
      document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
          const index = button.getAttribute('data-index');
          cart.splice(index, 1);
          updateCart();
        });
      });
    }
  
    sizeButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        selectedSize = event.target.textContent;
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        event.target.classList.add('selected');
      });
    });
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const product = button.closest('.product-shoes, .product-clothes, .product-accessories');
        const productName = product.querySelector('h2').textContent;
        const productPrice = product.querySelector('.discount-price').textContent;
        const productImage = product.querySelector('img').src;
        const productQuantity = product.querySelector('.quantity').value;
  
        if (selectedSize === '') {
          alert('Please select a size.');
          return;
        }
  
        if (productQuantity <= 0) {
          alert('Please enter a valid quantity.');
          return;
        }
  
        cart.push({ name: productName, price: productPrice, image: productImage, size: selectedSize, quantity: productQuantity });
        updateCart();
        selectedSize = '';
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
      });
    });
  
    clearCartButton.addEventListener('click', () => {
      cart.length = 0;
      updateCart();
    });
  
    closeCartButton.addEventListener('click', () => {
      cartContainer.style.display = 'none';
    });
  
    cartIcon.addEventListener('click', (event) => {
      cartContainer.style.display = (cartContainer.style.display === 'none' || cartContainer.style.display === '') ? 'block' : 'none';
      event.preventDefault();
      updateCart();
    });
  
    // Initial cart update to load items from localStorage
    updateCart();
  });
  

 