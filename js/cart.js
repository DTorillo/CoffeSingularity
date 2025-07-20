let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, quantity = 1) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            name: product.name,
            price: product.price,
            image: product.image
        });
    }
    
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const counter = document.getElementById('cart-counter');
    if (counter) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        counter.textContent = totalItems > 0 ? totalItems : '';
    }
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        subtotalElement.textContent = '$0.00';
        taxElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} c/u</p>
            </div>
            <div class="item-quantity">
                <button onclick="adjustCartQuantity(${item.productId}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="adjustCartQuantity(${item.productId}, 1)">+</button>
            </div>
            <div class="item-total">
                <p>$${itemTotal.toFixed(2)}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.productId})">
                &times;
            </button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function adjustCartQuantity(productId, change) {
    const item = cart.find(item => item.productId === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity < 1) {
        removeFromCart(productId);
    } else {
        updateCart();
        loadCartItems();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    const newOrder = {
        id: Date.now(),
        userId: currentUser.id,
        date: new Date().toISOString(),
        items: [...cart],
        subtotal: parseFloat(document.getElementById('subtotal').textContent.replace('$', '')),
        tax: parseFloat(document.getElementById('tax').textContent.replace('$', '')),
        total: parseFloat(document.getElementById('total').textContent.replace('$', '')),
        status: 'completed'
    };
    
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Vaciar carrito
    cart = [];
    updateCart();
    
    // Redirigir a página de confirmación
    window.location.href = 'order-confirmation.html?id=' + newOrder.id;
}