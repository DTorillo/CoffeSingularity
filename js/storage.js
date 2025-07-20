// Simulación de base de datos local
function initializeStorage() {
    if (!localStorage.getItem('initialized')) {
        // Usuarios
        const users = [
            { id: 1, name: 'Admin', email: 'admin@coffee.com', password: 'admin123' }
        ];
        localStorage.setItem('users', JSON.stringify(users));
        
        // Productos
        const products = [
            { 
                id: 1, 
                name: 'Espresso Singularity', 
                description: 'Nuestro café signature con un toque especial', 
                price: 3.50, 
                category: 'coffee',
                image: 'assets/images/espresso.jpg'
            },
            // Más productos...
        ];
        localStorage.setItem('products', JSON.stringify(products));
        
        // Pedidos
        localStorage.setItem('orders', JSON.stringify([]));
        
        // Opiniones
        localStorage.setItem('reviews', JSON.stringify([]));
        
        // Marcar como inicializado
        localStorage.setItem('initialized', 'true');
    }
}

// Inicializar al cargar el storage.js
initializeStorage();