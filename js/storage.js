// Simulación de base de datos local
function initializeStorage() {
    if (!localStorage.getItem('initialized')) {
        // Usuarios
        const users = [
            { 
                id: 1, 
                name: 'Admin', 
                email: 'admin@coffee.com', 
                password: 'admin123',
                joinDate: new Date().toISOString() // Añadir esta línea
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
        
        const products = [
            // CAFÉS CALIENTES
            { id: 1, name: 'Quantum Espresso', description: 'Tan potente que no sabes si estás despierto o colapsando en una superposición.', price: 4.50, category: 'coffee', image: 'assets/images/quantum-espresso.jpg' },
            { id: 2, name: 'Black Hole Brew', description: 'Espresso doble oscuro como un agujero negro, denso y misterioso.', price: 5.00, category: 'coffee', image: 'assets/images/black-hole.jpg' },
            { id: 3, name: 'Entropy Macchiato', description: 'El orden es una ilusión... excepto por esta mezcla perfecta.', price: 4.75, category: 'coffee', image: 'assets/images/entropy-macchiato.jpg' },
            
            // BEBIDAS FRÍAS
            { id: 21, name: 'Deep Freeze Learning', description: 'Latte helado de avellana, frío como entrenamiento en la nube.', price: 5.50, category: 'cold', image: 'assets/images/deep-freeze.jpg' },
            { id: 22, name: 'Mocha Multiverso', description: 'Café, chocolate y un toque aleatorio. Cada vaso, un universo nuevo.', price: 5.75, category: 'cold', image: 'assets/images/mocha-multiverse.jpg' },
            
            // CREACIONES ESPECIALES
            { id: 31, name: 'AI Affogato', description: 'Helado artesanal sumergido en espresso caliente. Choque térmico controlado.', price: 6.50, category: 'special', image: 'assets/images/ai-affogato.jpg' },
            
            // BEBIDAS SIN CAFÉ
            { id: 41, name: 'Antimateria Matcha', description: 'Verde, poderoso, y tan intenso que cancela el estrés.', price: 4.50, category: 'cafe-free', image: 'assets/images/antimatter-matcha.jpg' },
            
            // SNACKS
            { id: 51, name: 'Muffin de Möbius', description: 'Tan esponjoso que parece infinito.', price: 3.50, category: 'snacks', image: 'assets/images/mobius-muffin.jpg' },
            { id: 52, name: 'Croissant Cuántico', description: 'Delicado como onda, crujiente como partícula.', price: 4.00, category: 'snacks', image: 'assets/images/quantum-croissant.jpg' }
        ];

        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('initialized', 'true');
    }
}

// Inicializar al cargar el storage.js
initializeStorage();