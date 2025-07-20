// search.js - Funcionalidad de búsqueda
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => performSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
});

function performSearch() {
    const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('p').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'block';
            product.style.animation = 'highlight 1.5s';
        } else {
            product.style.display = 'none';
        }
    });
    
    // Resetear filtros activos
    document.querySelectorAll('.category-filter button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.category-filter button[data-category="all"]').classList.add('active');
}
