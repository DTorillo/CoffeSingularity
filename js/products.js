function loadProducts(category = 'all') {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Filtrar productos normales
    let filteredProducts = allProducts.filter(product => {
        if (category === 'all') return true;
        return product.category === category;
    });
    
    // Añadir productos secretos si el usuario sabe la frase
    if (localStorage.getItem('unlockSecrets') === 'true') {
        const secretProducts = [
            {
                id: 99,
                name: 'White Noise Brew',
                description: 'Mezcla desconocida, diseñada por IA al azar. Cada vez es única.',
                price: 7.99,
                category: 'secret',
                image: 'assets/images/white-noise.jpg'
            },
            {
                id: 100,
                name: 'Combo Turing Completo',
                description: 'Latte Neural Net + Muffin Möbius + Galleta IA.',
                price: 9.50,
                category: 'secret',
                image: 'assets/images/combo-turing.jpg'
            },
            {
                id: 101,
                name: 'Capsula Holográfica',
                description: 'Espresso servido en espacio VR privado con visualizaciones sonoras.',
                price: 12.00,
                category: 'secret',
                image: 'assets/images/holographic-capsule.jpg'
            }
        ];
        filteredProducts = [...filteredProducts, ...secretProducts];
    }
    
    // Generar el HTML para cada producto
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = `product-card ${product.category === 'secret' ? 'secret-product' : ''}`;
        
        productCard.innerHTML = `
            ${product.category !== 'secret' ? `<span class="category-tag">${getCategoryName(product.category)}</span>` : ''}
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

function getCategoryName(categoryKey) {
    const categories = {
        'coffee': 'Café Caliente',
        'cold': 'Bebida Fría',
        'special': 'Creación Especial',
        'cafe-free': 'Sin Café',
        'snacks': 'Snack',
        'secret': 'Secreto'
    };
    return categories[categoryKey] || categoryKey;
}

// Función para desbloquear la sección secreta
function unlockSecretMenu() {
    const phrase = prompt("¿Cuál es la frase secreta?");
    if (phrase && phrase.toLowerCase() === "entropía baja, café alto") {
        localStorage.setItem('unlockSecrets', 'true');
        loadProducts();
        alert('¡Menú secreto desbloqueado!');
    } else if (phrase) {
        alert('Frase incorrecta. Intenta de nuevo.');
    }
}

// Añadir esto al app.js en el DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... código existente
    
    // Botón secreto (podría estar oculto en el footer)
    const secretBtn = document.createElement('button');
    secretBtn.textContent = '🔓';
    secretBtn.style.position = 'fixed';
    secretBtn.style.bottom = '10px';
    secretBtn.style.right = '10px';
    secretBtn.style.background = 'transparent';
    secretBtn.style.border = 'none';
    secretBtn.style.fontSize = '1.5rem';
    secretBtn.style.cursor = 'pointer';
    secretBtn.onclick = unlockSecretMenu;
    document.body.appendChild(secretBtn);
});