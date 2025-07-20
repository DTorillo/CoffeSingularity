// reviews.js - Sistema de reseñas
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('currentUser')) {
        window.location.href = 'login.html';
    }
    
    loadProductsForReview();
    loadReviews();
    
    document.getElementById('review-form').addEventListener('submit', (e) => {
        e.preventDefault();
        submitReview();
    });
});

function loadProductsForReview() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const select = document.getElementById('review-product');
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewsList = document.getElementById('reviews-list');
    
    if (reviews.length === 0) return;
    
    reviewsList.innerHTML = '';
    
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(review => {
        const product = getProductById(review.productId);
        const user = getUserById(review.userId);
        
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <span class="review-product">${product?.name || 'Producto eliminado'}</span>
                <span class="review-user">@${user?.name || 'Usuario anónimo'}</span>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <div class="review-content">${review.comment}</div>
            <div class="review-date">${new Date(review.date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })}</div>
        `;
        reviewsList.appendChild(reviewCard);
    });
}

function submitReview() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const productId = parseInt(document.getElementById('review-product').value);
    const rating = parseInt(document.querySelector('input[name="rating"]:checked')?.value);
    const comment = document.getElementById('review-comment').value.trim();
    
    if (!productId || !rating || !comment) {
        showNotification('Completa todos los campos', 'error');
        return;
    }
    
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    
    const newReview = {
        id: Date.now(),
        userId: currentUser.id,
        productId,
        rating,
        comment,
        date: new Date().toISOString()
    };
    
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    showNotification('Reseña publicada con éxito');
    document.getElementById('review-form').reset();
    loadReviews();
}

function getProductById(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(p => p.id === id);
}

function getUserById(id) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(u => u.id === id);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}