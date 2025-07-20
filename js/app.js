document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está logueado
    if (!localStorage.getItem('currentUser') && window.location.pathname !== '/login.html') {
        window.location.href = 'login.html';
    }
    
    // Cargar productos si estamos en la página principal
    if (document.getElementById('products-container')) {
        loadProducts();
        setupCategoryFilters();
    }
});

function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-filter button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            button.classList.add('active');
            
            // Filtrar productos
            const category = button.dataset.category;
            loadProducts(category);
        });
    });
}

function loadProducts(category = 'all') {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    // Obtener productos del almacenamiento
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    
    // Filtrar por categoría si no es 'all'
    const filteredProducts = category === 'all' 
        ? allProducts 
        : allProducts.filter(product => product.category === category);
    
    // Generar el HTML para cada producto
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Añadir al carrito</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

function addToCart(productId) {
    // Lógica para añadir al carrito
    console.log(`Producto ${productId} añadido al carrito`);
    // Implementar en cart.js
}