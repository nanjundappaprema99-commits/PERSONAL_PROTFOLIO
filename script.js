/**
 * PRAGNA S N - PERSONAL PORTFOLIO JAVASCRIPT
 * Stack: Pure Vanilla JavaScript (ES6+)
 * Functionalities: Mobile Menu Toggle, Sticky Nav, Smooth Scroll, 
 * Scroll Animations, Active Nav Highlighting, Contact Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. DOM ELEMENTS
       ========================================================================== */
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const currentYearEl = document.getElementById('current-year');

    /* Set Dynamic Footer Copyright Year */
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       2. MOBILE NAVIGATION MENU TOGGLE
       ========================================================================== */
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('show-menu');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close mobile drawer when clicking any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }

    function openMobileMenu() {
        navMenu.classList.add('show-menu');
        navToggle.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMobileMenu() {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    /* ==========================================================================
       3. STICKY HEADER & BACK-TO-TOP BUTTON ON SCROLL
       ========================================================================== */
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky Header backdrop
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back To Top button visibility
        if (scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       4. ACTIVE NAVIGATION LINK HIGHLIGHTING
       ========================================================================== */
    function highlightActiveNav() {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);

    /* ==========================================================================
       5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve once revealed for performance
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       6. CONTACT FORM VALIDATION & SUBMISSION
       ========================================================================== */
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous errors & statuses
            clearFormErrors();
            
            // Get Form Fields
            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const subjectInput = document.getElementById('contact-subject');
            const messageInput = document.getElementById('contact-message');

            let isValid = true;

            // Validate Name
            if (!nameInput.value.trim()) {
                showFieldError(nameInput, 'name-error', 'Please enter your full name.');
                isValid = false;
            }

            // Validate Email
            if (!emailInput.value.trim()) {
                showFieldError(emailInput, 'email-error', 'Please enter your email address.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showFieldError(emailInput, 'email-error', 'Please enter a valid email address (e.g., user@example.com).');
                isValid = false;
            }

            // Validate Subject
            if (!subjectInput.value.trim()) {
                showFieldError(subjectInput, 'subject-error', 'Please enter a subject.');
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                showFieldError(messageInput, 'message-error', 'Please enter your message.');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showFieldError(messageInput, 'message-error', 'Message must be at least 10 characters long.');
                isValid = false;
            }

            // If valid, simulate successful submission
            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;

                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;

                    // Display success notification toast
                    formStatus.className = 'form-status success';
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you soon.';
                    
                    // Reset form fields
                    contactForm.reset();

                    // Hide success message after 6 seconds
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.innerHTML = '';
                    }, 6000);

                }, 1200);
            }
        });
    }

    function showFieldError(inputElement, errorElementId, message) {
        const formGroup = inputElement.closest('.form-group');
        const errorElement = document.getElementById(errorElementId);
        
        if (formGroup) {
            formGroup.classList.add('error');
        }
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearFormErrors() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('error'));
        
        if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.innerHTML = '';
        }
    }

    function isValidEmail(email) {
        // Standard Email Regex Pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
