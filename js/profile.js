// profile.js - Sistema de perfil de usuario
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Cargar datos del usuario
    loadUserData(currentUser);
    
    // Cargar estadísticas
    loadUserStats(currentUser);
    
    // Cargar actividad reciente
    loadRecentActivity(currentUser);
    
    // Event listeners
    document.getElementById('profile-form').addEventListener('submit', updateProfile);
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('delete-account-btn').addEventListener('click', showDeleteModal);
    document.getElementById('cancel-delete').addEventListener('click', hideDeleteModal);
    document.getElementById('confirm-delete').addEventListener('click', deleteAccount);
    document.getElementById('change-avatar-btn').addEventListener('click', changeAvatar);
});

function loadUserData(user) {
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
    
    // Generar avatar inicial
    const avatarInitial = document.querySelector('.avatar-initial');
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    avatarInitial.textContent = initials.slice(0, 2);
}

function loadUserStats(user) {
    // Calcular pedidos
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = orders.filter(o => o.userId === user.id);
    document.getElementById('total-orders').textContent = userOrders.length;
    
    // Calcular reseñas
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const userReviews = reviews.filter(r => r.userId === user.id);
    document.getElementById('total-reviews').textContent = userReviews.length;
    
    // Calcular días como miembro
    const joinDate = new Date(user.joinDate || Date.now());
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('member-since').textContent = diffDays;
}

function loadRecentActivity(user) {
    const activityTimeline = document.getElementById('activity-timeline');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    
    // Combinar y ordenar actividad
    const activities = [
        ...orders.filter(o => o.userId === user.id).map(o => ({
            type: 'order',
            date: o.date,
            content: `Pedido #${o.id.toString().slice(-6)} - ⏣${o.total.toFixed(2)}`,
            id: o.id
        })),
        ...reviews.filter(r => r.userId === user.id).map(r => ({
            type: 'review',
            date: r.date,
            content: `Reseña para ${getProductById(r.productId)?.name || 'Producto'} - ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}`,
            id: r.id
        }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    
    if (activities.length === 0) return;
    
    activityTimeline.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        let icon = '○';
        if (activity.type === 'order') icon = '⏣';
        if (activity.type === 'review') icon = '★';
        
        activityItem.innerHTML = `
            <div class="activity-type">
                <span class="icon">${icon}</span>
                ${activity.type === 'order' ? 'Pedido' : 'Reseña'}
            </div>
            <div class="activity-content">${activity.content}</div>
            <div class="activity-date">${new Date(activity.date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</div>
        `;
        
        activityTimeline.appendChild(activityItem);
    });
}

function updateProfile(e) {
    e.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return;
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validar email único
    if (email !== currentUser.email && users.some(u => u.email === email)) {
        showNotification('Este correo ya está registrado', 'error');
        return;
    }
    
    // Validar contraseña actual si se quiere cambiar
    if ((newPassword || confirmPassword) && currentPassword !== currentUser.password) {
        showNotification('Contraseña actual incorrecta', 'error');
        return;
    }
    
    // Validar nueva contraseña
    if (newPassword && newPassword !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    // Actualizar datos
    users[userIndex] = {
        ...users[userIndex],
        name,
        email,
        password: newPassword || currentUser.password
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    
    // Actualizar UI
    loadUserData(users[userIndex]);
    document.getElementById('profile-form').reset();
    
    showNotification('Perfil actualizado con éxito');
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function showDeleteModal() {
    document.getElementById('delete-modal').style.display = 'flex';
}

function hideDeleteModal() {
    document.getElementById('delete-modal').style.display = 'none';
}

function deleteAccount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Eliminar usuario
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(u => u.id !== currentUser.id);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Eliminar pedidos del usuario
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(o => o.userId !== currentUser.id);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Eliminar reseñas del usuario
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews = reviews.filter(r => r.userId !== currentUser.id);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    // Cerrar sesión
    localStorage.removeItem('currentUser');
    hideDeleteModal();
    window.location.href = 'login.html';
}

function changeAvatar() {
    // En una implementación real, aquí iría la lógica para subir una imagen
    // Por ahora generaremos un color aleatorio
    const colors = ['#00d8ff', '#ff00aa', '#00ffaa', '#ffcc00', '#aa00ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.querySelector('.avatar').style.background = `linear-gradient(135deg, ${randomColor}, ${randomColor}80)`;
    showNotification('Avatar actualizado');
}

function getProductById(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(p => p.id === id);
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