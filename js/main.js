'use strict';

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        initHamburgerMenu();
        initSmoothScrolling();
        initVideoPlayers();
        initCalendarNavigation();
        initScrollAnimations();
        initMobileOptimizations();
    } catch (error) {
        console.error('Error initializing scripts:', error);
    }
});

// Hamburger menu functionality
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (!hamburger || !navList) return;
    
    hamburger.addEventListener('click', function() {
        navList.classList.toggle('open');
        hamburger.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking on nav links
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('open');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('open');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Video player functionality
function initVideoPlayers() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Create modal for video playback
            const modal = createVideoModal();
            document.body.appendChild(modal);
            
            // Show modal
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.close-modal');
            const modalOverlay = modal.querySelector('.modal-overlay');
            
            function closeModal() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
            
            closeBtn.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', closeModal);
            
            // Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });
    });
}

// Create video modal
function createVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="close-modal" aria-label="Cerrar video">&times;</button>
            <div class="video-container">
                <div class="video-placeholder">
                    <h3>Video de Demostración</h3>
                    <p>Este es un placeholder para el contenido de video.</p>
                    <p>En una implementación real, aquí se cargaría el video correspondiente.</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .video-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
        }
        
        .modal-content {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 8px;
            max-width: 800px;
            width: 90%;
            max-height: 90%;
            overflow: hidden;
        }
        
        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 2rem;
            color: #666;
            cursor: pointer;
            z-index: 1;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .close-modal:hover {
            background: #f0f0f0;
            color: #333;
        }
        
        .video-container {
            padding: 2rem;
            text-align: center;
        }
        
        .video-placeholder {
            padding: 4rem 2rem;
            background: #f8f9fa;
            border-radius: 8px;
            color: #666;
        }
        
        .video-placeholder h3 {
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
    `;
    
    if (!document.querySelector('#video-modal-styles')) {
        style.id = 'video-modal-styles';
        document.head.appendChild(style);
    }
    
    return modal;
}

// Calendar navigation functionality
function initCalendarNavigation() {
    const calendarNavs = document.querySelectorAll('.calendar-nav');
    const calendarHeader = document.querySelector('.calendar-header h3');
    
    if (!calendarHeader) return;
    
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    let currentMonth = 6; // July (0-indexed)
    let currentYear = 2025;
    
    calendarNavs.forEach((nav, index) => {
        nav.addEventListener('click', function() {
            if (index === 0) { // Previous month
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
            } else { // Next month
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
            }
            
            calendarHeader.textContent = `${months[currentMonth]} ${currentYear}`;
            
            // Add animation effect
            calendarHeader.style.transform = 'scale(0.95)';
            setTimeout(() => {
                calendarHeader.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .destacado-card,
        .whitepaper-card,
        .video-card,
        .news-card,
        .partner-logo
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Mobile optimizations
function initMobileOptimizations() {
    // Optimize touch interactions
    const cards = document.querySelectorAll(`
        .service-card,
        .destacado-card,
        .whitepaper-card,
        .video-card,
        .news-card
    `);
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.scrollTo(0, window.scrollY);
        }, 100);
    });
    
    // Optimize scroll performance
    let ticking = false;
    
    function updateScrollPosition() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (scrolled > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--secondary-color)';
            header.style.backdropFilter = 'none';
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle form submissions (if any forms are added later)
function handleFormSubmissions() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = '¡Mensaje enviado correctamente!';
            successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                z-index: 1000;
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    });
}

// Initialize additional features when needed
function initAdditionalFeatures() {
    handleFormSubmissions();
    
    // Add loading states for interactive elements
    const interactiveElements = document.querySelectorAll('button, .btn, .btn-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Optional: Show user-friendly error message
    if (process.env.NODE_ENV === 'development') {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #ff4444;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 1000;
            max-width: 300px;
            font-size: 0.9rem;
        `;
        errorDiv.textContent = `Error: ${e.error.message}`;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Initialize additional features after initial load
setTimeout(initAdditionalFeatures, 1000);
