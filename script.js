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

    // Funcionalidad de pestañas para videos/fotos
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remover clases activas
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            tabContents.forEach(function(content) {
                content.classList.remove('active');
            });
            
            // Activar pestaña seleccionada
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });

    // Funcionalidad de toggle para eventos
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const eventsViews = {
        slider: document.querySelector('.events-slider-view'),
        list: document.querySelector('.events-list-view')
    };

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');
            
            // Remover clases activas
            toggleButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            Object.values(eventsViews).forEach(function(view) {
                if (view) view.classList.remove('active');
            });
            
            // Activar vista seleccionada
            this.classList.add('active');
            if (eventsViews[targetView]) {
                eventsViews[targetView].classList.add('active');
            }
        });
    });

    // Funcionalidad de carruseles horizontales
    function createCarousel(sliderId, prevBtnId, nextBtnId) {
        const slider = document.getElementById(sliderId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!slider || !prevBtn || !nextBtn) return;
        
        let currentOffset = 0;
        
        function calculateDimensions() {
            const items = slider.children;
            if (items.length === 0) return null;
            
            const itemWidth = items[0].offsetWidth;
            const gap = parseInt(getComputedStyle(slider).gap) || 32;
            const scrollStep = itemWidth + gap;
            const containerWidth = slider.parentElement.offsetWidth - 120; // menos padding de botones
            const itemsToShow = Math.max(1, Math.floor(containerWidth / scrollStep));
            const maxOffset = Math.max(0, (items.length - itemsToShow) * scrollStep);
            
            return { scrollStep, maxOffset, itemsToShow };
        }
        
        function updateCarousel() {
            const dimensions = calculateDimensions();
            if (!dimensions) return;
            
            // Asegurar que currentOffset no exceda los límites
            currentOffset = Math.min(currentOffset, dimensions.maxOffset);
            currentOffset = Math.max(0, currentOffset);
            
            slider.style.transform = `translateX(-${currentOffset}px)`;
            
            // Actualizar estado de botones
            prevBtn.style.opacity = currentOffset <= 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentOffset <= 0 ? 'none' : 'auto';
            
            nextBtn.style.opacity = currentOffset >= dimensions.maxOffset ? '0.5' : '1';
            nextBtn.style.pointerEvents = currentOffset >= dimensions.maxOffset ? 'none' : 'auto';
        }
        
        prevBtn.addEventListener('click', function() {
            const dimensions = calculateDimensions();
            if (!dimensions) return;
            
            currentOffset = Math.max(0, currentOffset - dimensions.scrollStep);
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', function() {
            const dimensions = calculateDimensions();
            if (!dimensions) return;
            
            currentOffset = Math.min(dimensions.maxOffset, currentOffset + dimensions.scrollStep);
            updateCarousel();
        });
        
        // Función para recalcular al redimensionar
        function recalculate() {
            // Reset position on resize to avoid broken states
            const dimensions = calculateDimensions();
            if (!dimensions) return;
            
            currentOffset = Math.min(currentOffset, dimensions.maxOffset);
            updateCarousel();
        }
        
        // Inicializar
        setTimeout(updateCarousel, 100); // Pequeño delay para asegurar que los elementos estén renderizados
        
        // Actualizar al redimensionar
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(recalculate, 200);
        });
        
        return {
            next: () => {
                const dimensions = calculateDimensions();
                if (!dimensions) return;
                currentOffset = Math.min(dimensions.maxOffset, currentOffset + dimensions.scrollStep);
                updateCarousel();
            },
            prev: () => {
                const dimensions = calculateDimensions();
                if (!dimensions) return;
                currentOffset = Math.max(0, currentOffset - dimensions.scrollStep);
                updateCarousel();
            },
            reset: () => {
                currentOffset = 0;
                updateCarousel();
            }
        };
    }
    
    // Inicializar carruseles
    createCarousel('albums-slider', 'albums-prev', 'albums-next');
    createCarousel('videos-slider', 'videos-prev', 'videos-next');
    createCarousel('photos-slider', 'photos-prev', 'photos-next');
    
    // Carrusel de eventos con la nueva funcionalidad
    createCarousel('events-slider', 'events-prev', 'events-next');

    // Funcionalidad de botones CTA del hero
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('música')) {
                document.getElementById('musica').scrollIntoView({ behavior: 'smooth' });
            } else if (buttonText.includes('videos')) {
                document.getElementById('videos').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll suave para navegación
    const navLinksSmooth = document.querySelectorAll('a[href^="#"]');
    navLinksSmooth.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Indicador de progreso
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
});
