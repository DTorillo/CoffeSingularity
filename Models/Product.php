<?php
class Product {
    private $conn;
    private $table = 'products';

    public $id;
    public $category_id;
    public $name;
    public $slug;
    public $description;
    public $price;
    public $image;
    public $is_featured;
    public $is_special;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos los productos
    public function read() {
        $query = 'SELECT 
            p.id, p.name, p.slug, p.description, 
            p.price, p.image, p.is_featured, p.is_special,
            c.name as category_name, c.slug as category_slug
        FROM ' . $this->table . ' p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.name ASC';

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Obtener productos por categoría
    public function readByCategory($category_slug) {
        $query = 'SELECT 
            p.id, p.name, p.slug, p.description, 
            p.price, p.image, p.is_featured, p.is_special,
            c.name as category_name, c.slug as category_slug
        FROM ' . $this->table . ' p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE c.slug = ?
        ORDER BY p.name ASC';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $category_slug);
        $stmt->execute();

        return $stmt;
    }

    // Obtener un solo producto
    public function readSingle($slug) {
        $query = 'SELECT 
            p.id, p.name, p.slug, p.description, 
            p.price, p.image, p.is_featured, p.is_special,
            c.name as category_name, c.slug as category_slug
        FROM ' . $this->table . ' p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.slug = ?
        LIMIT 0,1';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $slug);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->id = $row['id'];
            $this->name = $row['name'];
            $this->slug = $row['slug'];
            $this->description = $row['description'];
            $this->price = $row['price'];
            $this->image = $row['image'];
            $this->is_featured = $row['is_featured'];
            $this->is_special = $row['is_special'];
            $this->category_name = $row['category_name'];
            $this->category_slug = $row['category_slug'];
        }
    }
}
?>