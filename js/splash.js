document.addEventListener('DOMContentLoaded', () => {
    // Simular carga de recursos
    setTimeout(() => {
        // Cambiar texto después de 3 segundos
        document.querySelector('.typing-text').textContent = "Bienvenido a COFFE SINGULARITY";
        document.querySelector('.subtext').textContent = "Preparando experiencia de café cuántico";
        
        // Redirigir después de 5 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 3500);
});