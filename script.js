// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Add event listener to toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Check for system preference on first load
        if (!localStorage.getItem('theme')) {
            this.checkSystemPreference();
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        
        // Add animation effect
        this.addThemeTransitionEffect();
    }

    checkSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.theme = 'dark';
            document.documentElement.setAttribute('data-theme', this.theme);
            localStorage.setItem('theme', this.theme);
        }
    }

    addThemeTransitionEffect() {
        // Add a brief flash effect during theme transition
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this.theme === 'dark' ? '#000' : '#fff'};
            opacity: 0.1;
            z-index: 9999;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }, 50);
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Update button icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicator
const scrollIndicator = document.getElementById('scrollIndicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
    });
}

// Navbar background on scroll
const navbar = document.getElementById('navbar');
if (navbar) {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background based on scroll position
        if (scrollTop > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section > div').forEach(el => {
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// Newsletter subscription
const newsletterBtn = document.querySelector('button[type="button"]');
const emailInput = document.querySelector('input[type="email"]');

if (newsletterBtn && emailInput) {
    newsletterBtn.addEventListener('click', function() {
        const email = emailInput.value;
        if (email && email.includes('@')) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Terima kasih! Anda telah berlangganan newsletter Ivento.',
                confirmButtonColor: '#0ea5e9',
            });
            emailInput.value = '';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Email tidak valid',
                text: 'Silakan masukkan alamat email yang valid.',
                confirmButtonColor: '#ef4444',
            });
        }
    });
}

// Product cards hover effect
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Enhanced card-3d hover effects
document.querySelectorAll('.card-3d').forEach(card => {
    // Add mouse enter event
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'rotateY(10deg) rotateX(10deg) scale(1.05)';
        this.style.boxShadow = 'var(--shadow-xl), 0 0 30px rgba(14, 165, 233, 0.2)';
        this.style.borderColor = 'var(--accent-primary)';
        
        // Animate icon
        const icon = this.querySelector('.w-12, .w-16');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        }
        
        // Animate title
        const title = this.querySelector('h3');
        if (title) {
            title.style.color = 'var(--accent-primary)';
            title.style.transform = 'translateY(-2px)';
        }
        
        // Animate description
        const desc = this.querySelector('p');
        if (desc) {
            desc.style.transform = 'translateY(-1px)';
            desc.style.color = 'var(--text-secondary)';
        }
    });
    
    // Add mouse leave event
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        this.style.boxShadow = 'var(--card-shadow)';
        this.style.borderColor = 'var(--card-border)';
        
        // Reset icon
        const icon = this.querySelector('.w-12, .w-16');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.boxShadow = 'none';
        }
        
        // Reset title
        const title = this.querySelector('h3');
        if (title) {
            title.style.color = 'var(--text-primary)';
            title.style.transform = 'translateY(0)';
        }
        
        // Reset description
        const desc = this.querySelector('p');
        if (desc) {
            desc.style.transform = 'translateY(0)';
            desc.style.color = 'var(--text-secondary)';
        }
    });
    
    // Add touch events for mobile
    card.addEventListener('touchstart', function() {
        this.style.transform = 'rotateY(5deg) rotateX(5deg) scale(1.02)';
    });
    
    card.addEventListener('touchend', function() {
        setTimeout(() => {
            this.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        }, 200);
    });
});

// Add parallax effect to hero section
const heroSection = document.querySelector('.morphing-bg');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.text-2xl, .text-3xl, .text-4xl');
    counters.forEach(counter => {
        const text = counter.textContent;
        const numbers = text.match(/\d+/g);
        if (numbers) {
            const target = parseInt(numbers[0]);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = text.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = text.replace(/\d+/, Math.floor(current));
                }
            }, 20);
        }
    });
}

// Trigger counter animation when statistics section is visible
const statsSection = document.querySelector('#tentang');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statsObserver.observe(statsSection);
}

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Mohon lengkapi semua field yang diperlukan.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Mohon masukkan email yang valid.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Responsive image loading
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states for better UX
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Touch gesture support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Performance optimization for scroll events
let ticking = false;

