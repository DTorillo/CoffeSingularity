// orders.js - Sistema de visualización de pedidos
function loadOrders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = orders.filter(order => order.userId === currentUser.id);
    const timeline = document.getElementById('orders-timeline');

    if (userOrders.length === 0) return;

    timeline.innerHTML = '';

    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-card';
        orderElement.innerHTML = `
            <div class="order-header">
                <span class="order-id">Pedido #${order.id.toString().slice(-6)}</span>
                <span class="order-date">${new Date(order.date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</span>
            </div>
            <div class="order-status ${order.status}">
                <span class="status-dot"></span>
                ${order.status === 'completed' ? 'Completado' : 'Procesando'}
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}">
                        <span class="item-name">${item.name}</span>
                        <span class="item-quantity">x${item.quantity}</span>
                        <span class="item-total">⏣${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-summary">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>⏣${order.subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>IVA (10%)</span>
                    <span>⏣${order.tax.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>⏣${order.total.toFixed(2)}</span>
                </div>
            </div>
            <button class="reorder-btn" onclick="reorder(${order.id})">
                <span class="icon">⟳</span> Replicar Pedido
            </button>
        `;
        timeline.appendChild(orderElement);
    });
}

function reorder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    order.items.forEach(item => {
        addToCart(item.productId, item.quantity);
    });
    
    alert('Pedido replicado al carrito');
    window.location.href = 'cart.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('currentUser')) {
        window.location.href = 'login.html';
    }
    
    loadOrders();
});