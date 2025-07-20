-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS coffe_singularity;
USE coffe_singularity;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de categorías
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    icon VARCHAR(50)
);

-- Tabla de productos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    is_special BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabla de pedidos
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de detalles de pedido
CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabla de reseñas
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insertar categorías
INSERT INTO categories (name, slug, icon) VALUES 
('Cafés Calientes', 'cafes-calientes', '☕'),
('Bebidas Frías', 'bebidas-frias', '❄️'),
('Creaciones Especiales', 'creaciones-especiales', '🧋'),
('Bebidas Sin Café', 'bebidas-sin-cafe', '🧠'),
('Snacks Inteligentes', 'snacks-inteligentes', '🍪'),
('Secretos & Experiencias', 'secretos-experiencias', '🎮');

-- Insertar productos (ejemplo con algunos cafés calientes)
INSERT INTO products (category_id, name, slug, description, price, image) VALUES
(1, 'Quantum Espresso', 'quantum-espresso', 'Tan potente que no sabes si estás despierto o colapsando en una superposición.', 3.50, 'quantum-espresso.jpg'),
(1, 'Black Hole Brew', 'black-hole-brew', 'Espresso doble oscuro como un agujero negro, denso y misterioso.', 4.00, 'black-hole-brew.jpg'),
(1, 'Entropy Macchiato', 'entropy-macchiato', 'El orden es una ilusión... excepto por esta mezcla perfecta.', 3.75, 'entropy-macchiato.jpg'),
(1, 'GPT-Drip', 'gpt-drip', 'Café filtrado con precisión algorítmica, palabra por palabra.', 3.25, 'gpt-drip.jpg'),
(1, 'Heurística Americano', 'heuristica-americano', 'Simple, directo y óptimo. Sin adornos, sin complicaciones.', 2.75, 'heuristica-americano.jpg');
-- ... (continuar con los demás productos)