function updateOnScroll() {
    // Scroll indicator update
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
    }
    
    // Navbar update
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    }
    
    // Parallax effect
    const parallax = document.querySelector('#beranda');
    if (parallax) {
        const speed = scrollTop * 0.5;
        parallax.style.backgroundPosition = `center ${speed}px`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }
    
    // Space/Enter key for theme toggle
    if ((e.key === ' ' || e.key === 'Enter') && e.target.id === 'themeToggle') {
        e.preventDefault();
        themeManager.toggleTheme();
    }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (example)
function trackEvent(eventName, eventData = {}) {
    // Replace with your analytics service
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', () => {
    // Track theme changes
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            trackEvent('theme_toggle', { theme: themeManager.theme });
        });
    }
    
    // Track form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', () => {
            trackEvent('form_submit', { form_type: form.id || 'contact' });
        });
    });
    
    // Track product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productName = card.querySelector('h3')?.textContent || 'Unknown';
            trackEvent('product_click', { product: productName });
        });
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    trackEvent('js_error', { 
        message: e.message, 
        filename: e.filename, 
        lineno: e.lineno 
    });
});

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        
        trackEvent('page_load_time', { load_time: loadTime });
        
        if (loadTime > 3000) {
            console.warn('Page load time is slow:', loadTime + 'ms');
        }
    }
});

// Product Image Manager
class ProductImageManager {
    constructor() {
        this.init();
    }

    init() {
        this.handleImageLoading();
        this.handleImageErrors();
        this.addProductCardInteractions();
    }

    handleImageLoading() {
        const productImages = document.querySelectorAll('.product-card img');
        
        productImages.forEach(img => {
            const card = img.closest('.product-card');
            
            // Add loading state
            if (card) {
                card.classList.add('loading');
            }
            
            // Handle image load
            img.addEventListener('load', () => {
                if (card) {
                    card.classList.remove('loading');
                }
            });
            
            // Handle image error
            img.addEventListener('error', () => {
                if (card) {
                    card.classList.remove('loading');
                    card.classList.add('error');
                }
                this.setFallbackImage(img);
            });
        });
    }

    handleImageErrors() {
        const productImages = document.querySelectorAll('.product-card img');
        
        productImages.forEach(img => {
            // Set default fallback image if src is empty or invalid
            if (!img.src || img.src === window.location.href) {
                this.setFallbackImage(img);
            }
        });
    }

    setFallbackImage(img) {
        const card = img.closest('.product-card');
        
        // Set a default placeholder image
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDEzMCAxMDBDMTMwIDExNi41NjkgMTE2LjU2OSAxMzAgMTAwIDEzMEM4My40MzEgMTMwIDcwIDExNi41NjkgNzAgMTAwQzcwIDgzLjQzMSA4My40MzEgNzAgMTAwIDcwWiIgZmlsbD0iI0QxRDU5QSIvPgo8cGF0aCBkPSJNMTAwIDE0MEMxMTYuNTY5IDE0MCAxMzAgMTUzLjQzMSAxMzAgMTcwQzEzMCAxODYuNTY5IDExNi41NjkgMjAwIDEwMCAyMDBDODMuNDMxIDIwMCA3MCAxODYuNTY5IDcwIDE3MEM3MCAxNTMuNDMxIDgzLjQzMSAxNDAgMTAwIDE0MFoiIGZpbGw9IiNEQ0U3RkYiLz4KPC9zdmc+';
        img.alt = 'Product Image Placeholder';
        
        if (card) {
            card.classList.remove('error');
        }
    }

