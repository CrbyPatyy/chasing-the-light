// Register service worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        try {
            navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
        } catch (error) {
            console.error('Service Worker registration error:', error);
        }
    });
}

// Enhanced JavaScript with GSAP and all requested features

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
        // You could send this to an error tracking service
    });
    
    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Loading screen animation with GSAP
    try {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingTimeline = gsap.timeline();
        
        loadingTimeline
            .to('.loading-logo', {
                duration: 1.5,
                opacity: 1,
                y: 0,
                ease: "power2.out"
            })
            .to(loadingScreen, {
                duration: 0.8,
                opacity: 0,
                ease: "power2.inOut",
                onComplete: function() {
                    loadingScreen.style.display = 'none';
                    // Initialize page animations after loading
                    initPageAnimations();
                }
            });
    } catch (error) {
        console.error('Loading animation error:', error);
        // Fallback: hide loading screen immediately
        document.getElementById('loadingScreen').style.display = 'none';
        initPageAnimations();
    }
    
    // Motion toggle
    const motionToggle = document.getElementById('motionToggle');
    motionToggle.addEventListener('click', function() {
        document.body.classList.toggle('reduce-motion');
        this.textContent = document.body.classList.contains('reduce-motion') 
            ? 'Enable Motion' 
            : 'Reduce Motion';
        this.setAttribute('aria-label', 
            document.body.classList.contains('reduce-motion') 
            ? 'Enable motion effects' 
            : 'Reduce motion effects');
        
        // Update GSAP animations based on preference
        if (document.body.classList.contains('reduce-motion')) {
            gsap.globalTimeline.timeScale(0.1);
        } else {
            gsap.globalTimeline.timeScale(1);
        }
    });
    
    // Initialize page animations
    function initPageAnimations() {
        try {
            // Hero section animations
            animateHeroSection();
            
            // Scroll progress indicator
            initScrollProgress();
            
            // Custom cursor - only initialize on non-touch devices
            if (!isTouchDevice) {
                initCustomCursor();
            }
            
            // Scroll-triggered animations for sections
            initScrollAnimations();
            
            // Interactive elements animations
            initInteractiveAnimations();
            
            // Mobile menu functionality
            initMobileMenu();
            
            // Form enhancements
            initFormEnhancements();
            
            // Offline detection
            initOfflineDetection();
            
            // Particle effects for hero section
            if (!document.body.classList.contains('reduce-motion')) {
                initParticleEffects();
            }
        } catch (error) {
            console.error('Animation initialization error:', error);
            // Fallback: ensure content is visible
            document.querySelectorAll('.section-transition').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }
    
    // Hero section animations
    function animateHeroSection() {
        try {
            const headline = document.querySelector('.headline');
            const headlineSpans = document.querySelectorAll('.headline span');
            const subtext = document.querySelector('.subtext');
            const heroCta = document.querySelector('.hero-cta');
            const eyebrow = document.querySelector('.eyebrow');
            const scrollIndicator = document.querySelector('.scroll-indicator');
            
            // Create a timeline for hero animations
            const heroTimeline = gsap.timeline();
            
            // Animate eyebrow
            heroTimeline.fromTo(eyebrow, 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );
            
            // Animate headline with staggered text reveal
            headlineSpans.forEach((span, index) => {
                heroTimeline.fromTo(span,
                    { opacity: 0, y: 30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1, 
                        ease: "power2.out",
                        delay: index * 0.2
                    },
                    "-=0.5"
                );
            });
            
            // Animate subtext
            heroTimeline.fromTo(subtext,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                "-=0.5"
            );
            
            // Animate CTA buttons
            heroTimeline.fromTo(heroCta,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                "-=0.5"
            );
            
            // Animate scroll indicator
            heroTimeline.fromTo(scrollIndicator,
                { opacity: 0, scaleY: 0 },
                { opacity: 1, scaleY: 1, duration: 1, ease: "power2.out" },
                "-=0.5"
            );
            
            // Add parallax effect to eyebrow and headline on scroll
            if (!document.body.classList.contains('reduce-motion')) {
                gsap.to(eyebrow, {
                    y: -100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".hero",
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
                
                gsap.to(".headline", {
                    y: 50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".hero",
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        } catch (error) {
            console.error('Hero animation error:', error);
        }
    }
    
    // Scroll progress indicator
    function initScrollProgress() {
        try {
            const scrollProgress = document.getElementById('scrollProgress');
            
            gsap.to(scrollProgress, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });
        } catch (error) {
            console.error('Scroll progress error:', error);
        }
    }
    
    // Custom cursor with GSAP
    function initCustomCursor() {
        try {
            const cursorDot = document.getElementById('cursorDot');
            const cursorRing = document.getElementById('cursorRing');
            
            // Set initial position
            gsap.set([cursorDot, cursorRing], {x: window.innerWidth / 2, y: window.innerHeight / 2});
            
            // Follow mouse movement
            window.addEventListener('mousemove', (e) => {
                gsap.to(cursorDot, {
                    duration: 0.1,
                    x: e.clientX,
                    y: e.clientY
                });
                
                gsap.to(cursorRing, {
                    duration: 0.3,
                    x: e.clientX,
                    y: e.clientY
                });
            });
            
            // Hover effects
            const hoverElements = document.querySelectorAll('a, button, .item, .portfolio-item, .pricing-card, .testimonial, .pricing-cta, .form-submit, input, textarea, select');
            
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    document.body.classList.add('cursor-hover');
                    gsap.to(cursorRing, {
                        duration: 0.3,
                        scale: 1.5
                    });
                });
                
                el.addEventListener('mouseleave', () => {
                    document.body.classList.remove('cursor-hover');
                    gsap.to(cursorRing, {
                        duration: 0.3,
                        scale: 1
                    });
                });
            });
            
            // Magnetic buttons
            const magneticButtons = document.querySelectorAll('.btn, .pricing-cta');
            
            magneticButtons.forEach(button => {
                button.addEventListener('mousemove', (e) => {
                    if (document.body.classList.contains('reduce-motion')) return;
                    
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const deltaX = (x - centerX) * 0.1;
                    const deltaY = (y - centerY) * 0.1;
                    
                    gsap.to(button, {
                        duration: 0.5,
                        x: deltaX,
                        y: deltaY,
                        ease: "power2.out"
                    });
                });
                
                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        duration: 0.5,
                        x: 0,
                        y: 0,
                        ease: "elastic.out(1, 0.5)"
                    });
                });
            });
        } catch (error) {
            console.error('Custom cursor error:', error);
        }
    }
    
    // Scroll-triggered animations
    function initScrollAnimations() {
        try {
            // Animate elements on scroll
            const animatedElements = gsap.utils.toArray('.item, .portfolio-item, .pricing-card, .testimonial, .result-stat, .process-step, .about-text, .about-image, .stat, .contact-info, .contact-form-container, .faq-item');
            
            animatedElements.forEach(element => {
                gsap.fromTo(element, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
            
            // Stagger animations for grid items
            const gridItems = gsap.utils.toArray('.broken-grid .item, .portfolio-grid .portfolio-item, .pricing-grid .pricing-card');
            
            gridItems.forEach((container, index) => {
                const items = container.querySelectorAll('.item, .portfolio-item, .pricing-card');
                
                gsap.fromTo(items, {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 70%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
            
            // Parallax effects for specific elements
            if (!document.body.classList.contains('reduce-motion')) {
                gsap.to(".hero", {
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".hero",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        } catch (error) {
            console.error('Scroll animations error:', error);
        }
    }
    
    // Interactive elements animations
    function initInteractiveAnimations() {
        try {
            // Hover animations for cards
            const cards = document.querySelectorAll('.item, .portfolio-item, .pricing-card, .testimonial');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    if (document.body.classList.contains('reduce-motion')) return;
                    
                    gsap.to(card, {
                        duration: 0.3,
                        y: -10,
                        scale: 1.02,
                        ease: "power2.out"
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    if (document.body.classList.contains('reduce-motion')) return;
                    
                    gsap.to(card, {
                        duration: 0.3,
                        y: 0,
                        scale: 1,
                        ease: "power2.out"
                    });
                });
            });
            
            // Button hover animations
            const buttons = document.querySelectorAll('.btn, .pricing-cta');
            
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    if (document.body.classList.contains('reduce-motion')) return;
                    
                    gsap.to(button, {
                        duration: 0.2,
                        scale: 1.05,
                        ease: "power2.out"
                    });
                });
                
                button.addEventListener('mouseleave', () => {
                    if (document.body.classList.contains('reduce-motion')) return;
                    
                    gsap.to(button, {
                        duration: 0.2,
                        scale: 1,
                        ease: "power2.out"
                    });
                });
            });
            
            // FAQ accordion animations
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-icon');
                
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            gsap.to(otherItem.querySelector('.faq-answer'), {
                                duration: 0.3,
                                height: 0,
                                opacity: 0,
                                ease: "power2.inOut"
                            });
                            gsap.to(otherItem.querySelector('.faq-icon'), {
                                duration: 0.3,
                                rotation: 0,
                                ease: "power2.inOut"
                            });
                        }
                    });
                    
                    // Toggle current item
                    if (!isActive) {
                        item.classList.add('active');
                        gsap.to(answer, {
                            duration: 0.3,
                            height: "auto",
                            opacity: 1,
                            ease: "power2.out"
                        });
                        gsap.to(icon, {
                            duration: 0.3,
                            rotation: 45,
                            ease: "power2.out"
                        });
                    } else {
                        item.classList.remove('active');
                        gsap.to(answer, {
                            duration: 0.3,
                            height: 0,
                            opacity: 0,
                            ease: "power2.inOut"
                        });
                        gsap.to(icon, {
                            duration: 0.3,
                            rotation: 0,
                            ease: "power2.inOut"
                        });
                    }
                });
            });
        } catch (error) {
            console.error('Interactive animations error:', error);
        }
    }
    
    // Mobile menu functionality
    function initMobileMenu() {
        try {
            const mobileMenu = document.getElementById('mobileMenu');
            const sidebar = document.getElementById('sidebar');
            
            if (mobileMenu && sidebar) {
                mobileMenu.addEventListener('click', function() {
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    
                    this.classList.toggle('active');
                    sidebar.classList.toggle('mobile-open');
                    this.setAttribute('aria-expanded', !isExpanded);
                    
                    // Animate sidebar
                    if (!isExpanded) {
                        gsap.to(sidebar, {
                            duration: 0.3,
                            x: 0,
                            ease: "power2.out"
                        });
                    } else {
                        gsap.to(sidebar, {
                            duration: 0.3,
                            x: '-100%',
                            ease: "power2.in"
                        });
                    }
                });
                
                // Close menu when clicking on a link
                const navLinks = sidebar.querySelectorAll('.nav a');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.remove('active');
                        sidebar.classList.remove('mobile-open');
                        mobileMenu.setAttribute('aria-expanded', 'false');
                        
                        gsap.to(sidebar, {
                            duration: 0.3,
                            x: '-100%',
                            ease: "power2.in"
                        });
                    });
                });
            }
        } catch (error) {
            console.error('Mobile menu error:', error);
        }
    }
    
    // Form enhancements
    function initFormEnhancements() {
        try {
            const contactForm = document.getElementById('contactForm');
            
            if (contactForm) {
                // Real-time validation
                const inputs = contactForm.querySelectorAll('input, textarea, select');
                
                inputs.forEach(input => {
                    input.addEventListener('blur', function() {
                        validateField(this);
                    });
                    
                    input.addEventListener('input', function() {
                        clearError(this);
                        
                        // Add loading state for async validation if needed
                        if (this.type === 'email' && this.value.length > 3) {
                            // Simulate async validation
                            this.classList.add('loading');
                            setTimeout(() => {
                                this.classList.remove('loading');
                                validateField(this);
                            }, 500);
                        }
                    });
                });
                
                // Form submission with animation
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Validate all fields
                    let isValid = true;
                    inputs.forEach(input => {
                        if (!validateField(input)) {
                            isValid = false;
                        }
                    });
                    
                    if (!isValid) {
                        // Shake form to indicate error
                        gsap.to(contactForm, {
                            duration: 0.5,
                            x: 10,
                            ease: "power2.inOut",
                            yoyo: true,
                            repeat: 1
                        });
                        return;
                    }
                    
                    // Show loading state
                    const submitButton = contactForm.querySelector('.form-submit');
                    const originalText = submitButton.textContent;
                    
                    gsap.to(submitButton, {
                        duration: 0.3,
                        backgroundColor: '#3d6449',
                        onComplete: function() {
                            submitButton.textContent = 'Sending...';
                            submitButton.disabled = true;
                        }
                    });
                    
                    // Simulate form submission (replace with actual AJAX call)
                    setTimeout(() => {
                        // Show success message
                        showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Reset button
                        gsap.to(submitButton, {
                            duration: 0.3,
                            backgroundColor: '#4a7c59',
                            onComplete: function() {
                                submitButton.textContent = originalText;
                                submitButton.disabled = false;
                            }
                        });
                        
                        // Clear all error messages
                        document.querySelectorAll('.error-message').forEach(msg => {
                            msg.textContent = '';
                        });
                    }, 2000);
                });
            }
            
            // Validation functions
            function validateField(field) {
                const errorElement = document.getElementById(field.id + 'Error');
                const formGroup = field.closest('.form-group');
                
                // Clear previous states
                if (formGroup) {
                    formGroup.classList.remove('valid', 'invalid');
                }
                
                if (errorElement) {
                    errorElement.textContent = '';
                }
                
                // Check required fields
                if (field.hasAttribute('required') && !field.value.trim()) {
                    if (errorElement) {
                        errorElement.textContent = 'This field is required';
                    }
                    if (formGroup) {
                        formGroup.classList.add('invalid');
                    }
                    return false;
                }
                
                // Email validation
                if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        if (errorElement) {
                            errorElement.textContent = 'Please enter a valid email address';
                        }
                        if (formGroup) {
                            formGroup.classList.add('invalid');
                        }
                        return false;
                    }
                }
                
                // If valid, mark as valid
                if (formGroup && field.value) {
                    formGroup.classList.add('valid');
                }
                
                return true;
            }
            
            function clearError(field) {
                const errorElement = document.getElementById(field.id + 'Error');
                const formGroup = field.closest('.form-group');
                
                if (errorElement) {
                    errorElement.textContent = '';
                }
                
                if (formGroup) {
                    formGroup.classList.remove('invalid');
                }
            }
            
            function showFormMessage(message, type) {
                const formMessage = document.getElementById('formMessage');
                if (formMessage) {
                    formMessage.textContent = message;
                    formMessage.className = `form-message ${type}`;
                    formMessage.style.display = 'block';
                    
                    // Animate in
                    gsap.fromTo(formMessage, 
                        { opacity: 0, y: -10 },
                        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
                    );
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        gsap.to(formMessage, {
                            opacity: 0,
                            y: -10,
                            duration: 0.3,
                            ease: "power2.in",
                            onComplete: function() {
                                formMessage.style.display = 'none';
                            }
                        });
                    }, 5000);
                }
            }
        } catch (error) {
            console.error('Form enhancements error:', error);
        }
    }
    
    // Offline detection
    function initOfflineDetection() {
        try {
            const offlineMessage = document.getElementById('offlineMessage');
            
            window.addEventListener('online', function() {
                gsap.to(offlineMessage, {
                    duration: 0.3,
                    opacity: 0,
                    y: 20,
                    ease: "power2.out",
                    onComplete: function() {
                        offlineMessage.style.display = 'none';
                    }
                });
            });
            
            window.addEventListener('offline', function() {
                offlineMessage.style.display = 'block';
                gsap.fromTo(offlineMessage, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
                );
            });
        } catch (error) {
            console.error('Offline detection error:', error);
        }
    }
    
    // Particle effects for hero section
    function initParticleEffects() {
        try {
            const particlesContainer = document.getElementById('particlesContainer');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size and position
                const size = Math.random() * 4 + 1;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                
                particlesContainer.appendChild(particle);
                
                // Animate particle
                gsap.to(particle, {
                    duration: Math.random() * 10 + 10,
                    x: `+=${(Math.random() - 0.5) * 100}`,
                    y: `+=${(Math.random() - 0.5) * 100}`,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        } catch (error) {
            console.error('Particle effects error:', error);
        }
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                updateActiveNav();
            }, 10);
        }
    });
    
    // Initialize active nav on load
    updateActiveNav();
});