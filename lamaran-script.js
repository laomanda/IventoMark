// Lamaran Page JavaScript

// Toggle job details
function toggleDetails(button) {
    const details = button.parentElement.querySelector('.job-details');
    const isActive = details.classList.contains('active');
    
    // Close all other details
    document.querySelectorAll('.job-details').forEach(detail => {
        detail.classList.remove('active');
    });
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.textContent = 'Lihat Detail';
    });
    
    if (!isActive) {
        details.classList.add('active');
        button.textContent = 'Tutup Detail';
    }
}

// Toggle FAQ
function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    const isActive = answer.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.classList.remove('active');
    });
    
    if (!isActive) {
        answer.classList.add('active');
    }
}

// Apply for job
function applyJob(position) {
    alert(`Terima kasih atas minat Anda untuk posisi ${position}!\n\nSilakan kirim CV dan portfolio Anda ke:\ncareers@invento.com\n\nSubject: Lamaran ${position} - [Nama Anda]`);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.job-card, .faq-item, .contact-item').forEach(card => {
        observer.observe(card);
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

// Mind Mapping Organizational Structure Functions
function showDeptDetails(deptId) {
    // Hide all department details first
    const allDetails = document.querySelectorAll('.dept-details');
    allDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Show the clicked department details
    const targetDetails = document.getElementById(`${deptId}-details`);
    if (targetDetails) {
        targetDetails.classList.add('active');
        
        // Add click outside to close functionality
        setTimeout(() => {
            const closeDetails = function(e) {
                if (!targetDetails.contains(e.target) && !e.target.closest('.dept-node')) {
                    targetDetails.classList.remove('active');
                    document.removeEventListener('click', closeDetails);
                }
            };
            document.addEventListener('click', closeDetails);
        }, 100);
    }
}

// Initialize mind mapping animations
function initMindMap() {
    const centralNode = document.querySelector('.central-node');
    const deptNodes = document.querySelectorAll('.dept-node');
    
    if (centralNode) {
        // Add click animation to central node
        centralNode.addEventListener('click', function() {
            this.style.transform = 'translate(-50%, -50%) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 150);
        });
    }
    
    // Add hover effects to department nodes
    deptNodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.zIndex = '15';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.zIndex = '5';
        });
        
        // Add click feedback
        node.addEventListener('click', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.05)';
            }, 150);
        });
    });
}

// Enhanced department details with smooth transitions
function enhanceDeptDetails() {
    const deptNodes = document.querySelectorAll('.dept-node');
    
    deptNodes.forEach(node => {
        const details = node.querySelector('.dept-details');
        if (details) {
            // Add entrance animation
            details.style.transform = 'translateX(-50%) translateY(-10px)';
            details.style.opacity = '0';
            
            // Add smooth transition when showing
            details.addEventListener('transitionend', function() {
                if (this.classList.contains('active')) {
                    this.style.transform = 'translateX(-50%) translateY(10px)';
                }
            });
        }
    });
}

// Culture values interaction
function initCultureValues() {
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(14, 165, 233, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize all mind mapping features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mind mapping features
    initMindMap();
    enhanceDeptDetails();
    initCultureValues();
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe mind map elements
    const mindMapElements = document.querySelectorAll('.mind-map-container, .culture-values');
    mindMapElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add error handling for mind mapping
    try {
        // Check if SVG connection lines are working
        const connectionLines = document.querySelector('.connection-lines');
        if (connectionLines) {
            const lines = connectionLines.querySelectorAll('.connection-line');
            lines.forEach((line, index) => {
                // Ensure lines are visible
                line.style.stroke = 'var(--accent-primary)';
                line.style.strokeWidth = '3';
                line.style.strokeLinecap = 'round';
            });
        }
    } catch (error) {
        console.log('Mind mapping connection lines error:', error);
    }
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
}); 