    addProductCardInteractions() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            // Add click event for mobile
            card.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    this.handleCardClick(card, e);
                }
            });
            
            // Add keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleCardClick(card, e);
                }
            });
            
            // Make cards focusable
            card.setAttribute('tabindex', '0');
        });
    }

    handleCardClick(card, event) {
        // Prevent default if it's a link or button
        if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
            return;
        }
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Here you can add navigation to product detail page
        console.log('Product card clicked:', card.querySelector('h3')?.textContent);
    }

    // Method to preload images for better performance
    preloadImages() {
        const productImages = document.querySelectorAll('.product-card img');
        const imageUrls = Array.from(productImages).map(img => img.src).filter(src => src);
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Method to lazy load images
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
}

// Initialize Product Image Manager
const productImageManager = new ProductImageManager();

// FAQ Accordion Animation (Accordion Mode)
document.querySelectorAll('.faq-accordion .faq-item').forEach((item, idx, allItems) => {
  const btn = item.querySelector('.faq-question');
  const content = item.querySelector('.faq-content');
  const icon = btn.querySelector('i');
  content.style.maxHeight = '0px';
  content.style.opacity = '0';
  content.style.transform = 'translateY(16px)';
  content.style.marginTop = '0';
  let isOpen = false;

  btn.addEventListener('click', function() {
    // Tutup semua FAQ lain
    allItems.forEach((other, i) => {
      if (other !== item) {
        const otherContent = other.querySelector('.faq-content');
        const otherBtn = other.querySelector('.faq-question');
        const otherIcon = otherBtn.querySelector('i');
        otherContent.style.maxHeight = '0px';
        otherContent.style.opacity = '0';
        otherContent.style.transform = 'translateY(16px)';
        otherContent.style.marginTop = '0';
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        other.isOpen = false;
      }
    });
    // Toggle FAQ yang diklik
    if (isOpen) {
      // Close
      content.style.maxHeight = content.scrollHeight + 'px';
      requestAnimationFrame(() => {
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        content.style.transform = 'translateY(16px)';
        content.style.marginTop = '0';
        if (icon) icon.style.transform = 'rotate(0deg)';
      });
      isOpen = false;
    } else {
      // Open
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
      content.style.marginTop = '0.5rem';
      if (icon) icon.style.transform = 'rotate(90deg)';
      isOpen = true;
      setTimeout(() => {
        if (isOpen) content.style.maxHeight = 'none';
      }, 400);
    }
  });
});

// Theme Toggle (Uiverse.io)
const themeSwitchCheckbox = document.getElementById('themeSwitchCheckbox');

// Set initial state
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.setAttribute('data-theme', 'dark');
  if (themeSwitchCheckbox) themeSwitchCheckbox.checked = true;
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  if (themeSwitchCheckbox) themeSwitchCheckbox.checked = false;
}

if (themeSwitchCheckbox) {
  themeSwitchCheckbox.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
}

// Hero Slideshow
const heroSlideshow = document.querySelector('.hero-slideshow');
const heroProgressBar = document.querySelector('.hero-progress-bar');
if (heroSlideshow && heroProgressBar) {
  const images = [
    'assets/SlideShow-1.jpg',
    'assets/SlideShow-2.jpg'
  ];
  let current = 0;
  let prev = null;
  // Create image divs
  images.forEach((img, i) => {
    const div = document.createElement('div');
    div.className = 'hero-slideshow-image' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = `url('${img}')`;
    heroSlideshow.appendChild(div);
  });
  // Progress bar
  const bar = document.createElement('div');
  bar.className = 'hero-progress-bar-inner';
  heroProgressBar.appendChild(bar);

  function nextSlide() {
    const slides = heroSlideshow.querySelectorAll('.hero-slideshow-image');
    prev = current;
    current = (current + 1) % images.length;
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev');
      if (i === current) slide.classList.add('active');
      if (i === prev) slide.classList.add('prev');
    });
    // Reset and animate progress bar
    bar.style.transition = 'none';
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.transition = 'width 5s linear';
      bar.style.width = '100%';
    }, 50);
  }

  // Start progress bar
  setTimeout(() => { bar.style.width = '100%'; }, 100);
  setInterval(nextSlide, 5000);
} 