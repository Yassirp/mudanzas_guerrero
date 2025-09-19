// Funcionalidad principal de la landing page de Mudanzas Guerrero

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const btnCotizar = document.getElementById('btnCotizar');
    const btnCotizarHeader = document.getElementById('btnCotizarHeader');
    const btnMobileCotizar = document.getElementById('btnMobileCotizar');
    const btnLlamar = document.getElementById('btnLlamar');
    const contactForm = document.querySelector('.contact-form');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav a');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const pricingButtons = document.querySelectorAll('.btn-pricing');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const whatsappFloat = document.getElementById('whatsappFloat');
    
    // Smooth scroll para navegación desktop
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight + 40; // Incluir barra de promoción
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scroll para navegación móvil
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                closeMobileMenu();
                const headerHeight = header.offsetHeight + 40; // Incluir barra de promoción
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Función para scroll al formulario
    function scrollToContact() {
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            const headerHeight = header.offsetHeight + 40; // Incluir barra de promoción
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Resaltar el formulario
            setTimeout(() => {
                if (contactForm) {
                    contactForm.style.transform = 'scale(1.02)';
                    contactForm.style.boxShadow = '0 8px 30px rgba(255, 102, 0, 0.3)';
                    setTimeout(() => {
                        contactForm.style.transform = 'scale(1)';
                        contactForm.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                    }, 1000);
                }
            }, 500);
        }
    }

    // Botón de cotización del hero - scroll al formulario
    if (btnCotizar) {
        btnCotizar.addEventListener('click', scrollToContact);
    }

    // Botón de cotización del header - scroll al formulario
    if (btnCotizarHeader) {
        btnCotizarHeader.addEventListener('click', scrollToContact);
    }

    // Botón de cotización móvil - scroll al formulario
    if (btnMobileCotizar) {
        btnMobileCotizar.addEventListener('click', function() {
            closeMobileMenu();
            scrollToContact();
        });
    }
    
    // Botón de llamar - abrir teléfono
    if (btnLlamar) {
        btnLlamar.addEventListener('click', function() {
            window.location.href = 'tel:+573043137664';
        });
    }
    
    // Botones de precios - scroll al formulario
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Pre-llenar el formulario con el tipo de servicio
                const serviceType = this.closest('.pricing-card').querySelector('h3').textContent;
                const serviceSelect = document.querySelector('select');
                if (serviceSelect) {
                    const option = Array.from(serviceSelect.options).find(opt => 
                        opt.textContent.toLowerCase().includes(serviceType.toLowerCase().split(' ')[0])
                    );
                    if (option) {
                        serviceSelect.value = option.value;
                    }
                }
            }
        });
    });
    
    // Header fijo con efecto de transparencia
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // Validación del formulario (Netlify Forms se encarga del envío)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Validación básica antes del envío
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    field.style.borderColor = '#e9ecef';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }
            
            // Mostrar estado de envío
            const submitButton = this.querySelector('.btn-submit');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            // Netlify Forms manejará el envío automáticamente
            // El formulario se enviará normalmente sin preventDefault()
        });
    }
    
    // Funciones del menú móvil
    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners para el menú móvil
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Cerrar menú móvil con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Funcionalidad del botón de WhatsApp
    if (whatsappFloat) {
        // Mostrar/ocultar botón según scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                whatsappFloat.style.transform = 'translateY(100px)';
                whatsappFloat.style.opacity = '0.7';
            } else {
                // Scrolling up
                whatsappFloat.style.transform = 'translateY(0)';
                whatsappFloat.style.opacity = '1';
            }
            
            lastScrollTop = scrollTop;
        });

        // Efecto hover mejorado
        const whatsappLink = whatsappFloat.querySelector('.whatsapp-link');
        if (whatsappLink) {
            whatsappLink.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            whatsappLink.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }

        // Click tracking (opcional - para analytics)
        whatsappFloat.addEventListener('click', function() {
            // Aquí puedes agregar tracking de analytics
            console.log('WhatsApp button clicked');
        });
    }

    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        // Estilos del contenido
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        // Estilos del botón de cerrar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: auto;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Función para cerrar
        const closeNotification = () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeNotification);
        
        // Auto-cerrar después de 5 segundos
        setTimeout(closeNotification, 5000);
    }
});

// Funciones globales
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// Función para abrir WhatsApp
window.openWhatsApp = function(message = 'Hola, me interesa solicitar una cotización para una mudanza.') {
    const phoneNumber = '573108198934'; // Número de teléfono actualizado
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};
