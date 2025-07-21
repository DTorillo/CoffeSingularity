document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está logueado
    if (!localStorage.getItem('currentUser') && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('splash.html')) {
        window.location.href = 'login.html';
    }
    
    // Actualizar contador del carrito
    updateCartCounter();
    
    // Cargar productos por categoría en la página principal
    if (document.getElementById('coffee-products')) {
        loadProducts('coffee', 'coffee-products');
        loadProducts('cold', 'cold-products');
        loadProducts('special', 'special-products');
        loadProducts('cafe-free', 'cafe-free-products');
        loadProducts('snacks', 'snacks-products');
    }
    
    // Botón secreto
    if (!document.getElementById('secret-btn') && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('splash.html')) {
        const secretBtn = document.createElement('button');
        secretBtn.id = 'secret-btn';
        secretBtn.textContent = '🔓';
        secretBtn.style.position = 'fixed';
        secretBtn.style.bottom = '20px';
        secretBtn.style.right = '20px';
        secretBtn.style.background = 'var(--primary-color)';
        secretBtn.style.color = 'white';
        secretBtn.style.border = 'none';
        secretBtn.style.borderRadius = '50%';
        secretBtn.style.width = '50px';
        secretBtn.style.height = '50px';
        secretBtn.style.fontSize = '1.5rem';
        secretBtn.style.cursor = 'pointer';
        secretBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        secretBtn.style.zIndex = '1000';
        secretBtn.onclick = unlockSecretMenu;
        document.body.appendChild(secretBtn);
    }
});

function unlockSecretMenu() {
    const phrase = prompt("¿Cuál es la frase secreta?");
    if (phrase && phrase.toLowerCase() === "entropía baja, café alto") {
        localStorage.setItem('unlockSecrets', 'true');
        if (document.getElementById('coffee-products')) {
            loadProducts('coffee', 'coffee-products');
            loadProducts('cold', 'cold-products');
            loadProducts('special', 'special-products');
            loadProducts('cafe-free', 'cafe-free-products');
            loadProducts('snacks', 'snacks-products');
        }
        alert('¡Menú secreto desbloqueado!');
    } else if (phrase) {
        alert('Frase incorrecta. Intenta de nuevo.');
    }
}