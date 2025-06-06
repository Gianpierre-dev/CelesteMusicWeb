document.addEventListener('DOMContentLoaded', function () {
    // Manejar el envío del formulario
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            console.log('Email subscrito:', email);
            this.reset();
            alert('¡Gracias por suscribirte!');
        });
    }

    // Funcionalidad del menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks && links.length > 0) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        links.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Slider functionality
    const slider = document.querySelector('.events-slider');
    const cards = document.querySelectorAll('.event-card');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const dots = document.querySelectorAll('.slider-dot');

    if (slider && cards.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        let isTransitioning = false;

        // Función para actualizar el slider
        function updateSlider() {
            const cardWidth = cards[0].offsetWidth + 32; // width + margin
            slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            // Actualizar puntos
            dots.forEach(function(dot, index) {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Función para ir al siguiente slide
        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
            
            setTimeout(function() {
                isTransitioning = false;
            }, 500);
        }

        // Función para ir al slide anterior
        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider();
            
            setTimeout(function() {
                isTransitioning = false;
            }, 500);
        }

        // Event Listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                if (isTransitioning) return;
                isTransitioning = true;
                
                currentIndex = index;
                updateSlider();
                
                setTimeout(function() {
                    isTransitioning = false;
                }, 500);
            });
        });

        // Manejar el redimensionamiento
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                slider.style.transition = 'none';
                updateSlider();
                setTimeout(function() {
                    slider.style.transition = 'transform 0.5s ease-out';
                }, 50);
            }, 100);
        });

        // Inicializar slider
        updateSlider();
    }
});
