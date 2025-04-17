document.addEventListener('DOMContentLoaded', function() {
    // Manejar el envío del formulario
    const form = document.getElementById('newsletter-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Aquí puedes agregar la lógica para manejar el email
        console.log('Email subscrito:', email);
        
        // Limpiar el formulario
        this.reset();
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por suscribirte!');
    });

    // Funcionalidad del menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        // Toggle nav
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}); 