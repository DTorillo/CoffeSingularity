<?php
require_once '../config/database.php';
require_once '../models/Product.php';

class ProductsController {
    private $productModel;

    public function __construct() {
        $database = new Database();
        $db = $database->connect();
        $this->productModel = new Product($db);
    }

    public function showCategory($category_slug) {
        $stmt = $this->productModel->readByCategory($category_slug);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Aquí podrías incluir la vista correspondiente
        // require_once '../views/products/category.php';
        
        return $products;
    }

    public function showProduct($product_slug) {
        $this->productModel->readSingle($product_slug);
        
        if($this->productModel->name) {
            // Producto encontrado
            $product = [
                'id' => $this->productModel->id,
                'name' => $this->productModel->name,
                'description' => $this->productModel->description,
                'price' => $this->productModel->price,
                'image' => $this->productModel->image,
                'category_name' => $this->productModel->category_name
            ];
            
            // require_once '../views/products/detail.php';
            return $product;
        } else {
            // Producto no encontrado
            header('Location: /views/404.php');
            exit;
        }
    }
}
?>