<?php include_once '../../config/header.php'; ?>
<?php include_once '../../models/Product.php'; ?>

<?php
// Conexión a la base de datos
$database = new Database();
$db = $database->connect();

// Obtener productos por categoría
$product = new Product($db);
$stmt = $product->readByCategory('cafes-calientes');
$num = $stmt->rowCount();
?>

<div class="container mt-5">
    <div class="row">
        <div class="col-12">
            <h1 class="display-4">☕ Cafés Calientes</h1>
            <p class="lead">Nuestra selección de cafés calientes con nombres inspirados en la ciencia y tecnología</p>
            <hr class="my-4">
        </div>
    </div>

    <?php if($num > 0): ?>
        <div class="row">
            <?php while($row = $stmt->fetch(PDO::FETCH_ASSOC)): ?>
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="/assets/images/products/<?php echo $row['image']; ?>" class="card-img-top" alt="<?php echo $row['name']; ?>">
                        <div class="card-body">
                            <h5 class="card-title"><?php echo $row['name']; ?></h5>
                            <p class="card-text"><?php echo $row['description']; ?></p>
                        </div>
                        <div class="card-footer bg-white">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="h5 mb-0">$<?php echo number_format($row['price'], 2); ?></span>
                                <button class="btn btn-primary add-to-cart" data-id="<?php echo $row['id']; ?>">
                                    <i class="fas fa-cart-plus"></i> Añadir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    <?php else: ?>
        <div class="alert alert-warning">No se encontraron productos en esta categoría.</div>
    <?php endif; ?>
</div>

<script>
// Función para añadir al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        
        // Obtener carrito actual de localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Verificar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id == productId);
        
        if(existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                quantity: 1
            });
        }
        
        // Guardar en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Mostrar notificación
        alert('Producto añadido al carrito!');
        
        // Actualizar contador del carrito
        updateCartCount();
    });
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Inicializar contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', updateCartCount);
</script>

<?php include_once '../../config/footer.php'; ?>