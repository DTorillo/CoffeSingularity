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
            { id: 4, name: 'GPT-Drip', description: 'Café filtrado con precisión algorítmica, palabra por palabra.', price: 4.25, category: 'coffee', image: 'assets/images/gpt-drip.jpg' },
            { id: 5, name: 'Heurística Americano', description: 'Simple, directo y óptimo. Sin adornos, sin complicaciones.', price: 3.75, category: 'coffee', image: 'assets/images/heuristica-americano.jpg' },
            { id: 6, name: 'Bias Breve', description: 'Un café breve, suave, pero claramente inclinado a que lo ames.', price: 4.00, category: 'coffee', image: 'assets/images/bias-breve.jpg' },
            { id: 7, name: 'Retropropagation Roast', description: 'Tostado profundo optimizado con mínima pérdida energética.', price: 5.25, category: 'coffee', image: 'assets/images/retropropagation-roast.jpg' },
            { id: 8, name: 'Schrödinger Latte', description: '¿Tiene canela o no? Solo lo sabrás al probarlo.', price: 4.80, category: 'coffee', image: 'assets/images/schrodinger-latte.jpg' },
            { id: 9, name: 'Cortado Binario', description: '1 shot, 0 leche... o tal vez 1. Tú decides el código.', price: 4.10, category: 'coffee', image: 'assets/images/cortado-binario.jpg' },

            // BEBIDAS FRÍAS & FUTURISTAS
            { id: 21, name: 'Deep Freeze Learning', description: 'Latte helado de avellana, frío como entrenamiento en la nube.', price: 5.50, category: 'cold', image: 'assets/images/deep-freeze.jpg' },
            { id: 22, name: 'Mocha Multiverso', description: 'Café, chocolate y un toque aleatorio. Cada vaso, un universo nuevo.', price: 5.75, category: 'cold', image: 'assets/images/mocha-multiverse.jpg' },
            { id: 23, name: 'ColdFusion Cappuccino', description: 'Espuma fría como la lógica cuántica.', price: 5.25, category: 'cold', image: 'assets/images/coldfusion-cappuccino.jpg' },
            { id: 24, name: 'String Theory Shake', description: 'Malteada en 11 dimensiones de sabor. Teoréticamente deliciosa.', price: 6.00, category: 'cold', image: 'assets/images/string-theory-shake.jpg' },
            { id: 25, name: 'Neural Chai', description: 'Té chai helado con especias sincronizadas para estimular sinapsis.', price: 5.10, category: 'cold', image: 'assets/images/neural-chai.jpg' },
            { id: 26, name: 'Latte Neural Net', description: 'Latte clásico con arte de red neuronal y notas de vainilla.', price: 5.30, category: 'cold', image: 'assets/images/latte-neural-net.jpg' },
            { id: 27, name: 'Cosmic Caramel Drip', description: 'Café goteado con espiral de caramelo. Estelarmente adictivo.', price: 5.45, category: 'cold', image: 'assets/images/cosmic-caramel-drip.jpg' },
            { id: 28, name: 'Gradient Boosted Brew', description: 'Mezcla intensa optimizada con boosters de sabor generativos.', price: 5.85, category: 'cold', image: 'assets/images/gradient-boosted-brew.jpg' },

            // CREACIONES ESPECIALES
            { id: 31, name: 'AI Affogato', description: 'Helado artesanal sumergido en espresso caliente. Choque térmico controlado.', price: 6.50, category: 'special', image: 'assets/images/ai-affogato.jpg' },
            { id: 32, name: 'Caramel Singularity Shot', description: 'Tan dulce y denso que se curva a sí mismo.', price: 4.90, category: 'special', image: 'assets/images/caramel-singularity-shot.jpg' },
            { id: 33, name: 'Decaf NullPointer', description: 'Sin cafeína. Sin propósito. Pero te sigue gustando.', price: 4.20, category: 'special', image: 'assets/images/decaf-nullpointer.jpg' },
            { id: 34, name: 'Turing Shot', description: 'Shot que te hace pensar en binario mientras reinicia tu sistema.', price: 3.95, category: 'special', image: 'assets/images/turing-shot.jpg' },
            { id: 35, name: 'JavaScript Juice', description: 'Bebida cítrica energética que se ejecuta en todos los dispositivos (mentales).', price: 4.60, category: 'special', image: 'assets/images/javascript-juice.jpg' },

            // BEBIDAS SIN CAFÉ
            { id: 41, name: 'Antimateria Matcha', description: 'Verde, poderoso, y tan intenso que cancela el estrés.', price: 4.50, category: 'cafe-free', image: 'assets/images/antimatter-matcha.jpg' },
            { id: 42, name: 'Synaptic Soda', description: 'Refresco cítrico con burbujas inteligentes.', price: 3.80, category: 'cafe-free', image: 'assets/images/synaptic-soda.jpg' },
            { id: 43, name: 'Infusión TensorFlow', description: 'Té herbal cálido, ideal para entrar en estado theta.', price: 4.00, category: 'cafe-free', image: 'assets/images/infusion-tensorflow.jpg' },
            { id: 44, name: 'Coolant Fizz', description: 'Agua tónica con pepino y menta, refrescante como servidor refrigerado.', price: 3.95, category: 'cafe-free', image: 'assets/images/coolant-fizz.jpg' },

            // SNACKS INTELIGENTES
            { id: 51, name: 'Muffin de Möbius', description: 'Tan esponjoso que parece infinito.', price: 3.50, category: 'snacks', image: 'assets/images/mobius-muffin.jpg' },
            { id: 52, name: 'Brownie de Bajo Entorno', description: 'Vegano, sin gluten. Compilado para tu dieta.', price: 3.75, category: 'snacks', image: 'assets/images/low-env-brownie.jpg' },
            { id: 53, name: 'Croissant Cuántico', description: 'Delicado como onda, crujiente como partícula.', price: 4.00, category: 'snacks', image: 'assets/images/quantum-croissant.jpg' },
            { id: 54, name: 'Pan de Plátano Beta 1.0', description: 'Sabroso. Inestable. En constante mejora.', price: 3.60, category: 'snacks', image: 'assets/images/banana-bread-beta.jpg' },
            { id: 55, name: 'Cookies Hash', description: 'Con chips únicos. Tus sesiones de sabor quedan registradas.', price: 3.40, category: 'snacks', image: 'assets/images/cookies-hash.jpg' }
        ];

        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('initialized', 'true');
    }
}

// Inicializar al cargar el storage.js
initializeStorage();